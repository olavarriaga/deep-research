require('@testing-library/jest-dom')
const nodeFetch = require('node-fetch')

global.fetch = nodeFetch
global.Headers = nodeFetch.Headers
global.Request = nodeFetch.Request
global.Response = nodeFetch.Response
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder

// Mock BroadcastChannel
global.BroadcastChannel = class {
  constructor() {
    this.name = 'mock-broadcast-channel'
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock OpenAI API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        choices: [
          {
            message: {
              content: JSON.stringify({
                queries: [
                  {
                    query: 'test query',
                    researchGoal: 'test goal',
                    verificationFocus: 'test focus',
                  },
                ],
              }),
            },
          },
        ],
      }),
  })
)

// Reset mocks between tests
afterEach(() => {
  localStorage.clear()
  jest.clearAllMocks()
}) 