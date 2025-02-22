'use client'

import OpenAI from 'openai';
import { getEncoding } from 'js-tiktoken';
import { settingsService } from '@/lib/settings';

import { RecursiveCharacterTextSplitter } from './text-splitter';

// Create OpenAI client with settings from the settings service
export function getOpenAIClient() {
  const apiKeys = settingsService.getApiKeys();
  return new OpenAI({
    apiKey: apiKeys.openai,
    baseURL: 'https://api.openai.com/v1',
    dangerouslyAllowBrowser: true, // Enable browser usage
  });
}

const customModel = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';

// Models
export function getGPT4Model() {
  return customModel;
}

const MinChunkSize = 140;
const encoder = getEncoding('o200k_base');

// trim prompt to maximum context size
export function trimPrompt(
  prompt: string,
  contextSize = 128_000,
) {
  if (!prompt) return '';
  
  const encoding = getEncoding('cl100k_base');
  const tokens = encoding.encode(prompt);
  
  if (tokens.length > contextSize) {
    const truncated = encoding.decode(tokens.slice(0, contextSize));
    return truncated;
  }
  
  return prompt;
}

export function systemPrompt() {
  return `You are a helpful AI research assistant. Your task is to help analyze and verify information from various sources.

REQUIREMENTS:
1. Always provide factual, well-researched information
2. Cite sources when possible
3. Note any uncertainties or conflicting information
4. Maintain objectivity and avoid bias
5. Format responses in clear, structured JSON
6. Include specific dates, numbers, and measurable data when available

CRITICAL JSON REQUIREMENTS:
- Follow the schema EXACTLY as specified
- Each field must match the expected type (string, number, object, etc.)
- Arrays must contain elements of the correct type
- Never return plain strings where objects are expected
- Always validate your response against the schema before returning
- Include all required fields with appropriate values

When generating JSON:
- Use proper JSON syntax
- Include all required fields
- Validate data types match schema
- Escape special characters
- Use consistent formatting`;
}
