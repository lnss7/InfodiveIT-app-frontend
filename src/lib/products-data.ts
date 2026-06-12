import type { StaticImageData } from "next/image"
import {
  Activity,
  Cloud,
  Cog,
  HeadphonesIcon,
  LifeBuoy,
  RefreshCcw,
  ServerCog,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import awsLogo from "@/assets/AWS Logo.svg"
import acronisLogo from "@/assets/Acronis Logo.svg"
import dellLogo from "@/assets/Dell Logo.svg"
import ibmLogo from "@/assets/IBM Logo.svg"
import lenovoLogo from "@/assets/Lenovo Logo.svg"
import microsoftLogo from "@/assets/Microsoft Logo.svg"
import redhatPretoLogo from "@/assets/Red Hat Preto Logo.svg"
import veeamLogo from "@/assets/Veeam Logo.svg"

export interface ProductDifferential {
  title: string
  description: string
}

export interface ProductUseCase {
  title: string
  description: string
}

export interface ProductService {
  nome: string
  icon: LucideIcon
}

/**
 * Modelo de exibição do produto. Espelha `ProdutoDTO` (ver lib/api.ts) com os
 * campos extras necessários só pra UI (logo do fabricante, ícones de serviço).
 * Quando o backend estiver conectado, troca-se a fonte por `api.produtos()`.
 */
export interface Product {
  slug: string
  nome: string
  fabricante: string
  fabricanteSlug: string
  logo: StaticImageData
  /** altura do logo (os SVGs têm proporções diferentes) */
  logoClass: string
  categoria: string
  categoriaSlug: string
  subcategoria: string
  descricaoCurta: string
  descricaoCompleta: string
  destaque: boolean
  diferenciais: ProductDifferential[]
  casosDeUso: ProductUseCase[]
  /** serviços profissionais que se integram ao produto (diagrama AnimatedBeam) */
  servicos: ProductService[]
}

export const PRODUCTS: Product[] = [
  {
    slug: "ibm-guardium",
    nome: "IBM Guardium",
    fabricante: "IBM",
    fabricanteSlug: "ibm",
    logo: ibmLogo,
    logoClass: "h-5",
    categoria: "Segurança",
    categoriaSlug: "seguranca",
    subcategoria: "Segurança de Dados",
    descricaoCurta:
      "Descoberta, monitoramento e proteção de dados sensíveis em tempo real.",
    descricaoCompleta:
      "O IBM Guardium oferece visibilidade total sobre onde estão seus dados sensíveis e quem os acessa. Monitora atividades em bancos de dados, data warehouses e ambientes de nuvem, aplicando políticas de conformidade (LGPD, PCI-DSS) e detectando comportamentos anômalos antes que virem incidentes.",
    destaque: true,
    diferenciais: [
      { title: "Descoberta automática", description: "Mapeia dados sensíveis em ambientes on-prem e multicloud sem agentes pesados." },
      { title: "Análise de risco em tempo real", description: "Detecta acessos anômalos e tentativas de exfiltração com analytics comportamental." },
      { title: "Conformidade contínua", description: "Relatórios prontos para LGPD, PCI-DSS, SOX e auditorias recorrentes." },
    ],
    casosDeUso: [
      { title: "Proteção de dados regulados", description: "Instituições financeiras e saúde que precisam comprovar conformidade." },
      { title: "Auditoria de acessos", description: "Rastreabilidade completa de quem acessou quais dados e quando." },
      { title: "Resposta a incidentes", description: "Alertas acionáveis integrados ao SOC para conter ameaças rapidamente." },
    ],
    servicos: [
      { nome: "Implementação", icon: Wrench },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
      { nome: "Conformidade", icon: ShieldCheck },
    ],
  },
  {
    slug: "veeam-data-platform",
    nome: "Veeam Data Platform",
    fabricante: "Veeam",
    fabricanteSlug: "veeam",
    logo: veeamLogo,
    logoClass: "h-4",
    categoria: "Proteção de Dados",
    categoriaSlug: "protecao-de-dados",
    subcategoria: "Backup & Recuperação",
    descricaoCurta:
      "Backup e recuperação confiáveis para ambientes híbridos e multicloud.",
    descricaoCompleta:
      "A Veeam Data Platform unifica backup, recuperação e proteção contra ransomware em uma única plataforma. Com backups imutáveis, recuperação instantânea e verificação automática de restauração, garante a continuidade do negócio mesmo nos piores cenários.",
    destaque: true,
    diferenciais: [
      { title: "Backups imutáveis", description: "Cópias à prova de ransomware (WORM) que não podem ser alteradas ou apagadas." },
      { title: "Recuperação instantânea", description: "Restaure VMs, bancos e arquivos em minutos, não em horas." },
      { title: "Multicloud nativo", description: "Proteção consistente em VMware, Hyper-V, AWS, Azure e Microsoft 365." },
    ],
    casosDeUso: [
      { title: "Defesa contra ransomware", description: "Camada imutável que garante recuperação sem pagar resgate." },
      { title: "Disaster Recovery", description: "Failover orquestrado para um site secundário com RTO baixo." },
      { title: "Proteção de Microsoft 365", description: "Backup de e-mails, Teams e SharePoint fora da retenção nativa." },
    ],
    servicos: [
      { nome: "Implementação", icon: Wrench },
      { nome: "DRaaS", icon: LifeBuoy },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
    ],
  },
  {
    slug: "dell-poweredge",
    nome: "Dell PowerEdge",
    fabricante: "Dell Technologies",
    fabricanteSlug: "dell",
    logo: dellLogo,
    logoClass: "h-8",
    categoria: "Infraestrutura",
    categoriaSlug: "infraestrutura",
    subcategoria: "Servidores",
    descricaoCurta:
      "Servidores de alta performance para as cargas mais críticas do negócio.",
    descricaoCompleta:
      "Os servidores Dell PowerEdge entregam a base de computação para workloads exigentes — de virtualização densa a inteligência artificial. Com gerenciamento iDRAC, segurança em nível de hardware e escalabilidade modular, sustentam operações que não podem parar.",
    destaque: false,
    diferenciais: [
      { title: "Performance escalável", description: "Plataformas de 1 a 4 sockets para crescer conforme a demanda." },
      { title: "Segurança no silício", description: "Root of Trust e boot verificado protegem desde o firmware." },
      { title: "Gestão simplificada", description: "Automação de provisionamento e telemetria via iDRAC e OpenManage." },
    ],
    casosDeUso: [
      { title: "Virtualização densa", description: "Consolide dezenas de VMs por host com alta disponibilidade." },
      { title: "Cargas de IA/ML", description: "Configurações com GPU para treinamento e inferência." },
      { title: "Edge computing", description: "Modelos compactos para filiais e ambientes de borda." },
    ],
    servicos: [
      { nome: "Projeto & Deploy", icon: ServerCog },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
      { nome: "Monitoramento", icon: Activity },
    ],
  },
  {
    slug: "acronis-cyber-protect",
    nome: "Acronis Cyber Protect",
    fabricante: "Acronis",
    fabricanteSlug: "acronis",
    logo: acronisLogo,
    logoClass: "h-6",
    categoria: "Segurança",
    categoriaSlug: "seguranca",
    subcategoria: "Backup & Cibersegurança",
    descricaoCurta:
      "Cibersegurança e backup unificados em uma única solução integrada.",
    descricaoCompleta:
      "O Acronis Cyber Protect combina backup, anti-malware com IA e gestão de proteção numa só plataforma. Reduz a complexidade de operar ferramentas separadas e garante que os dados estejam protegidos e recuperáveis mesmo sob ataque ativo.",
    destaque: false,
    diferenciais: [
      { title: "Proteção unificada", description: "Backup e EDR no mesmo agente, sem conflitos entre ferramentas." },
      { title: "Anti-ransomware com IA", description: "Detecção comportamental que reverte alterações maliciosas." },
      { title: "Gestão centralizada", description: "Console único para políticas, alertas e recuperação." },
    ],
    casosDeUso: [
      { title: "PMEs e filiais", description: "Proteção completa sem time de segurança dedicado." },
      { title: "Endpoints remotos", description: "Backup e defesa de notebooks fora da rede corporativa." },
      { title: "Recuperação confiável", description: "Restauração validada após incidentes de segurança." },
    ],
    servicos: [
      { nome: "Implementação", icon: Wrench },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
      { nome: "Monitoramento", icon: Activity },
    ],
  },
  {
    slug: "red-hat-openshift",
    nome: "Red Hat OpenShift",
    fabricante: "Red Hat",
    fabricanteSlug: "red-hat",
    logo: redhatPretoLogo,
    logoClass: "h-6",
    categoria: "Cloud",
    categoriaSlug: "cloud",
    subcategoria: "Kubernetes & Containers",
    descricaoCurta:
      "Plataforma Kubernetes corporativa para nuvem pública, privada e híbrida.",
    descricaoCompleta:
      "O Red Hat OpenShift é a plataforma de containers líder para modernizar aplicações e padronizar a entrega de software. Oferece Kubernetes endurecido, pipelines de CI/CD integrados e operação consistente em qualquer nuvem ou datacenter.",
    destaque: true,
    diferenciais: [
      { title: "Híbrido de verdade", description: "Mesma experiência on-prem, em nuvem pública e na borda." },
      { title: "Segurança integrada", description: "Políticas, RBAC e supply chain seguro por padrão." },
      { title: "Produtividade dev", description: "CI/CD, GitOps e catálogos de serviços prontos para times." },
    ],
    casosDeUso: [
      { title: "Modernização de apps", description: "Migre monólitos para microsserviços com containers." },
      { title: "Plataforma interna", description: "Self-service para times de desenvolvimento (IDP)." },
      { title: "Workloads de IA", description: "Orquestração de modelos e pipelines de dados em escala." },
    ],
    servicos: [
      { nome: "Arquitetura", icon: Cog },
      { nome: "Migração", icon: RefreshCcw },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
    ],
  },
  {
    slug: "microsoft-azure",
    nome: "Microsoft Azure",
    fabricante: "Microsoft",
    fabricanteSlug: "microsoft",
    logo: microsoftLogo,
    logoClass: "h-7",
    categoria: "Cloud",
    categoriaSlug: "cloud",
    subcategoria: "Nuvem Pública",
    descricaoCurta:
      "Nuvem escalável para modernização, inovação e analytics em escala global.",
    descricaoCompleta:
      "A nuvem Microsoft Azure oferece um catálogo completo de serviços — computação, dados, IA e segurança — com presença global. A Infodive projeta, migra e gerencia ambientes Azure com governança de custos (FinOps) e segurança Zero Trust.",
    destaque: false,
    diferenciais: [
      { title: "Escala global", description: "Datacenters em dezenas de regiões com baixa latência." },
      { title: "IA e dados", description: "Serviços gerenciados de IA, analytics e bancos de dados." },
      { title: "Governança de custos", description: "FinOps e tags para previsibilidade e otimização contínua." },
    ],
    casosDeUso: [
      { title: "Migração para a nuvem", description: "Lift-and-shift ou modernização de cargas legadas." },
      { title: "Ambientes híbridos", description: "Integração com datacenter via Azure Arc e ExpressRoute." },
      { title: "Plataformas de dados", description: "Lakehouse e analytics com Synapse e Fabric." },
    ],
    servicos: [
      { nome: "Migração", icon: RefreshCcw },
      { nome: "Cloud Gerenciada", icon: Cloud },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
    ],
  },
  {
    slug: "ibm-flashsystem",
    nome: "IBM FlashSystem",
    fabricante: "IBM",
    fabricanteSlug: "ibm",
    logo: ibmLogo,
    logoClass: "h-5",
    categoria: "Armazenamento",
    categoriaSlug: "armazenamento",
    subcategoria: "Storage All-Flash",
    descricaoCurta:
      "Armazenamento all-flash de alta performance com proteção contra ransomware.",
    descricaoCompleta:
      "O IBM FlashSystem entrega latência consistente em microssegundos com eficiência de dados por hardware (compressão e deduplicação). Inclui Safeguarded Copies imutáveis e detecção de anomalias por IA, unindo performance e resiliência cibernética no storage.",
    destaque: false,
    diferenciais: [
      { title: "Latência previsível", description: "Resposta em microssegundos mesmo sob carga intensa." },
      { title: "Eficiência por hardware", description: "Compressão e dedup sem impacto na performance." },
      { title: "Resiliência cibernética", description: "Cópias imutáveis e detecção de ransomware no storage." },
    ],
    casosDeUso: [
      { title: "Bancos de dados críticos", description: "Workloads transacionais que exigem baixa latência." },
      { title: "Consolidação de storage", description: "Reduza TCO unificando cargas em uma plataforma." },
      { title: "Proteção de dados primários", description: "Recuperação rápida a partir de cópias imutáveis." },
    ],
    servicos: [
      { nome: "Projeto & Deploy", icon: ServerCog },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
      { nome: "Monitoramento", icon: Activity },
    ],
  },
  {
    slug: "lenovo-thinkagile",
    nome: "Lenovo ThinkAgile",
    fabricante: "Lenovo",
    fabricanteSlug: "lenovo",
    logo: lenovoLogo,
    logoClass: "h-7",
    categoria: "Virtualização",
    categoriaSlug: "virtualizacao",
    subcategoria: "Hiperconvergência (HCI)",
    descricaoCurta:
      "Infraestrutura hiperconvergente que simplifica datacenter e filiais.",
    descricaoCompleta:
      "As plataformas Lenovo ThinkAgile integram computação, armazenamento e rede em appliances hiperconvergentes pré-validados. Reduzem a complexidade do datacenter, aceleram a implantação e escalam de forma linear conforme o negócio cresce.",
    destaque: false,
    diferenciais: [
      { title: "Implantação acelerada", description: "Appliances pré-validados prontos para produção em horas." },
      { title: "Escala linear", description: "Adicione nós sem rearquitetar o ambiente." },
      { title: "Operação simplificada", description: "Gestão unificada de compute, storage e rede." },
    ],
    casosDeUso: [
      { title: "Modernização de datacenter", description: "Substitua silos por uma stack convergente." },
      { title: "VDI", description: "Desktops virtuais com performance previsível." },
      { title: "Filiais (ROBO)", description: "Infraestrutura compacta e gerenciada remotamente." },
    ],
    servicos: [
      { nome: "Projeto & Deploy", icon: ServerCog },
      { nome: "Migração", icon: RefreshCcw },
      { nome: "Sustentação 24/7", icon: HeadphonesIcon },
    ],
  },
]

/** Categorias derivadas (para as tabs de filtro). "Todos" + únicas, em ordem de aparição. */
export const PRODUCT_CATEGORIES = [
  "Todos",
  ...Array.from(new Set(PRODUCTS.map((p) => p.categoria))),
]

/** Fabricantes derivados (para o select de filtro). */
export const PRODUCT_FABRICANTES = Array.from(
  new Set(PRODUCTS.map((p) => p.fabricante))
).sort()

/** Stats para o NumberTicker do hero. */
export const PRODUCT_STATS = {
  produtos: PRODUCTS.length,
  fabricantes: PRODUCT_FABRICANTES.length,
  categorias: PRODUCT_CATEGORIES.length - 1, // remove "Todos"
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

/** Produtos relacionados: mesma categoria ou fabricante (exclui o próprio). */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      (p.categoriaSlug === product.categoriaSlug ||
        p.fabricanteSlug === product.fabricanteSlug)
  ).slice(0, limit)
}
