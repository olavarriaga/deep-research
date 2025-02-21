import { z } from 'zod';
import { generateObject } from 'ai';
import { gpt4Model } from './providers';
import { systemPrompt } from '../prompt';
import { withRetry } from './retry';
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
  retryCount = 0,
  operationName,
  ...options
}: {
  prompt: string;
  schema: T;
  retryCount?: number;
  operationName?: string;
  [key: string]: any;
}) {
  try {
    // Wrap the API call with retry logic
    const result = await withRetry(
      () =>
        generateObject({
          model: gpt4Model,
          system: systemPrompt(),
          prompt,
          schema,
          ...options,
        }),
      {
        silent: true,
        operationName: operationName || 'AI generation',
      }
    );

    return result;
  } catch (error) {
    if (retryCount >= MAX_RETRIES) {
      // Log the final error before giving up
      output.log(`Failed to generate valid JSON response after ${MAX_RETRIES} retries: ${error}`);
      throw error;
    }

    // Add explicit JSON formatting instruction for retry
    const retryPrompt = `${prompt}\n\nIMPORTANT: Your response MUST be in valid JSON format following this exact schema:\n${JSON.stringify(
      schema.describe(),
      null,
      2
    )}`;

    return generateValidatedObject({
      prompt: retryPrompt,
      schema,
      retryCount: retryCount + 1,
      operationName,
      ...options,
    });
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