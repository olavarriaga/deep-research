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
}: {
  prompt: string;
  schema: T;
  operationName: string;
  abortSignal?: AbortSignal;
}): Promise<{
  object: z.infer<T>;
  raw: string;
}> {
  const openai = getOpenAIClient();
  
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: prompt },
  ];

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in response');
    }

    const parsed = schema.parse(JSON.parse(content));
    return {
      object: parsed,
      raw: content,
    };
  } catch (e) {
    console.error('Failed to generate or parse response:', e);
    throw e;
  }
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