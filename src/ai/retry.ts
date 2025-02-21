import { OutputManager } from '../output-manager';

const output = new OutputManager();

// Configuration for retry strategy
export const RETRY_CONFIG = {
  MAX_RETRIES: 5,
  INITIAL_WAIT: 1000, // 1 second
  MAX_WAIT: 32000, // 32 seconds
  JITTER_MAX: 1000, // Maximum random jitter in milliseconds
};

/**
 * Adds random jitter to prevent thundering herd problem
 */
function addJitter(delay: number): number {
  return delay + Math.random() * RETRY_CONFIG.JITTER_MAX;
}

/**
 * Calculates exponential backoff with jitter
 */
function calculateBackoff(retryCount: number): number {
  const exponentialWait = Math.min(
    RETRY_CONFIG.MAX_WAIT,
    RETRY_CONFIG.INITIAL_WAIT * Math.pow(2, retryCount)
  );
  return addJitter(exponentialWait);
}

/**
 * Checks if an error is a rate limit error
 */
function isRateLimitError(error: any): boolean {
  return (
    error?.status === 429 ||
    error?.response?.status === 429 ||
    error?.message?.includes('rate limit') ||
    error?.message?.toLowerCase().includes('too many requests')
  );
}

/**
 * Executes a function with exponential backoff retry strategy
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    silent?: boolean;
    maxRetries?: number;
    retryCount?: number;
    operationName?: string;
  } = {}
): Promise<T> {
  const {
    silent = true,
    maxRetries = RETRY_CONFIG.MAX_RETRIES,
    retryCount = 0,
    operationName = 'API call'
  } = options;

  try {
    return await operation();
  } catch (error: any) {
    if (!isRateLimitError(error) || retryCount >= maxRetries) {
      throw error;
    }

    const waitTime = calculateBackoff(retryCount);
    
    if (!silent) {
      output.log(
        `Rate limit hit for ${operationName}. Retrying in ${Math.round(waitTime / 1000)} seconds... (Attempt ${retryCount + 1}/${maxRetries})`
      );
    }

    await new Promise(resolve => setTimeout(resolve, waitTime));
    
    return withRetry(operation, {
      silent,
      maxRetries,
      retryCount: retryCount + 1,
      operationName
    });
  }
} 