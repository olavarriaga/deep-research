import { z } from 'zod';
import { generateValidatedObject } from './ai/validation';
import { toast } from 'sonner';

export async function generateFeedback({
  query,
  numQuestions = 3,
  onProgress,
}: {
  query: string;
  numQuestions?: number;
  onProgress?: (status: string) => void;
}) {
  try {
    if (onProgress) {
      onProgress('Connecting to AI service...');
    }
    
    const userFeedback = await generateValidatedObject({
      prompt: `Given the following query from the user, ask some follow up questions to clarify the research direction. Return a maximum of ${numQuestions} questions, but feel free to return less if the original query is clear: <query>${query}</query>`,
      schema: z.object({
        questions: z
          .array(z.string())
          .describe(
            `Follow up questions to clarify the research direction, max of ${numQuestions}`,
          ),
      }),
      operationName: 'Generate feedback questions',
      onProgress,
    });

    if (!userFeedback.object.questions || userFeedback.object.questions.length === 0) {
      console.warn('No questions generated for query:', query);
      throw new Error('Failed to generate relevant questions. Please try rephrasing your query.');
    }

    return userFeedback.object.questions.slice(0, numQuestions);
  } catch (error: any) {
    console.error('Feedback generation error:', error);
    
    // Handle specific error types
    if (error.message?.includes('insufficient_quota') || error.message?.includes('billing')) {
      toast.error('API quota exceeded. Please check your subscription.');
    } else if (error.message?.includes('rate_limit')) {
      toast.error('Too many requests. Please wait a moment and try again.');
    } else if (error.message?.includes('context_length')) {
      toast.error('Query is too long. Please make it shorter.');
    } else {
      // Don't throw immediately for validation errors - they might be temporary
      if (!error.message?.includes('validation')) {
        throw error;
      }
    }
    
    // Return null instead of throwing for validation errors
    // This allows the UI to keep trying if needed
    return null;
  }
}
