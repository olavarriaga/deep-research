import { deepResearch } from '@/deep-research'

export interface ResearchResult {
  learnings: string[]
  visitedUrls: string[]
  timestamp: Date
}

export interface ResearchSession {
  id: string
  query: string
  results: ResearchResult[]
  status: 'in-progress' | 'completed' | 'error'
  timestamp: Date
}

export class ResearchService {
  private sessions: ResearchSession[] = []

  constructor() {
    this.loadSessions()
  }

  private loadSessions() {
    if (typeof window !== 'undefined') {
      try {
        const savedSessions = localStorage.getItem('research-sessions')
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions, (key, value) => {
            if (key === 'timestamp') {
              return new Date(value)
            }
            return value
          })
          if (Array.isArray(parsed)) {
            this.sessions = parsed
          }
        }
      } catch (e) {
        console.error('Failed to load research sessions:', e)
      }
    }
  }

  private saveSessions() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('research-sessions', JSON.stringify(this.sessions))
    }
  }

  private clearSessions() {
    this.sessions = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('research-sessions')
    }
  }

  async startResearch(query: string, breadth: number = 4, depth: number = 2): Promise<ResearchSession> {
    const session: ResearchSession = {
      id: Date.now().toString(),
      query,
      results: [],
      status: 'in-progress',
      timestamp: new Date(),
    }

    this.sessions.unshift(session)
    this.saveSessions()

    try {
      const { learnings, visitedUrls } = await deepResearch({
        query,
        breadth,
        depth,
        onProgress: (progress) => {
          // You can implement progress updates here
          console.log('Research progress:', progress)
        },
      })

      const result: ResearchResult = {
        learnings,
        visitedUrls,
        timestamp: new Date(),
      }

      session.results.push(result)
      session.status = 'completed'
      this.saveSessions()

      return session
    } catch (error) {
      console.error('Research error:', error)
      session.status = 'error'
      this.saveSessions()
      throw error
    }
  }

  getSessions(): ResearchSession[] {
    return [...this.sessions]
  }

  getSession(id: string): ResearchSession | undefined {
    return this.sessions.find(s => s.id === id)
  }

  async exportReport(sessionId: string): Promise<string> {
    const session = this.getSession(sessionId)
    if (!session) throw new Error('Session not found')

    // TODO: Implement proper report generation
    const report = `# Research Report: ${session.query}
${session.results.map(result => `
## Findings
${result.learnings.join('\n')}

## Sources
${result.visitedUrls.join('\n')}
`).join('\n')}
`
    return report
  }

  // For testing purposes only
  _clearSessionsForTesting() {
    if (process.env.NODE_ENV === 'test') {
      this.clearSessions()
    }
  }
}

export const researchService = new ResearchService() 