import { z } from 'zod'
import { generateValidatedObject } from '../validation'
import { getOpenAIClient } from '../providers'

// Mock the OpenAI client
jest.mock('../providers', () => ({
  getOpenAIClient: jest.fn(),
  systemPrompt: () => 'test system prompt',
}))

describe('generateValidatedObject', () => {
  const mockSchema = z.object({
    queries: z.array(
      z.object({
        query: z.string(),
        researchGoal: z.string(),
        verificationFocus: z.string(),
      })
    ),
  })

  const mockValidResponse = {
    queries: [
      {
        query: 'test query',
        researchGoal: 'test goal',
        verificationFocus: 'test focus',
      },
    ],
  }

  const mockInvalidResponse = {
    queries: ['invalid string instead of object'],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully validate correct response format', async () => {
    const mockOpenAI = {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: JSON.stringify(mockValidResponse) } }],
          }),
        },
      },
    }
    ;(getOpenAIClient as jest.Mock).mockReturnValue(mockOpenAI)

    const result = await generateValidatedObject({
      prompt: 'test prompt',
      schema: mockSchema,
      operationName: 'test operation',
    })

    expect(result.object).toEqual(mockValidResponse)
    expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
      messages: [
        { role: 'system', content: 'test system prompt' },
        { role: 'user', content: 'test prompt' },
      ],
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' },
    })
  })

  it('should throw error for invalid response format', async () => {
    const mockOpenAI = {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: JSON.stringify(mockInvalidResponse) } }],
          }),
        },
      },
    }
    ;(getOpenAIClient as jest.Mock).mockReturnValue(mockOpenAI)

    await expect(
      generateValidatedObject({
        prompt: 'test prompt',
        schema: mockSchema,
        operationName: 'test operation',
      })
    ).rejects.toThrow()
  })

  it('should throw error when OpenAI response is empty', async () => {
    const mockOpenAI = {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: null } }],
          }),
        },
      },
    }
    ;(getOpenAIClient as jest.Mock).mockReturnValue(mockOpenAI)

    await expect(
      generateValidatedObject({
        prompt: 'test prompt',
        schema: mockSchema,
        operationName: 'test operation',
      })
    ).rejects.toThrow('No content in response')
  })

  it('should throw error when OpenAI request fails', async () => {
    const mockError = new Error('API error')
    const mockOpenAI = {
      chat: {
        completions: {
          create: jest.fn().mockRejectedValue(mockError),
        },
      },
    }
    ;(getOpenAIClient as jest.Mock).mockReturnValue(mockOpenAI)

    await expect(
      generateValidatedObject({
        prompt: 'test prompt',
        schema: mockSchema,
        operationName: 'test operation',
      })
    ).rejects.toThrow(mockError)
  })
}) 