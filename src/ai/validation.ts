import { z } from 'zod';
import OpenAI from 'openai';
import { getOpenAIClient, systemPrompt } from './providers';
import { OutputManager } from '../output-manager';

const output = new OutputManager();

// Maximum number of retries for JSON validation
const MAX_RETRIES = 2;

/**
 * Wrapper for generateObject that ensures valid JSON responses
 * and implements retry logic for malformed responses
 */
export async function generateValidatedObject<T extends z.ZodType>({
  prompt,
  schema,
  operationName,
  abortSignal,
  onProgress,
}: {
  prompt: string;
  schema: T;
  operationName: string;
  abortSignal?: AbortSignal;
  onProgress?: (status: string) => void;
}): Promise<{
  object: z.infer<T>;
  raw: string;
}> {
  const openai = getOpenAIClient();
  
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { 
      role: 'system', 
      content: `${systemPrompt()}\n\nIMPORTANT: Your response must be a valid JSON object with a 'data' field containing the requested information.` 
    },
    { 
      role: 'user', 
      content: `${prompt}\n\nRespond with a JSON object that has a 'data' field containing the requested information following the provided schema.` 
    },
  ];

  let retries = 0;
  while (retries <= MAX_RETRIES) {
    try {
      onProgress?.('Generating response...');
      
      const completion = await openai.chat.completions.create({
        messages,
        model: 'gpt-4-turbo-preview',
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in response');
      }

      onProgress?.('Processing response...');

      let jsonContent;
      try {
        jsonContent = JSON.parse(content);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        throw new Error('Invalid JSON response from OpenAI');
      }

      // Handle both direct schema match and data-wrapped schema match
      let dataToValidate = jsonContent;
      if (jsonContent.data) {
        dataToValidate = jsonContent.data;
      }

      try {
        const parsed = schema.parse(dataToValidate);
        onProgress?.('Validation successful');
        return {
          object: parsed,
          raw: content,
        };
      } catch (validationError) {
        console.error('Schema validation failed:', validationError);
        onProgress?.('Retrying due to validation error...');
        if (retries === MAX_RETRIES) {
          throw validationError;
        }
      }
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error);
      if (error instanceof Error) {
        if (error.message.includes('insufficient_quota')) {
          throw new Error('API quota exceeded');
        }
        if (error.message.includes('rate_limit')) {
          throw new Error('Rate limit exceeded');
        }
      }
      onProgress?.(`Attempt ${retries + 1} failed, retrying...`);
      if (retries === MAX_RETRIES) {
        throw error;
      }
    }
    retries++;
    // Add a small delay between retries
    await new Promise(resolve => setTimeout(resolve, 1000 * retries));
  }

  throw new Error('Failed to generate valid response after retries');
}

/**
 * Validates if a string is valid JSON
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
} 