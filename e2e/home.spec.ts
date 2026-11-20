import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { WHATSAPP_NUMBER } from '../src/config/contact'

// Testes estáveis: usam landmarks, papéis e hrefs, não textos que mudarão no ciclo 02.
const VIEWPORTS_COMPACTOS = ['chromium-360', 'chromium-768']
const IMPACTOS_BLOQUEANTES = ['critical', 'serious']

// O framer-motion revela as seções por inView. Sem rolar, o axe descarta os textos
// com opacity 0 e mede só a fração visível no topo. reducedMotion evita depender
// da duração das animações; a rolagem dispara todos os inView antes do analyze().
async function revelarConteudo(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('main')).toBeVisible()
  await page.waitForLoadState('networkidle')

  for (let tentativa = 0; tentativa < 60; tentativa += 1) {
    const noFim = await page.evaluate(
      () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2,
    )
    if (noFim) break
    await page.mouse.wheel(0, 600)
    await page.waitForTimeout(120)
  }

  // Aguarda o último inView e o fim das transições, então volta ao topo para o axe.
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(200)
}

test.describe('Home', () => {
  test('carrega sem erro de console', async ({ page }) => {
    const erros: string[] = []
    page.on('console', (mensagem) => {
      if (mensagem.type() === 'error') erros.push(mensagem.text())
    })
    page.on('pageerror', (erro) => erros.push(erro.message))

    await page.goto('/')
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeAttached()
    await page.waitForLoadState('networkidle')

    expect(erros).toEqual([])
  })

  test('não tem rolagem horizontal', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('main')).toBeVisible()

    const medida = await page.evaluate(() => ({
      larguraViewport: document.documentElement.clientWidth,
      larguraConteudo: document.documentElement.scrollWidth,
    }))

    expect(
      medida.larguraConteudo,
      `conteúdo excede o viewport: ${medida.larguraConteudo}px > ${medida.larguraViewport}px`,
    ).toBeLessThanOrEqual(medida.larguraViewport + 1)
  })

  test('links principais estão presentes e acessíveis', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()

    const links = page.getByRole('link')
    expect(await links.count()).toBeGreaterThan(3)

    // S2: o número vem da config da aplicação, não de uma constante copiada no teste.
    const linksDeContato = page.locator('a[href^="https://wa.me/"]')
    expect(await linksDeContato.count()).toBeGreaterThan(0)
    await expect(linksDeContato.first()).toHaveAttribute(
      'href',
      new RegExp(`wa\\.me/${WHATSAPP_NUMBER}`),
    )

    // S7: um único link visível basta; não percorrer todos os links da página.
    await expect(links.first()).toBeVisible()
  })

  test('menu mobile abre e fecha por clique e teclado em 360 e 768', async ({ page }, testInfo) => {
    test.skip(
      !VIEWPORTS_COMPACTOS.includes(testInfo.project.name),
      'escopo dos viewports compactos 360 e 768',
    )

    await page.goto('/')
    const botao = page.getByRole('button', { name: /menu/i })
    await expect(botao).toBeVisible()
    await expect(botao).toHaveAttribute('aria-expanded', 'false')

    await botao.click()
    await expect(botao).toHaveAttribute('aria-expanded', 'true')
    // S3: se houver aria-controls, o alvo precisa existir — sem exigir o atributo.
    const alvoAberto = await botao.getAttribute('aria-controls')
    if (alvoAberto) {
      await expect(page.locator(`[id="${alvoAberto}"]`)).toBeVisible()
    }

    await botao.click()
    await expect(botao).toHaveAttribute('aria-expanded', 'false')
    const alvoFechado = await botao.getAttribute('aria-controls')
    if (alvoFechado) {
      await expect(page.locator(`[id="${alvoFechado}"]`)).toHaveCount(1)
    }

    await botao.focus()
    await page.keyboard.press('Enter')
    await expect(botao).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Enter')
    await expect(botao).toHaveAttribute('aria-expanded', 'false')

    await page.keyboard.press('Space')
    await expect(botao).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Space')
    await expect(botao).toHaveAttribute('aria-expanded', 'false')
  })

  test('não tem violações críticas ou sérias no axe real do navegador', async ({ page }, testInfo) => {
    // S1 do parecer T-008: contraste só é medido de verdade em navegador.
    // O1 do parecer T-014/T-015: rolar antes do analyze, senão os textos inView
    // ficam com opacity 0 e o axe avalia só uma fração da página.
    await revelarConteudo(page)

    const resultados = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Registra todas as violações, inclusive as não bloqueantes, sem mascarar nada.
    if (resultados.violations.length > 0) {
      const resumo = resultados.violations
        .map((v) => `${v.impact ?? 'sem-impacto'}: ${v.id} (${v.nodes.length} nó(s))`)
        .join(' | ')
      console.info(`[axe ${testInfo.project.name}] violações: ${resumo}`)
    }

    // Contar NÓS, não regras: a contagem de regras sempre daria 0 ou 1.
    const contarNos = (regras: typeof resultados.passes) =>
      regras
        .filter((v) => v.id === 'color-contrast')
        .reduce((total, v) => total + v.nodes.length, 0)

    const contraste = {
      passou: contarNos(resultados.passes),
      violou: contarNos(resultados.violations),
      incompleto: contarNos(resultados.incomplete),
    }

    // Textos folha com opacidade efetiva < 0,1: zero após a rolagem = cobertura real.
    const textosInvisiveis = await page.evaluate(() => {
      let total = 0
      for (const el of Array.from(document.querySelectorAll('main *, footer *'))) {
        if (el.children.length > 0 || !(el.textContent || '').trim()) continue
        let opacidade = 1
        let atual: Element | null = el
        while (atual) {
          opacidade *= Number(getComputedStyle(atual).opacity)
          atual = atual.parentElement
        }
        if (opacidade < 0.1) total += 1
      }
      return total
    })

    console.info(
      `[axe ${testInfo.project.name}] color-contrast (nós): ${JSON.stringify(contraste)}; ` +
        `textos invisíveis: ${textosInvisiveis}`,
    )

    expect(
      contraste.passou + contraste.violou + contraste.incompleto,
      'cobertura do color-contrast caiu: a página não foi revelada por completo',
    ).toBeGreaterThan(100)

    const bloqueantes = resultados.violations.filter((v) =>
      IMPACTOS_BLOQUEANTES.includes(v.impact ?? ''),
    )
    expect(bloqueantes.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  })
})
