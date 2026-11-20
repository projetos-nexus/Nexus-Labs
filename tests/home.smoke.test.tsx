import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from '../src/App'

// Usa landmarks (papéis) em vez de textos: o conteúdo muda no ciclo 02.
describe('Home — smoke', () => {
  it('renderiza <App/> sem erro e com os landmarks principais', () => {
    const { container } = render(<App />)

    expect(container.firstChild).toBeInTheDocument()
    expect(screen.getAllByRole('banner').length).toBeGreaterThan(0) // header
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0) // nav
    expect(screen.getAllByRole('main').length).toBeGreaterThan(0) // main
    expect(screen.getAllByRole('contentinfo').length).toBeGreaterThan(0) // footer

    const navegacao = screen.getAllByRole('navigation')[0]
    expect(within(navegacao).getAllByRole('link').length).toBeGreaterThan(0)

    // Pelo menos um link de contato válido (href em vez de texto).
    const linksDeContato = screen
      .getAllByRole('link')
      .filter((link) => (link.getAttribute('href') ?? '').startsWith('https://wa.me/'))
    expect(linksDeContato.length).toBeGreaterThan(0)
  })
})
