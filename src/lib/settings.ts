export interface ApiKeys {
  openai: string
  searchApi: string
}

export class SettingsService {
  private apiKeys: ApiKeys = {
    openai: '',
    searchApi: '',
  }

  constructor() {
    this.loadApiKeys()
  }

  private loadApiKeys() {
    if (typeof window !== 'undefined') {
      const savedKeys = localStorage.getItem('api-keys')
      if (savedKeys) {
        try {
          const parsed = JSON.parse(savedKeys)
          if (this.validateApiKeys(parsed)) {
            this.apiKeys = parsed
          }
        } catch (e) {
          console.error('Failed to parse saved API keys:', e)
        }
      }
    }
  }

  private validateApiKeys(keys: any): keys is ApiKeys {
    return (
      typeof keys === 'object' &&
      keys !== null &&
      typeof keys.openai === 'string' &&
      typeof keys.searchApi === 'string'
    )
  }

  getApiKeys(): ApiKeys {
    return { ...this.apiKeys }
  }

  async saveApiKeys(keys: ApiKeys): Promise<void> {
    // Validate API keys
    if (!keys.openai || !keys.searchApi) {
      throw new Error('Both API keys are required')
    }

    // Basic format validation
    if (!keys.openai.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format')
    }

    this.apiKeys = { ...keys }
    if (typeof window !== 'undefined') {
      localStorage.setItem('api-keys', JSON.stringify(this.apiKeys))
    }
  }

  hasValidApiKeys(): boolean {
    return Boolean(
      this.apiKeys.openai?.startsWith('sk-') && 
      this.apiKeys.searchApi?.length > 0
    )
  }
}

export const settingsService = new SettingsService() 