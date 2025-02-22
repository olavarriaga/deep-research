import { deepResearch } from '@/deep-research'

export interface ResearchResult {
  learnings: string[]
  visitedUrls: string[]
  timestamp: Date
}

export interface ResearchSession {
  id: string
  title: string
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
    const initialQuery = query.split('\n')[0].replace('Initial Query: ', '').trim()
    const title = initialQuery.length > 60 
      ? initialQuery.substring(0, 57) + '...'
      : initialQuery

    const session: ResearchSession = {
      id: Date.now().toString(),
      title,
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

    const [initialQuery, ...qaPairs] = session.query.split('\n').filter(line => line.trim())
    const mainQuery = initialQuery.replace('Initial Query: ', '').trim()
    
    let qaSection = ''
    if (qaPairs.length > 0) {
      qaSection = `\n## Research Focus\n\nTo better understand the research requirements, the following aspects were explored:\n\n${qaPairs
        .filter(line => line.startsWith('Q: ') || line.startsWith('A: '))
        .map(line => {
          if (line.startsWith('Q: ')) return `**${line.slice(3)}**`
          if (line.startsWith('A: ')) return `${line.slice(3)}\n`
          return line
        })
        .join('\n')}`
    }

    const allFindings = session.results.flatMap(result => result.learnings)
    const allSources = session.results.flatMap(result => result.visitedUrls)
    
    const categories = new Map<string, { title: string; findings: string[] }>()
    allFindings.forEach(finding => {
      const words = finding.toLowerCase().split(' ')
      let category = ''
      
      if (words.some(w => ['performance', 'speed', 'benchmark', 'fps'].includes(w))) {
        category = 'Performance Analysis'
      } else if (words.some(w => ['feature', 'capability', 'support'].includes(w))) {
        category = 'Features and Capabilities'
      } else if (words.some(w => ['comparison', 'versus', 'compared', 'vs'].includes(w))) {
        category = 'Comparative Analysis'
      } else if (words.some(w => ['market', 'price', 'cost', 'value'].includes(w))) {
        category = 'Market Analysis'
      } else if (words.some(w => ['technical', 'specification', 'architecture'].includes(w))) {
        category = 'Technical Specifications'
      } else {
        category = 'General Findings'
      }
      
      const existing = categories.get(category) || { title: category, findings: [] }
      existing.findings.push(finding)
      categories.set(category, existing)
    })

    const findingsSection = Array.from(categories.values())
      .map(({ title, findings }) => {
        const narrativeIntro = `### ${title}\n\nThe research revealed several key insights regarding ${title.toLowerCase()}:\n\n`
        const narrativePoints = findings
          .map(f => f.trim())
          .join('. ') + '.'
        return narrativeIntro + narrativePoints
      })
      .join('\n\n')

    const sourcesSection = allSources
      .map(url => {
        try {
          const urlObj = new URL(url)
          const title = urlObj.hostname
            .replace('www.', '')
            .split('.')
            .slice(0, -1)
            .join('.')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          return `- [${title}](${url})`
        } catch {
          return `- ${url}`
        }
      })
      .join('\n')

    const report = `# Research Report: ${mainQuery}

## Executive Summary
This comprehensive research report examines ${mainQuery}. The analysis synthesizes information from multiple authoritative sources, providing a detailed overview of the topic and its various aspects.
${qaSection}

## Key Findings and Analysis
${findingsSection}

## Reference Sources
The following sources were consulted for this research:

${sourcesSection}

---
*Report generated using Deep Research AI - ${new Date().toLocaleDateString()}*
`
    return report
  }

  _clearSessionsForTesting() {
    if (process.env.NODE_ENV === 'test') {
      this.clearSessions()
    }
  }
}

export const researchService = new ResearchService() 