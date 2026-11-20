// Verificação da T-011 via Playwright: logo da Navbar e menu compacto < 900px.
import { chromium } from '@playwright/test'

const navegador = await chromium.launch()
const viewports = [360, 768, 899, 900, 1440]
const erros = []

try {
  for (const largura of viewports) {
    const pagina = await navegador.newPage({ viewport: { width: largura, height: 900 } })
    pagina.on('console', (m) => {
      if (m.type() === 'error') erros.push(`${largura}: ${m.text()}`)
    })
    pagina.on('pageerror', (e) => erros.push(`${largura}: ${e.message}`))
    await pagina.goto('http://localhost:5181/')
    await pagina.locator('.navbar-logo').waitFor()
    await pagina.waitForTimeout(600) // animação de entrada do header

    const medida = await pagina.evaluate(() => {
      const logo = document.querySelector('.navbar-logo')
      const botao = document.querySelector('button.show-mobile')
      const linksDesktop = Array.from(document.querySelectorAll('.hidden-mobile'))
      const lr = logo.getBoundingClientRect()
      const cs = getComputedStyle(logo)
      const visivel = (el) => {
        const e = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return e.display !== 'none' && e.visibility !== 'hidden' && r.width > 0 && r.height > 0
      }
      return {
        logo: {
          altura: +lr.height.toFixed(2),
          largura: +lr.width.toFixed(2),
          natural: `${logo.naturalWidth}x${logo.naturalHeight}`,
          proporcaoNatural: +(logo.naturalWidth / logo.naturalHeight).toFixed(4),
          proporcaoRender: +(lr.width / lr.height).toFixed(4),
          cssHeight: cs.height,
          background: cs.backgroundColor,
          top: +lr.top.toFixed(2),
          carregado: logo.complete && logo.naturalWidth > 0,
        },
        botao: botao
          ? {
              visivel: visivel(botao),
              ariaLabel: botao.getAttribute('aria-label'),
              ariaExpanded: botao.getAttribute('aria-expanded'),
              ariaControls: botao.getAttribute('aria-controls'),
              esquerda: +botao.getBoundingClientRect().left.toFixed(2),
            }
          : null,
        linksDesktop: linksDesktop.map((el) => ({
          visivel: visivel(el),
          direita: +el.getBoundingClientRect().right.toFixed(2),
          texto: (el.innerText || '').trim().slice(0, 30),
        })),
        distanciaLogoMenu: botao && visivel(botao) ? +(botao.getBoundingClientRect().left - lr.right).toFixed(2) : null,
        clientWidth: document.documentElement.clientWidth,
      }
    })
    console.log(`=== ${largura} ===`)
    console.log(JSON.stringify(medida, null, 2))

    if (largura === 768 || largura === 899) {
      const botao = pagina.locator('button.show-mobile')
      const antes = await botao.getAttribute('aria-expanded')
      await botao.click()
      await pagina.waitForTimeout(350)
      const aberto = {
        expanded: await botao.getAttribute('aria-expanded'),
        controls: await botao.getAttribute('aria-controls'),
        menuVisivel: await pagina.locator('#mobile-nav-menu').isVisible().catch(() => false),
      }
      await botao.click()
      await pagina.waitForTimeout(350)
      const fechado = {
        expanded: await botao.getAttribute('aria-expanded'),
        controls: await botao.getAttribute('aria-controls'),
        menuCount: await pagina.locator('#mobile-nav-menu').count(),
      }
      console.log(`menu ${largura}: ${JSON.stringify({ antes, aberto, fechado })}`)
    }

    if (largura === 1440) {
      await pagina.evaluate(() => window.scrollTo(0, 300))
      await pagina.waitForTimeout(500)
      const aposRolagem = await pagina.evaluate(() => {
        const logo = document.querySelector('.navbar-logo')
        const header = document.querySelector('header')
        return {
          logoBackground: getComputedStyle(logo).backgroundColor,
          headerBackground: getComputedStyle(header).backgroundColor,
        }
      })
      console.log(`apos rolagem 1440: ${JSON.stringify(aposRolagem)}`)
    }

    await pagina.close()
  }
  console.log(`erros console: ${JSON.stringify(erros)}`)
} finally {
  await navegador.close()
}
