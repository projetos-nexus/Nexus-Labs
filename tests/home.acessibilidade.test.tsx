import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import App from '../src/App'

const IMPACTOS_BLOQUEANTES = ['critical', 'serious']

describe('Home — acessibilidade (axe)', () => {
  it('não tem violações críticas ou sérias', async () => {
    const { container } = render(<App />)
    const resultados = await axe(container)

    // Registra TODAS as violações encontradas (inclusive as não bloqueantes)
    // para que nada fique mascarado pelo filtro de severidade.
    if (resultados.violations.length > 0) {
      const resumo = resultados.violations
        .map((v) => {
          const alvos = v.nodes.map((n) => n.target.join(' ')).join(', ')
          return `${v.impact ?? 'sem-impacto'}: ${v.id} (${v.nodes.length} nó(s)) → ${alvos}`
        })
        .join(' | ')
      console.info(`[axe] violações na Home: ${resumo}`)
    }

    const bloqueantes = resultados.violations.filter((v) =>
      IMPACTOS_BLOQUEANTES.includes(v.impact ?? ''),
    )

    expect({ ...resultados, violations: bloqueantes }).toHaveNoViolations()
  })
})
