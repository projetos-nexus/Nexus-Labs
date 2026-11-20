import { expect, test } from '@playwright/test'

// Testes estáveis: usam landmarks, papéis e hrefs, não textos que mudarão no ciclo 02.
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

    const linksDeContato = page.locator('a[href^="https://wa.me/"]')
    expect(await linksDeContato.count()).toBeGreaterThan(0)
    await expect(linksDeContato.first()).toHaveAttribute('href', /wa\.me\/5591984219075/)

    // Pelo menos um link Visível no topo da página.
    let visiveis = 0
    for (let i = 0; i < (await links.count()); i += 1) {
      if (await links.nth(i).isVisible()) visiveis += 1
    }
    expect(visiveis).toBeGreaterThan(0)
  })

  test('menu mobile abre e fecha por clique e teclado em 360', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-360', 'escopo exclusivo do viewport 360')

    await page.goto('/')
    const botao = page.getByRole('button', { name: /menu/i })
    await expect(botao).toBeVisible()
    await expect(botao).toHaveAttribute('aria-expanded', 'false')
    await expect(botao).not.toHaveAttribute('aria-controls')

    await botao.click()
    await expect(botao).toHaveAttribute('aria-expanded', 'true')
    await expect(botao).toHaveAttribute('aria-controls', 'mobile-nav-menu')
    await expect(page.locator('#mobile-nav-menu')).toBeVisible()

    await botao.click()
    await expect(botao).toHaveAttribute('aria-expanded', 'false')
    await expect(botao).not.toHaveAttribute('aria-controls')
    await expect(page.locator('#mobile-nav-menu')).toHaveCount(0)

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
})
