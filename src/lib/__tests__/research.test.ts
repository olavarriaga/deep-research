import { researchService } from '../research'
import { settingsService } from '../settings'
import { deepResearch } from '@/deep-research'
import { ResearchService } from '../research'

// Mock the deep-research module
jest.mock('@/deep-research', () => ({
  deepResearch: jest.fn()
}))

// Mock the settings service
jest.mock('../settings', () => ({
  settingsService: {
    getApiKeys: jest.fn(),
  },
}))

describe('ResearchService', () => {
  let researchService: ResearchService
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

    // Reset mocks
    jest.clearAllMocks()
    ;(deepResearch as jest.Mock).mockResolvedValue({
      learnings: ['Test learning'],
      visitedUrls: ['https://test.com']
    })

    researchService = new ResearchService()
  })

  describe('startResearch', () => {
    it('should save sessions to localStorage', async () => {
      const query = 'test query'
      await researchService.startResearch(query)

      expect(mockSetItem).toHaveBeenCalledWith(
        'research-sessions',
        expect.any(String)
      )
    })

    it('should handle research failure', async () => {
      (deepResearch as jest.Mock).mockRejectedValue(new Error('Research failed'))
      const query = 'test query'
      
      await expect(researchService.startResearch(query)).rejects.toThrow('Research failed')
      
      const sessions = researchService.getSessions()
      expect(sessions[0].status).toBe('error')
    })
  })

  describe('getSessions', () => {
    it('should return stored sessions', () => {
      const mockSessions = [{
        id: '1',
        query: 'test',
        status: 'completed',
        results: [],
        timestamp: new Date().toISOString()
      }]
      mockStorage['research-sessions'] = JSON.stringify(mockSessions)
      researchService = new ResearchService() // Reinitialize to load mock data
      
      const sessions = researchService.getSessions()
      expect(sessions[0]).toMatchObject({
        id: '1',
        query: 'test',
        status: 'completed',
      })
    })

    it('should return empty array when no sessions exist', () => {
      const sessions = researchService.getSessions()
      expect(sessions).toEqual([])
    })
  })

  describe('getSession', () => {
    it('should return undefined for non-existent session', () => {
      localStorage.getItem = jest.fn().mockReturnValue(null)
      const session = researchService.getSession('non-existent')
      expect(session).toBeUndefined()
    })

    it('should return session by id', async () => {
      const query = 'test query'
      const createdSession = await researchService.startResearch(query)
      const retrievedSession = researchService.getSession(createdSession.id)
      expect(retrievedSession).toEqual(createdSession)
    })
  })

  describe('exportReport', () => {
    it('should throw error for non-existent session', async () => {
      localStorage.getItem = jest.fn().mockReturnValue(null)
      await expect(researchService.exportReport('non-existent')).rejects.toThrow(
        'Session not found'
      )
    })

    it('should generate report for valid session', async () => {
      const query = 'test query'
      const session = await researchService.startResearch(query)
      const report = await researchService.exportReport(session.id)

      expect(report).toContain(query)
      expect(report).toContain('# Research Report')
      expect(report).toContain('## Findings')
      expect(report).toContain('## Sources')
    })
  })
}) 