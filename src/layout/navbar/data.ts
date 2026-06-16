import {
  Activity,
  Brain,
  Cloud,
  HardDrive,
  Laptop,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export type NavCategoria = {
  nome: string
  descricao: string
  href: string
  icon: LucideIcon
}

export type NavFabricante = {
  nome: string
  href: string
}

export type NavConteudo = {
  titulo: string
  descricao: string
  href: string
  tag?: string
  imagem?: string
}

export type NavLink = {
  label: string
  href: string
  dropdown?: 'solucoes' | 'produtos'
}

export const navLinks: NavLink[] = [
  { label: 'Soluções', href: '/solucoes', dropdown: 'solucoes' },
  { label: 'Produtos', href: '/produtos', dropdown: 'produtos' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Nosso Blog', href: '/blog' },
  { label: 'Quem Somos', href: '/sobre' },
]

export const categorias: NavCategoria[] = [
  {
    nome: 'Infraestrutura',
    descricao: 'Servidores, redes e datacenter',
    href: '/solucoes/infraestrutura',
    icon: Server,
  },
  {
    nome: 'Armazenamento',
    descricao: 'Storage corporativo escalável',
    href: '/solucoes/armazenamento',
    icon: HardDrive,
  },
  {
    nome: 'Proteção de Dados',
    descricao: 'Backup, replicação e recuperação',
    href: '/solucoes/protecao-de-dados',
    icon: ShieldCheck,
  },
  {
    nome: 'Segurança',
    descricao: 'Firewall, EDR e zero trust',
    href: '/solucoes/seguranca',
    icon: Lock,
  },
  {
    nome: 'Observability',
    descricao: 'Monitoração e telemetria',
    href: '/solucoes/observability',
    icon: Activity,
  },
  {
    nome: 'Virtualização',
    descricao: 'Hipervisores e workloads',
    href: '/solucoes/virtualizacao',
    icon: Layers,
  },
  {
    nome: 'Cloud',
    descricao: 'Public, private e hybrid cloud',
    href: '/solucoes/cloud',
    icon: Cloud,
  },
  {
    nome: 'Inteligência Artificial',
    descricao: 'Plataformas e infraestrutura para IA',
    href: '/solucoes/inteligencia-artificial',
    icon: Brain,
  },
  {
    nome: 'Endpoints',
    descricao: 'Estações, mobilidade e gestão',
    href: '/solucoes/endpoints',
    icon: Laptop,
  },
]

export const fabricantesDestaque: NavFabricante[] = [
  { nome: 'IBM', href: '/produtos?fabricante=IBM' },
  { nome: 'Lenovo', href: '/produtos?fabricante=Lenovo' },
  { nome: 'Dell', href: '/produtos?fabricante=Dell' },
  { nome: 'HPE', href: '/produtos?fabricante=HPE' },
  { nome: 'Veeam', href: '/produtos?fabricante=Veeam' },
  { nome: 'Acronis', href: '/produtos?fabricante=Acronis' },
  { nome: 'VMware', href: '/produtos?fabricante=VMware' },
  { nome: 'Red Hat', href: '/produtos?fabricante=Red Hat' },
  { nome: 'Microsoft', href: '/produtos?fabricante=Microsoft' },
  { nome: 'AWS', href: '/produtos?fabricante=AWS' },
]

export const ultimoConteudoDestaque: NavConteudo = {
  titulo: 'Como reduzir custo de storage corporativo em 40%',
  descricao:
    'Guia prático sobre tiering, dedup e arquitetura híbrida para reduzir TCO sem comprometer performance.',
  href: '/conteudos',
  tag: 'Artigo',
}

export type NavFabricanteComDescricao = {
  nome: string
  descricao: string
  href: string
}

export type NavProdutoComDescricao = {
  nome: string
  descricao: string
  href: string
  isHovered?: boolean
}

export const fabricantesProdutos: NavFabricanteComDescricao[] = [
  { nome: 'IBM', descricao: 'Servidores, storage e segurança', href: '/produtos?fabricante=IBM' },
  { nome: 'Lenovo', descricao: 'Endpoints e infraestrutura', href: '/produtos?fabricante=Lenovo' },
  { nome: 'Dell', descricao: 'Servidores e armazenamento', href: '/produtos?fabricante=Dell' },
  { nome: 'HPE', descricao: 'Infraestrutura enterprise', href: '/produtos?fabricante=HPE' },
  { nome: 'Microsoft', descricao: 'Cloud, segurança e endpoints', href: '/produtos?fabricante=Microsoft' },
  { nome: 'AWS', descricao: 'Nuvem pública e serviços gerenciados', href: '/produtos?fabricante=AWS' },
  { nome: 'Veeam', descricao: 'Proteção e recuperação de dados', href: '/produtos?fabricante=Veeam' },
  { nome: 'Acronis', descricao: 'Backup e cibersegurança', href: '/produtos?fabricante=Acronis' },
]

export const produtosIbm: NavProdutoComDescricao[] = [
  { nome: 'Servidores Power', descricao: 'Alta performance RISC', href: '/produtos/ibm-servers' },
  { nome: 'IBM Guardium', descricao: 'Segurança de dados', href: '/produtos/ibm-guardium', isHovered: true },
  { nome: 'IBM Verify', descricao: 'Gestão de identidade', href: '/produtos/ibm-verify' },
  { nome: 'IBM Storage Defender', descricao: 'Proteção de dados', href: '/produtos/ibm-storage-defender' },
  { nome: 'Watson AI', descricao: 'IA generativa corporativa', href: '/produtos/watson-ai' },
  { nome: 'IBM Cloud', descricao: 'Nuvem híbrida gerenciada', href: '/produtos/ibm-cloud' },
]
