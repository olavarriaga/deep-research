/// <reference types="jest" />

import { SettingsService } from '../settings'

describe('SettingsService', () => {
  let settingsService: SettingsService
  let mockStorage: { [key: string]: string }
  let mockGetItem: jest.Mock
  let mockSetItem: jest.Mock

  beforeEach(() => {
    mockStorage = {}
    mockGetItem = jest.fn((key: string) => mockStorage[key] || null)
    mockSetItem = jest.fn((key: string, value: string) => {
      mockStorage[key] = value
    })

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: jest.fn((key: string) => {
          delete mockStorage[key]
        }),
        clear: jest.fn(() => {
          mockStorage = {}
        }),
        length: 0,
        key: jest.fn((index: number) => null),
      },
      writable: true
    })

    // Set up storage before creating service
    const testKeys = { openai: 'sk-test', searchApi: 'test-api' }
    mockStorage['api-keys'] = JSON.stringify(testKeys)
    
    settingsService = new SettingsService()
  })

  describe('getApiKeys', () => {
    it('should return stored keys when available', () => {
      const testKeys = { openai: 'sk-test', searchApi: 'test-api' }
      const keys = settingsService.getApiKeys()
      expect(keys).toEqual(testKeys)
    })

    it('should handle invalid stored data', () => {
      mockStorage['api-keys'] = 'invalid-json'
      settingsService = new SettingsService() // Reinitialize to load invalid data
      const keys = settingsService.getApiKeys()
      expect(keys).toEqual({ openai: '', searchApi: '' })
    })
  })

  describe('saveApiKeys', () => {
    it('should save keys to localStorage', async () => {
      const testKeys = { openai: 'sk-test', searchApi: 'test-api' }
      await settingsService.saveApiKeys(testKeys)
      expect(mockSetItem).toHaveBeenCalledWith(
        'api-keys',
        JSON.stringify(testKeys)
      )
    })

    it('should throw error when keys are missing', async () => {
      await expect(
        settingsService.saveApiKeys({ openai: '', searchApi: '' })
      ).rejects.toThrow('Both API keys are required')
    })

    it('should throw error when OpenAI key format is invalid', async () => {
      await expect(
        settingsService.saveApiKeys({ openai: 'invalid', searchApi: 'test' })
      ).rejects.toThrow('Invalid OpenAI API key format')
    })
  })

  describe('hasValidApiKeys', () => {
    it('should return true when valid keys are present', () => {
      expect(settingsService.hasValidApiKeys()).toBe(true)
    })

    it('should return false when keys are missing', () => {
      delete mockStorage['api-keys']
      settingsService = new SettingsService() // Reinitialize to load empty data
      expect(settingsService.hasValidApiKeys()).toBe(false)
    })

    it('should return false when OpenAI key is invalid', () => {
      mockStorage['api-keys'] = JSON.stringify({ openai: 'invalid', searchApi: 'test' })
      settingsService = new SettingsService() // Reinitialize to load invalid data
      expect(settingsService.hasValidApiKeys()).toBe(false)
    })
  })
}) 