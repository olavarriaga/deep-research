import FirecrawlApp, { SearchResponse } from '@mendable/firecrawl-js';
import { generateObject } from 'ai';
import { compact } from 'lodash-es';
import pLimit from 'p-limit';
import { z } from 'zod';

import { gpt4Model, trimPrompt } from './ai/providers';
import { systemPrompt } from './prompt';
import { OutputManager } from './output-manager';
import { generateValidatedObject } from './ai/validation';

// Initialize output manager for coordinated console/progress output
const output = new OutputManager();

// Replace console.log with output.log
function log(...args: any[]) {
  output.log(...args);
}

export type ResearchProgress = {
  currentDepth: number;
  totalDepth: number;
  currentBreadth: number;
  totalBreadth: number;
  currentQuery?: string;
  totalQueries: number;
  completedQueries: number;
};

type ResearchResult = {
  learnings: string[];
  visitedUrls: string[];
};

// increase this if you have higher API rate limits
const ConcurrencyLimit = 1;

// Initialize Firecrawl with optional API key and optional base url

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_KEY ?? '',
  apiUrl: process.env.FIRECRAWL_BASE_URL,
});

// take en user query, return a list of SERP queries
async function generateSerpQueries({
  query,
  numQueries = 3,
  learnings,
}: {
  query: string;
  numQueries?: number;
  learnings?: string[];
}) {
  const res = await generateValidatedObject({
    prompt: `Given the following prompt from the user, generate a list of SERP queries to research the topic. 

VERIFICATION STRATEGY:
- Generate queries that target authoritative primary sources
- Include queries to verify specific claims and data points
- Seek official/institutional sources when available
- Look for peer-reviewed or academically verified sources
- Target fact-checking organizations and reputable databases
- Include queries to find contradicting evidence or alternative viewpoints
- Search for recent updates or corrections to historical information

Return a maximum of ${numQueries} queries, but feel free to return less if the original prompt is clear. Make sure each query is unique and not similar to each other: <prompt>${query}</prompt>\n\n${
      learnings
        ? `Here are some learnings from previous research, use them to generate more specific queries: ${learnings.join(
            '\n',
          )}`
        : ''
    }`,
    schema: z.object({
      queries: z
        .array(
          z.object({
            query: z.string().describe('The SERP query'),
            researchGoal: z
              .string()
              .describe(
                'First talk about the goal of the research that this query is meant to accomplish, then go deeper into how to advance the research once the results are found, mention additional research directions. Be as specific as possible, especially for additional research directions.',
              ),
            verificationFocus: z
              .string()
              .describe(
                'Key claims or data points that need verification from authoritative sources',
              ),
          }),
        )
        .describe(`List of SERP queries, max of ${numQueries}`),
    }),
    operationName: 'Generate SERP queries',
  });
  log(
    `Created ${res.object.queries.length} queries`,
    res.object.queries,
  );

  return res.object.queries.slice(0, numQueries);
}

async function processSerpResult({
  query,
  result,
  numLearnings = 3,
  numFollowUpQuestions = 3,
}: {
  query: string;
  result: SearchResponse;
  numLearnings?: number;
  numFollowUpQuestions?: number;
}) {
  const contents = compact(result.data.map(item => item.markdown)).map(
    content => trimPrompt(content, 25_000),
  );
  log(`Ran ${query}, found ${contents.length} contents`);

  const res = await generateValidatedObject({
    abortSignal: AbortSignal.timeout(60_000),
    prompt: `Given the following contents from a SERP search for the query <query>${query}</query>, generate a list of learnings from the contents. 

FACT VERIFICATION REQUIREMENTS:
- Cross-verify all factual claims across multiple sources
- Assess source credibility (academic, institutional, peer-reviewed, etc.)
- Check publication dates to ensure information currency
- Look for consensus among expert sources
- Note any significant disagreements or alternative viewpoints
- Consider potential biases in source material
- Flag claims that lack sufficient verification

For each learning:
1. Count how many independent sources confirm it
2. Assess the credibility of those sources
3. Note any conflicting information or alternative views
4. Check for recent updates or corrections
5. Consider the context and any potential limitations

Return a maximum of ${numLearnings} learnings, but feel free to return less if the contents are clear. Make sure each learning is unique and not similar to each other. The learnings should be concise and to the point, as detailed and information dense as possible. Include specific data points, dates, and measurable facts when available.\n\n<contents>${contents
      .map(content => `<content>\n${content}\n</content>`)
      .join('\n')}</contents>`,
    schema: z.object({
      learnings: z
        .array(
          z.object({
            fact: z.string().describe('The verified fact or learning'),
            sourcesCount: z.number().describe('Number of independent sources that confirm this fact'),
            sourceTypes: z.array(z.enum(['academic', 'institutional', 'news', 'expert', 'other'])).describe('Types of sources that confirm this fact'),
            confidenceLevel: z.enum(['verified', 'likely', 'needs_verification']).describe('Confidence in the fact based on source quality and consensus'),
            dateVerified: z.string().describe('Most recent date this information was confirmed'),
            conflictingInfo: z.string().describe('Any significant disagreements or alternative viewpoints'),
            limitations: z.string().describe('Any important context or limitations about this fact'),
          })
        )
        .describe(`List of verified learnings, max of ${numLearnings}`),
      followUpQuestions: z
        .array(z.string())
        .describe(
          `List of follow-up questions to research the topic further, max of ${numFollowUpQuestions}`,
        ),
    }),
    operationName: 'Process SERP results',
  });
  
  // Filter and format the learnings with verification context
  const verifiedLearnings = res.object.learnings
    .filter((l: { confidenceLevel: string }) => l.confidenceLevel !== 'needs_verification')
    .map((l: { 
      fact: string;
      sourcesCount: number;
      sourceTypes: string[];
      dateVerified: string;
      conflictingInfo?: string;
      limitations?: string;
    }) => {
      let text = `${l.fact} [Verified by ${l.sourcesCount} ${l.sourceTypes.join('/')} source(s) as of ${l.dateVerified}]`;
      if (l.conflictingInfo) {
        text += `\nNote: Alternative viewpoint: ${l.conflictingInfo}`;
      }
      if (l.limitations) {
        text += `\nContext: ${l.limitations}`;
      }
      return text;
    });

  return {
    learnings: verifiedLearnings,
    followUpQuestions: res.object.followUpQuestions,
  };
}

export async function writeFinalReport({
  prompt,
  learnings,
  visitedUrls,
}: {
  prompt: string;
  learnings: string[];
  visitedUrls: string[];
}) {
  const learningsString = trimPrompt(
    learnings
      .map(learning => `<learning>\n${learning}\n</learning>`)
      .join('\n'),
    150_000,
  );

  const res = await generateValidatedObject({
    prompt: `Given the following prompt from the user, write a final report on the topic using the learnings from research. Make it as as detailed as possible, aim for 3 or more pages, include ALL the learnings from research:\n\n<prompt>${prompt}</prompt>\n\nHere are all the learnings from previous research:\n\n<learnings>\n${learningsString}\n</learnings>`,
    schema: z.object({
      reportMarkdown: z
        .string()
        .describe('Final report on the topic in Markdown'),
    }),
    operationName: 'Generate final report',
  });

  // Append the visited URLs section to the report
  const urlsSection = `\n\n## Sources\n\n${visitedUrls.map(url => `- ${url}`).join('\n')}`;
  return res.object.reportMarkdown + urlsSection;
}

export async function deepResearch({
  query,
  breadth,
  depth,
  learnings = [],
  visitedUrls = [],
  onProgress,
}: {
  query: string;
  breadth: number;
  depth: number;
  learnings?: string[];
  visitedUrls?: string[];
  onProgress?: (progress: ResearchProgress) => void;
}): Promise<ResearchResult> {
  const progress: ResearchProgress = {
    currentDepth: depth,
    totalDepth: depth,
    currentBreadth: breadth,
    totalBreadth: breadth,
    totalQueries: 0,
    completedQueries: 0,
  };
  
  const reportProgress = (update: Partial<ResearchProgress>) => {
    Object.assign(progress, update);
    onProgress?.(progress);
  };

  const serpQueries = await generateSerpQueries({
    query,
    learnings,
    numQueries: breadth,
  });
  
  reportProgress({
    totalQueries: serpQueries.length,
    currentQuery: serpQueries[0]?.query
  });
  
  const limit = pLimit(ConcurrencyLimit);

  const results = await Promise.all(
    serpQueries.map((serpQuery: { query: string; researchGoal: string }) =>
      limit(async () => {
        try {
          reportProgress({
            currentQuery: serpQuery.query,
            completedQueries: progress.completedQueries + 1,
          });

          const result = await firecrawl.search(serpQuery.query);
          
          // Handle empty search results
          if (!result.data || result.data.length === 0) {
            log(`No results found for query: ${serpQuery.query}`);
            return {
              learnings: [],
              visitedUrls: [],
            };
          }

          const processedResults = await processSerpResult({
            query: serpQuery.query,
            result,
            numLearnings: 3,
            numFollowUpQuestions: 3,
          });

          learnings.push(...processedResults.learnings);
          visitedUrls.push(...(result.data?.map(d => d.url).filter((url): url is string => url !== undefined) ?? []));

          if (depth > 1) {
            const followUpResults = await Promise.all(
              processedResults.followUpQuestions.map((q: string) =>
                deepResearch({
                  query: q,
                  breadth: Math.max(1, breadth - 1),
                  depth: depth - 1,
                  learnings,
                  visitedUrls,
                  onProgress,
                }),
              ),
            );

            followUpResults.forEach(r => {
              learnings.push(...r.learnings);
              visitedUrls.push(...r.visitedUrls);
            });
          }

          return {
            learnings,
            visitedUrls,
          };
        } catch (e: any) {
          log(`Error running query: ${serpQuery.query}: `, e);
          return {
            learnings: [],
            visitedUrls: [],
          };
        }
      }),
    ),
  );

  return {
    learnings,
    visitedUrls,
  };
}
