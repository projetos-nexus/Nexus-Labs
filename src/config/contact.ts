export const WHATSAPP_NUMBER = '5591984219075'

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WA_MESSAGES = {
  heroPrimary:
    'Olá, quero criar um sistema premium com a Nexus Labs. Gostaria de entender como funciona o diagnóstico e a contratação.',

  ctaFinal:
    'Olá, vi o site da Nexus Labs e quero conversar sobre um sistema, automação ou projeto para minha empresa.',

  ctaSchedule:
    'Olá, quero agendar uma conversa com a Nexus Labs para entender como posso melhorar a operação da minha empresa.',

  cardBuy: (projectTitle: string) =>
    `Olá, tenho interesse no projeto ${projectTitle} da Nexus Labs. Quero entender como posso comprar, adaptar ou implantar essa solução na minha empresa.`,

  modalAdapt: (projectTitle: string) =>
    `Olá, quero adaptar o projeto ${projectTitle} da Nexus Labs para minha empresa. Gostaria de entender possibilidades, prazo e investimento.`,

  modalTalk: (projectTitle: string) =>
    `Olá, vi os detalhes do projeto ${projectTitle} no site da Nexus Labs e quero conversar para saber se ele se encaixa na minha operação.`,
}

export const WA_URLS = {
  heroPrimary: createWhatsAppUrl(WA_MESSAGES.heroPrimary),
  ctaFinal: createWhatsAppUrl(WA_MESSAGES.ctaFinal),
  ctaSchedule: createWhatsAppUrl(WA_MESSAGES.ctaSchedule),
  cardBuy: (projectTitle: string) => createWhatsAppUrl(WA_MESSAGES.cardBuy(projectTitle)),
  modalAdapt: (projectTitle: string) => createWhatsAppUrl(WA_MESSAGES.modalAdapt(projectTitle)),
  modalTalk: (projectTitle: string) => createWhatsAppUrl(WA_MESSAGES.modalTalk(projectTitle)),
}
