// Setup global dos testes de unidade/componente.
import '@testing-library/jest-dom/vitest'
import * as matchers from 'vitest-axe/matchers'
import { expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// vitest-axe 0.1.0 usa a API expect.extend (a mesma do jest-axe).
// Mantemos apenas esta forma: o import 'vitest-axe/extend-expect' é redundante
// e, no Vitest 5, já não registra os tipos do matcher (ver tests/vitest-axe.d.ts).
expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// O framer-motion consulta matchMedia/IntersectionObserver/ResizeObserver.
// jsdom nao implementa essas APIs; mocks inertes mantêm os testes estaveis.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })),
})

class ObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: ObserverMock,
})
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ObserverMock,
})
