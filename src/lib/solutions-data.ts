import {
  Server,
  HardDrive,
  ShieldCheck,
  Lock,
  Activity,
  Layers,
  Cloud,
  Brain,
  Laptop,
} from "lucide-react";

export const SOLUTION_ICONS = {
  infraestrutura: Server,
  armazenamento: HardDrive,
  "protecao-de-dados": ShieldCheck,
  seguranca: Lock,
  observability: Activity,
  virtualizacao: Layers,
  cloud: Cloud,
  "inteligencia-artificial": Brain,
  endpoints: Laptop,
} as const;

export type SolutionIconName = keyof typeof SOLUTION_ICONS;

export interface Feature {
  title: string;
  description: string;
  /** Palavra-chave curta exibida como selo no card (ex.: "HARDWARE"). */
  tag?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Solution {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  iconName: SolutionIconName;
  metrics: Metric[];
  features: Feature[];
  vendors: string[];
  vendorObjects?: Array<{ nome: string; logoUrl?: string }>;
  caseStudy: {
    client: string;
    segmento: string;
    metric: string;
    resultado: string;
  };
  categoriaId?: string;
  categoriaNome?: string;
  imageUrl?: string;
  fabricantesTitulo?: string;
  fabricantesDescricao?: string;
  recursosChave?: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "infraestrutura",
    title: "Infraestrutura de TI Corporativa",
    subtitle: "Servidores robustos, redes resilientes e soluções de datacenter sob medida.",
    description: "Sustente suas operações mais críticas com hardware de altíssima performance, escalabilidade nativa e arquitetura dedicada.",
    overview: "Nossa especialidade é projetar e implantar ambientes de hardware de alta densidade que não podem parar. Ajudamos empresas a dimensionar servidores locais e híbridos, otimizar roteamento de redes enterprise e gerenciar datacenters com foco em baixíssima latência e redundância física completa.",
    iconName: "infraestrutura",
    metrics: [
      { value: "+40%", label: "Mais processamento" },
      { value: "99.99%", label: "Uptime da infraestrutura" },
      { value: "24/7", label: "Monitoramento proativo" },
    ],
    features: [
      {
        title: "Servidores Dedicados de Alta Densidade",
        tag: "Hardware",
        description: "Processamento maciço com servidores de última geração (como Dell PowerEdge e Lenovo ThinkSystem), configurados sob medida para o ERP e bases de dados do seu negócio.",
      },
      {
        title: "Arquitetura de Rede Enterprise",
        tag: "Rede",
        description: "Switches de baixa latência, roteamento inteligente e firewalls integrados para garantir tráfego interno ultraveloz e seguro.",
      },
      {
        title: "Gestão e Sustentação Avançada",
        tag: "Suporte 24/7",
        description: "Suporte especializado nível 3 constante, monitoramento de integridade física e substituição preventiva de componentes.",
      },
    ],
    vendors: ["Dell Technologies", "Lenovo", "HPE"],
    caseStudy: {
      client: "Vesta Manufatura",
      segmento: "Indústria Pesada",
      metric: "+40% Performance",
      resultado: "Renovação completa do cluster de processamento local conectado com servidores híbridos escaláveis e de alta densidade, eliminando gargalos operacionais.",
    },
  },
  {
    slug: "armazenamento",
    title: "Armazenamento & Storages Corporativos",
    subtitle: "Storage corporativo escalável, seguro e de ultra-performance.",
    description: "Gerencie volumes massivos de dados com storages híbridos ou 100% Flash com taxas de transferência líderes de mercado.",
    overview: "Os dados são o ativo mais precioso das corporações. Projetamos sistemas de storage escaláveis (SAN, NAS e Object Storage) com deduplicação e compressão de hardware ativas, reduzindo o custo total de propriedade (TCO) enquanto entregamos os menores tempos de acesso possíveis.",
    iconName: "armazenamento",
    metrics: [
      { value: "-40%", label: "Custo de storage (TCO)" },
      { value: "0ms", label: "Latência em cache Flash" },
      { value: "PB", label: "Escalabilidade de dados" },
    ],
    features: [
      {
        title: "All-Flash & Storages Híbridos",
        tag: "All-Flash",
        description: "Aceleração de leitura e escrita com storages de alto desempenho para virtualização e analytics pesado.",
      },
      {
        title: "Tiering Inteligente & FinOps",
        tag: "FinOps",
        description: "Movimentação automática de dados frios para camadas de armazenamento econômicas ou nuvem, otimizando o TCO.",
      },
      {
        title: "Deduplicação por Hardware",
        tag: "Dedup",
        description: "Compactação em nível de bloco que maximiza o aproveitamento físico dos storages sem degradar a performance das aplicações.",
      },
    ],
    vendors: ["IBM", "Dell Technologies", "Lenovo"],
    caseStudy: {
      client: "Vesta Manufatura",
      segmento: "Indústria Pesada",
      metric: "+40% Performance",
      resultado: "Reestruturação das camadas de armazenamento de dados produtivos com storages flash conectados por fibra óptica.",
    },
  },
  {
    slug: "protecao-de-dados",
    title: "Proteção de Dados & Backup Imutável",
    subtitle: "Sistemas avançados de backup, replicação e recuperação a prova de falhas.",
    description: "Rotinas automáticas e criptografia militar para garantir que sua empresa possa restaurar operações críticas em minutos.",
    overview: "Protegemos a continuidade de negócios através de arquiteturas modernas de backup. Criamos ambientes imutáveis contra ataques de ransomware (WORM) e desenhamos estratégias de replicação geográfica e Disaster Recovery as a Service (DRaaS) com tempos de recuperação quase instantâneos.",
    iconName: "protecao-de-dados",
    metrics: [
      { value: "< 10 min", label: "Tempo de Restauração (RTO)" },
      { value: "100%", label: "Dados Imutáveis e Protegidos" },
      { value: "0%", label: "Perda de dados operacionais" },
    ],
    features: [
      {
        title: "Backup Imutável (Anti-Ransomware)",
        tag: "Imutável",
        description: "Gravação sob protocolo WORM (Write Once, Read Many). Mesmo se credenciais de administrador forem roubadas, o backup não pode ser apagado ou criptografado.",
      },
      {
        title: "Replicação Híbrida Automática",
        tag: "Replicação",
        description: "Replicamos os dados no tripé local, nuvem privada Infodive e hiperescaladores em tempo real para total tolerância a desastres físicos.",
      },
      {
        title: "Orquestração de Desastres (DRaaS)",
        tag: "DRaaS",
        description: "Planos automatizados de contingência que sobem instâncias na nuvem em minutos, assumindo o processamento caso o datacenter local sofra uma parada total.",
      },
    ],
    vendors: ["Veeam", "Acronis", "IBM"],
    caseStudy: {
      client: "Rede Cosmos",
      segmento: "Varejo e E-commerce",
      metric: "< 10 min RTO",
      resultado: "Implementação de rotina de proteção de dados imutável em nuvem com restauração automatizada instantânea sob demanda nas frentes de caixa.",
    },
  },
  {
    slug: "seguranca",
    title: "Cibersegurança Ativa & Zero Trust",
    subtitle: "Proteção ponta a ponta contra ameaças virtuais avançadas e conformidade LGPD.",
    description: "Blindagem de perímetro, EDR/MDR proativos e gestão de acessos baseada no princípio do menor privilégio.",
    overview: "Nossa metodologia de segurança foca em inteligência de ameaças ativa e monitoramento contínuo. Implementamos políticas rígidas de Zero Trust, garantindo que todo dispositivo e usuário seja autenticado e monitorado ativamente antes de acessar dados críticos da organização.",
    iconName: "seguranca",
    metrics: [
      { value: "24/7/365", label: "Monitoramento de ameaças" },
      { value: "Zero", label: "Incidentes não contidos" },
      { value: "100%", label: "Conformidade LGPD" },
    ],
    features: [
      {
        title: "Zero Trust Network Access (ZTNA)",
        tag: "Zero Trust",
        description: "Substituição de VPNs legadas por acessos granulares, contextualizados e seguros para cada colaborador, reduzindo drasticamente a superfície de ataque.",
      },
      {
        title: "EDR & MDR Avançados nos Endpoints",
        tag: "EDR / MDR",
        description: "Agentes inteligentes que detectam e bloqueiam comportamentos suspeitos e ameaças de dia zero em servidores e desktops em tempo real.",
      },
      {
        title: "Gestão e Proteção de Dados Sensíveis",
        tag: "LGPD",
        description: "Descoberta, classificação automática e proteção ativa de dados confidenciais com soluções integradas como IBM Guardium.",
      },
    ],
    vendors: ["IBM", "Acronis", "Microsoft"],
    caseStudy: {
      client: "Rede Cosmos",
      segmento: "Varejo e E-commerce",
      metric: "100% Protegido",
      resultado: "Segurança de dados e contenção preventiva de ameaças de ransomware em tempo de execução nos endpoints da operação.",
    },
  },
  {
    slug: "observability",
    title: "Observability & Telemetria Enterprise",
    subtitle: "Visão em tempo real da integridade das aplicações, redes e infraestrutura.",
    description: "Métricas consolidadas, logs correlacionados e alertas inteligentes para detectar e mitigar problemas antes que afetem o cliente final.",
    overview: "Substituímos o monitoramento passivo por plataformas avançadas de observabilidade. Correlacionamos dados de performance de banco de dados, servidores, rede e experiência de usuário para gerar relatórios preditivos e automatizar a resolução de gargalos de software e hardware.",
    iconName: "observability",
    metrics: [
      { value: "100%", label: "Visibilidade da operação" },
      { value: "Predict", label: "Alertas baseados em IA" },
      { value: "-80%", label: "Tempo de diagnóstico (MTTR)" },
    ],
    features: [
      {
        title: "Monitoramento APM e Infraestrutura",
        tag: "APM",
        description: "Rastreamento completo do ciclo de requisições de software, latência de banco de dados e utilização de recursos físicos da infraestrutura.",
      },
      {
        title: "Correlação Inteligente de Logs",
        tag: "Logs",
        description: "Centralização e análise de logs com algoritmos avançados para identificar a causa raiz de anomalias em poucos segundos.",
      },
      {
        title: "Painéis Executivos & Técnicos",
        tag: "Dashboards",
        description: "Dashboards customizados que traduzem a saúde técnica dos sistemas em métricas e indicadores de negócios diretamente compreensíveis.",
      },
    ],
    vendors: ["IBM", "Microsoft", "AWS"],
    caseStudy: {
      client: "Banco Regional",
      segmento: "Setor Financeiro",
      metric: "99.98% Uptime",
      resultado: "Painel centralizado de telemetria que permitiu diagnosticar gargalos de conexão e latência de bancos de dados legados.",
    },
  },
  {
    slug: "virtualizacao",
    title: "Virtualização & Consolidação de Servidores",
    subtitle: "Hipervisores robustos para maximizar a eficiência energética e física.",
    description: "Criação de clusters virtuais elásticos de alta densidade e isolamento de cargas com performance nativa.",
    overview: "Transformamos datacenters subutilizados em infraestruturas virtuais otimizadas. Gerenciamos e consolidamos ambientes físicos através de hipervisores modernos, maximizando o retorno de investimento (ROI) em computação e facilitando a recuperação em caso de falhas de hardware.",
    iconName: "virtualizacao",
    metrics: [
      { value: "90%", label: "Consolidação de hardware" },
      { value: "Live", label: "Migração de máquinas ativas" },
      { value: "3.5x", label: "Retorno do investimento (ROI)" },
    ],
    features: [
      {
        title: "Clusters de Alta Disponibilidade",
        tag: "Alta Disponibilidade",
        description: "Agrupamento de múltiplos servidores físicos que realocam e iniciam workloads virtuais de forma automática caso algum nó apresente falhas.",
      },
      {
        title: "Live Migration Sem Interrupção",
        tag: "Live Migration",
        description: "Migração de sistemas ativos entre servidores físicos em tempo real para manutenções programadas, sem gerar impacto no uso.",
      },
      {
        title: "Hiperconvergência Eficiente",
        tag: "HCI",
        description: "Fusão lógica de processamento, armazenamento e redes em uma única camada virtualizada simplificada e inteligente.",
      },
    ],
    vendors: ["VMware", "Red Hat", "Virtuozzo"],
    caseStudy: {
      client: "Vesta Manufatura",
      segmento: "Indústria Pesada",
      metric: "+40% Performance",
      resultado: "Consolidação de 12 servidores antigos em apenas 3 nós de alta capacidade com replicação activa, simplificando drasticamente o gerenciamento.",
    },
  },
  {
    slug: "cloud",
    title: "Nuvem Híbrida & Hiperescaladores",
    subtitle: "Arquitetura, migração segura e governança de cloud para alta escalabilidade.",
    description: "Ambientes AWS, Azure ou nuvem privada Infodive integrados de forma transparente sob o conceito de nuvem híbrida.",
    overview: "Guiamos sua jornada para a nuvem de ponta a ponta. Seja migrando sistemas complexos para a AWS/Azure, operando nossa nuvem privada dedicada de alta performance ou integrando ambas em um ecossistema híbrido de latência ultra-baixa, estruturamos soluções seguras de acordo com regulamentações corporativas.",
    iconName: "cloud",
    metrics: [
      { value: "99.98%", label: "Uptime da Nuvem" },
      { value: "FinOps", label: "Otimização de custos ativa" },
      { value: "100%", label: "Escalabilidade elástica" },
    ],
    features: [
      {
        title: "Nuvem Híbrida Sob Medida",
        tag: "Nuvem Híbrida",
        description: "Integração segura entre sua infraestrutura física (on-premises) e nuvens públicas, permitindo processamento elástico sem expor dados confidenciais.",
      },
      {
        title: "Governança Híbrida e Compliance",
        tag: "Governança",
        description: "Políticas de segurança centralizadas e controle de tráfego que evitam vazamentos e mantêm total conformidade legal.",
      },
      {
        title: "Otimização de Custos (FinOps)",
        tag: "FinOps",
        description: "Monitoramento e redimensionamento constante de recursos em nuvem para eliminar desperdícios e manter as faturas previsíveis.",
      },
    ],
    vendors: ["AWS", "Microsoft", "Red Hat"],
    caseStudy: {
      client: "Banco Regional",
      segmento: "Setor Financeiro",
      metric: "99.98% Uptime",
      resultado: "Migração de operações críticas para arquitetura multicloud redundante e gerenciada de alta disponibilidade.",
    },
  },
  {
    slug: "inteligencia-artificial",
    title: "Infraestrutura para Inteligência Artificial",
    subtitle: "Adoção prática, infraestrutura e plataformas especializadas para IA.",
    description: "Desenvolvimento e sustentação de clusters para processamento massivo, modelagem de dados e IA Generativa aplicada.",
    overview: "Viabilizamos projetos de Inteligência Artificial desenhando a infraestrutura necessária. Desde o processamento de GPU de alto desempenho e pipelines de dados integrados até a implantação local ou híbrida de modelos de linguagem (LLMs) corporativos com privacidade total.",
    iconName: "inteligencia-artificial",
    metrics: [
      { value: "GPU", label: "Clusters dedicados" },
      { value: "Secure", label: "Treinamento isolado de dados" },
      { value: "10x", label: "Mais agilidade analítica" },
    ],
    features: [
      {
        title: "Infraestrutura de Processamento para IA",
        tag: "GPU",
        description: "Configuração e entrega de servidores equipados com GPUs avançadas e arquitetura otimizada para treinamento e inferência de modelos analíticos.",
      },
      {
        title: "Plataformas de Modelagem e Dados",
        tag: "Data Pipeline",
        description: "Pipelines de dados modernos estruturados para alimentar modelos de machine learning de forma automatizada e com total integridade.",
      },
      {
        title: "Modelos Privativos (Local LLMs)",
        tag: "Local LLM",
        description: "Instalação de modelos de linguagem inteligência artificial em servidores próprios da empresa para análise de dados com garantia de sigilo industrial.",
      },
    ],
    vendors: ["IBM", "Microsoft", "AWS"],
    caseStudy: {
      client: "Banco Regional",
      segmento: "Setor Financeiro",
      metric: "IA Integrada",
      resultado: "Implantação de modelos de IA analítica para prevenção a fraudes em transações financeiras na nuvem.",
    },
  },
  {
    slug: "endpoints",
    title: "Endpoints & Gestão de Dispositivos",
    subtitle: "Gerenciamento centralizado, padronização e segurança de estações de trabalho.",
    description: "Provisionamento automático, controle de patch management e segurança para frotas híbridas de desktops e notebooks.",
    overview: "Protegemos e padronizamos a porta de entrada da sua infraestrutura corporativa. Com soluções modernas de Unified Endpoint Management (UEM), mantemos servidores virtuais, notebooks de colaboradores e sistemas remotos constantemente atualizados, auditados e seguros.",
    iconName: "endpoints",
    metrics: [
      { value: "100%", label: "Dispositivos monitorados" },
      { value: "Zero", label: "Vulnerabilidades críticas abertas" },
      { value: "Auto", label: "Patching de segurança" },
    ],
    features: [
      {
        title: "Unified Endpoint Management (UEM)",
        tag: "UEM",
        description: "Gerenciamento centralizado de sistemas operacionais híbridos (Windows, macOS, Linux) para auditorias de segurança e políticas unificadas.",
      },
      {
        title: "Distribuição e Patching Automático",
        tag: "Patching",
        description: "Atualizações de segurança críticas implantadas sem interrupção de produtividade dos colaboradores e com relatórios automáticos de conformidade.",
      },
      {
        title: "Segurança de Dispositivos Remotos",
        tag: "Criptografia",
        description: "Criptografia de disco local compulsória, bloqueio de portas USB e isolamento de máquinas perdidas ou roubadas para proteção total de informações corporativas.",
      },
    ],
    vendors: ["Microsoft", "Acronis", "Apple"],
    caseStudy: {
      client: "Rede Cosmos",
      segmento: "Varejo e E-commerce",
      metric: "142 Endpoints",
      resultado: "Padronização e monitoramento de 142 endpoints e terminais de venda em tempo integral, garantindo conformidade e segurança total de dados.",
    },
  },
];
