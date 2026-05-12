import { LayoutDashboard, HeadphonesIcon, DollarSign, MessageSquare, Settings2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const WHATSAPP_BASE = 'https://wa.me/5591984219075'

export function whatsappUrl(projectTitle: string) {
  const text = `Olá, tenho interesse no projeto ${projectTitle} da Nexus Labs. Quero entender como posso adaptar para minha empresa.`
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`
}

export type ProjectStatus = 'Projeto pronto' | 'Adaptável' | 'Sob medida'

export interface Project {
  id: string
  icon: LucideIcon
  category: string
  title: string
  description: string
  features: string[]
  status: ProjectStatus
  featured?: boolean
  accent: string
  accentBg: string
  // Modal fields
  problem: string
  idealFor: string[]
  includedFeatures: string[]
  adaptation: string
  modules: string
  estimatedTime: string
  contractType: string
}

export const projects: Project[] = [
  {
    id: 'kmz-nexus',
    icon: LayoutDashboard,
    category: 'Gestão operacional',
    title: 'KMZ Nexus',
    description:
      'Plataforma premium para controle de pedidos, programação, carregamento, status e painéis executivos.',
    features: ['Pedidos e status em tempo real', 'Programação e carregamento', 'Dashboards executivos'],
    status: 'Projeto pronto',
    featured: true,
    accent: '#7B5CFF',
    accentBg: 'rgba(123,92,255,0.12)',
    problem:
      'Empresas que perdem controle sobre pedidos, status, programação, carregamento e acompanhamento operacional.',
    idealFor: [
      'Indústrias com fluxo de pedidos e produção',
      'Empresas que precisam controlar etapas operacionais',
      'Gestores que precisam acompanhar indicadores em tempo real',
    ],
    includedFeatures: [
      'Controle de pedidos e status',
      'Programação de produção',
      'Gestão de carregamento',
      'Painéis executivos',
      'Controle de permissões',
      'Relatórios e exportações',
    ],
    adaptation:
      'Pode ser adaptado para diferentes fluxos operacionais, tipos de pedido, setores, usuários, permissões e indicadores específicos da empresa.',
    modules: '6+',
    estimatedTime: '≤ 30 dias',
    contractType: 'Projeto pronto com adaptação',
  },
  {
    id: 'help-desk',
    icon: HeadphonesIcon,
    category: 'Atendimento interno',
    title: 'Help Desk',
    description:
      'Sistema de chamados com setores, prioridades, avaliações, histórico e acompanhamento de atendimento.',
    features: ['Abertura e gestão de chamados', 'Avaliação de atendimento', 'Controle por usuários e setores'],
    status: 'Adaptável',
    accent: '#4DA3FF',
    accentBg: 'rgba(77,163,255,0.12)',
    problem:
      'Empresas que ainda controlam chamados por WhatsApp, planilhas ou conversas soltas, sem histórico e sem prioridade clara.',
    idealFor: [
      'Setores de TI',
      'Manutenção interna',
      'Suporte administrativo',
      'Empresas que precisam organizar atendimento interno',
    ],
    includedFeatures: [
      'Abertura de chamados',
      'Controle por setores',
      'Prioridades e status',
      'Histórico de atendimento',
      'Avaliação do serviço',
      'Dashboards de desempenho',
    ],
    adaptation:
      'Pode ser adaptado para diferentes setores, tipos de atendimento, fluxos de aprovação, SLA e integrações com WhatsApp.',
    modules: '5+',
    estimatedTime: '15 a 30 dias',
    contractType: 'Projeto adaptável',
  },
  {
    id: 'financeiro',
    icon: DollarSign,
    category: 'Gestão financeira',
    title: 'Financeiro',
    description:
      'Dashboards, análises, relatórios e visão gerencial para acompanhar números com clareza.',
    features: ['Indicadores financeiros', 'Relatórios e exportações', 'Visão gerencial'],
    status: 'Adaptável',
    accent: '#4ADE80',
    accentBg: 'rgba(74,222,128,0.1)',
    problem:
      'Empresas que não possuem visão clara dos números, indicadores, relatórios e análises financeiras em tempo real.',
    idealFor: [
      'Gestores financeiros',
      'Empresas que usam planilhas manuais',
      'Negócios que precisam acompanhar resultados com clareza',
    ],
    includedFeatures: [
      'Dashboards financeiros',
      'Indicadores de receita e despesa',
      'Relatórios gerenciais',
      'Exportações',
      'Filtros por período',
      'Visão executiva',
    ],
    adaptation:
      'Pode ser adaptado conforme os indicadores financeiros da empresa, fontes de dados, relatórios necessários e níveis de acesso.',
    modules: '4+',
    estimatedTime: '15 a 30 dias',
    contractType: 'Projeto adaptável',
  },
  {
    id: 'agente-nexus',
    icon: MessageSquare,
    category: 'IA e WhatsApp',
    title: 'Agente Nexus',
    description:
      'Automação via WhatsApp com notificações, atendimento inteligente e abertura de chamados.',
    features: ['Atendimento automatizado', 'Notificações inteligentes', 'Integração com WhatsApp'],
    status: 'Sob medida',
    accent: '#9B82FF',
    accentBg: 'rgba(155,130,255,0.12)',
    problem:
      'Empresas que perdem tempo com atendimento repetitivo, notificações manuais e falta de automação nos canais de comunicação.',
    idealFor: [
      'Empresas que usam WhatsApp no atendimento',
      'Times de suporte',
      'Operações que precisam automatizar notificações',
      'Negócios que querem usar IA no atendimento',
    ],
    includedFeatures: [
      'Atendimento automatizado',
      'Notificações via WhatsApp',
      'Fluxos inteligentes',
      'Abertura de chamados',
      'Mensagens personalizadas',
      'Integração com sistemas',
    ],
    adaptation:
      'Pode ser criado sob medida para fluxos de atendimento, notificações internas, suporte ao cliente, abertura de chamados e agentes com IA.',
    modules: 'Sob demanda',
    estimatedTime: '20 a 45 dias',
    contractType: 'Sob medida',
  },
  {
    id: 'gestao-operacional',
    icon: Settings2,
    category: 'Processos internos',
    title: 'Gestão Operacional',
    description:
      'Controle completo de processos internos, equipes, etapas, status e indicadores em tempo real.',
    features: ['Fluxos personalizados', 'Permissões por perfil', 'Indicadores de operação'],
    status: 'Sob medida',
    accent: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.1)',
    problem:
      'Empresas que dependem de controles manuais, planilhas e processos descentralizados para acompanhar a operação.',
    idealFor: [
      'Empresas com processos internos complexos',
      'Gestores operacionais',
      'Times que precisam controlar etapas, responsáveis e prazos',
    ],
    includedFeatures: [
      'Fluxos personalizados',
      'Controle de etapas',
      'Permissões por perfil',
      'Indicadores operacionais',
      'Histórico de movimentações',
      'Dashboards de acompanhamento',
    ],
    adaptation:
      'Pode ser desenhado conforme a operação real da empresa, com etapas, status, usuários, permissões e relatórios específicos.',
    modules: 'Sob demanda',
    estimatedTime: '30 a 60 dias',
    contractType: 'Sob medida',
  },
]
