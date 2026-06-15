import {
  BookOpen,
  FileText,
  Play,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type TipoConteudo =
  | "artigo"
  | "whitepaper"
  | "case"
  | "datasheet"
  | "video";

/** Blocos do corpo do conteúdo — espelham um rich text simples vindo do backend. */
export type ArtigoBloco =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "citacao"; texto: string };

export type Artigo = {
  slug: string;
  tipo: TipoConteudo;
  categoria: string;
  fabricante: string;
  titulo: string;
  descricao: string;
  data: string;
  imagemBg: string;
  autor: string;
  tempoLeitura: string;
  conteudo: ArtigoBloco[];
};

/** Configuração visual por tipo: rótulo, cores do badge e ícone temático. */
export const TIPO_CONFIG: Record<
  TipoConteudo,
  { label: string; bg: string; color: string; icon: LucideIcon }
> = {
  artigo: { label: "Artigo", bg: "#E4EAFF", color: "#0E66FF", icon: FileText },
  whitepaper: {
    label: "Whitepaper",
    bg: "#F0F0F0",
    color: "#7B7B7B",
    icon: BookOpen,
  },
  case: { label: "Case", bg: "#E8F8F4", color: "#46BEA3", icon: TrendingUp },
  datasheet: {
    label: "Datasheet",
    bg: "#FFF7E6",
    color: "#BA7517",
    icon: Sparkles,
  },
  video: { label: "Vídeo", bg: "#FFE8E8", color: "#C0001A", icon: Play },
};

export const FILTROS: { label: string; value: TipoConteudo | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Artigos", value: "artigo" },
  { label: "Whitepapers", value: "whitepaper" },
  { label: "Cases", value: "case" },
  { label: "Datasheets", value: "datasheet" },
  { label: "Vídeos", value: "video" },
];

// Mocks — respeitam a entidade `conteudos` do backend (origem: interno).
export const ARTIGOS: Artigo[] = [
  {
    slug: "ibm-guardium-dados-sensiveis-ambientes-hibridos",
    tipo: "artigo",
    categoria: "Segurança",
    fabricante: "IBM",
    titulo: "Como o IBM Guardium protege dados sensíveis em ambientes híbridos",
    descricao:
      "Entenda como implementar conformidade LGPD sem impactar a performance do ambiente.",
    data: "18 Mai 2026",
    imagemBg: "#0D1221",
    autor: "Equipe Infodive",
    tempoLeitura: "7 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "Proteger dados sensíveis deixou de ser uma preocupação restrita ao time de segurança e passou a ser tema de conselho. Com a LGPD, qualquer vazamento envolvendo dados pessoais expõe a empresa a multas, danos reputacionais e perda de confiança do cliente. O desafio cresce em ambientes híbridos, onde a informação transita entre datacenter, nuvem pública e SaaS.",
      },
      {
        tipo: "subtitulo",
        texto: "Visibilidade antes de controle",
      },
      {
        tipo: "paragrafo",
        texto:
          "Não se protege o que não se enxerga. O IBM Guardium começa pela descoberta e classificação automática de dados sensíveis espalhados pelos repositórios — bancos relacionais, NoSQL, data lakes e arquivos. A partir desse mapa, é possível definir políticas de acesso e monitoramento com base no risco real de cada ativo.",
      },
      {
        tipo: "subtitulo",
        texto: "Monitoração contínua sem penalizar a performance",
      },
      {
        tipo: "paragrafo",
        texto:
          "A maior objeção dos DBAs costuma ser o impacto na performance. O Guardium opera com agentes leves (S-TAPs) que interceptam o tráfego de banco fora do caminho crítico da transação, registrando quem acessou o quê, quando e de onde — sem adicionar latência perceptível à aplicação.",
      },
      {
        tipo: "lista",
        itens: [
          "Auditoria independente do DBA, separando funções e evitando conflito de interesse.",
          "Alertas em tempo real para acessos anômalos ou exfiltração de dados.",
          "Mascaramento dinâmico para ambientes de homologação e desenvolvimento.",
          "Relatórios prontos para auditorias de LGPD, PCI-DSS e ISO 27001.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "Conformidade não é um projeto com data de término — é um processo contínuo de visibilidade, controle e evidência.",
      },
      {
        tipo: "subtitulo",
        texto: "Como a Infodive conduz o projeto",
      },
      {
        tipo: "paragrafo",
        texto:
          "Implantamos o Guardium em fases: começamos por um assessment dos repositórios críticos, definimos as políticas junto ao time de dados e ativamos a monitoração em modo observação antes de aplicar bloqueios. Esse método reduz falsos positivos e garante adoção sem fricção com as áreas de negócio.",
      },
    ],
  },
  {
    slug: "recuperacao-de-desastres-veeam-data-platform",
    tipo: "whitepaper",
    categoria: "Proteção de Dados",
    fabricante: "Veeam",
    titulo:
      "Guia completo de recuperação de desastres com Veeam Data Platform",
    descricao:
      "Estratégias práticas para atingir RTO abaixo de 4 horas em ambientes críticos.",
    data: "10 Mai 2026",
    imagemBg: "#0D1A0D",
    autor: "Equipe Infodive",
    tempoLeitura: "9 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "Um plano de recuperação de desastres só vale o que entrega quando testado sob pressão. Ter backup não é o mesmo que ter capacidade de recuperação. Este guia apresenta a abordagem que usamos para desenhar estratégias de DR com objetivos de RTO e RPO realistas e mensuráveis.",
      },
      {
        tipo: "subtitulo",
        texto: "RTO e RPO: traduzindo risco em números",
      },
      {
        tipo: "paragrafo",
        texto:
          "Antes de escolher tecnologia, é preciso classificar as aplicações por criticidade de negócio. Sistemas que sustentam faturamento exigem RTO de minutos; um portal interno tolera horas. Esse mapeamento define onde investir em replicação contínua e onde o backup tradicional já é suficiente.",
      },
      {
        tipo: "subtitulo",
        texto: "Backup imutável contra ransomware",
      },
      {
        tipo: "paragrafo",
        texto:
          "Ransomware moderno busca apagar ou criptografar os backups antes de atacar a produção. Com repositórios imutáveis (hardened repository e object lock), o Veeam garante cópias que não podem ser alteradas nem excluídas durante o período definido — sua última linha de defesa.",
      },
      {
        tipo: "lista",
        itens: [
          "Regra 3-2-1-1-0: três cópias, dois meios, uma off-site, uma imutável, zero erros nos testes.",
          "Replicação para site secundário ou nuvem com failover orquestrado.",
          "Instant Recovery para subir VMs direto do backup em minutos.",
          "SureBackup: testes automáticos de restauração validando o plano de DR.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "Um backup que nunca foi testado é apenas uma esperança. DR de verdade se prova com ensaios periódicos.",
      },
      {
        tipo: "subtitulo",
        texto: "Atingindo RTO abaixo de 4 horas",
      },
      {
        tipo: "paragrafo",
        texto:
          "Combinando Instant Recovery, replicação e runbooks de failover documentados, ambientes críticos atingem RTO inferior a quatro horas de forma consistente. A Infodive entrega o plano, automatiza os testes e acompanha os ensaios trimestrais junto ao cliente.",
      },
    ],
  },
  {
    slug: "reducao-de-custos-cloud-fintech",
    tipo: "case",
    categoria: "Cloud",
    fabricante: "Azure",
    titulo: "Como reduzimos 40% dos custos de cloud de uma fintech em 3 meses",
    descricao:
      "Da auditoria ao FinOps: o processo que a Infodive usou para recuperar controle do budget.",
    data: "02 Mai 2026",
    imagemBg: "#140D1A",
    autor: "Equipe Infodive",
    tempoLeitura: "6 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "Uma fintech em crescimento acelerado nos procurou com um problema comum: a conta de cloud crescia mais rápido que a receita, sem que ninguém soubesse exatamente o porquê. Em 90 dias, reduzimos 40% do custo mensal sem comprometer performance nem disponibilidade.",
      },
      {
        tipo: "subtitulo",
        texto: "O diagnóstico: para onde o dinheiro estava indo",
      },
      {
        tipo: "paragrafo",
        texto:
          "A primeira etapa foi tornar o gasto visível. Mapeamos recursos por aplicação, ambiente e time, e descobrimos os suspeitos de sempre: máquinas superdimensionadas, ambientes de teste ligados 24/7, discos órfãos e ausência total de reservas de capacidade.",
      },
      {
        tipo: "lista",
        itens: [
          "Rightsizing de VMs com base em telemetria real de CPU e memória.",
          "Desligamento automático de ambientes de não-produção fora do horário comercial.",
          "Reserved Instances e Savings Plans para workloads previsíveis.",
          "Limpeza de discos, snapshots e IPs órfãos sem uso.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "De economia pontual a cultura de FinOps",
      },
      {
        tipo: "paragrafo",
        texto:
          "Cortar custo uma vez é fácil; manter o controle é o desafio. Implantamos um ciclo de FinOps com dashboards de custo por time, alertas de anomalia e revisões mensais. A engenharia passou a enxergar o impacto financeiro de cada decisão de arquitetura.",
      },
      {
        tipo: "citacao",
        texto:
          "Cloud sem governança é dinheiro jogado fora. FinOps transforma custo em uma métrica de engenharia, não só de finanças.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Três meses depois, além dos 40% de redução, a fintech ganhou previsibilidade de budget e passou a tratar eficiência de nuvem como parte do processo de desenvolvimento.",
      },
    ],
  },
  {
    slug: "vmware-vs-proxmox-modernizar-datacenter",
    tipo: "artigo",
    categoria: "Virtualização",
    fabricante: "VMware",
    titulo: "VMware vs Proxmox: qual escolher para modernizar seu datacenter?",
    descricao:
      "Análise técnica e comercial das duas plataformas mais usadas em virtualização enterprise.",
    data: "28 Abr 2026",
    imagemBg: "#0D1221",
    autor: "Equipe Infodive",
    tempoLeitura: "8 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "As mudanças de licenciamento dos últimos anos reacenderam uma pergunta nas reuniões de TI: continuar no VMware ou migrar para Proxmox? Não existe resposta universal — existe a resposta certa para o seu contexto. Vamos comparar as duas plataformas com honestidade técnica e comercial.",
      },
      {
        tipo: "subtitulo",
        texto: "Maturidade e ecossistema",
      },
      {
        tipo: "paragrafo",
        texto:
          "O VMware oferece um ecossistema maduro, suporte enterprise robusto e integração nativa com praticamente todo fabricante de storage e backup. É a escolha segura para ambientes de missão crítica com requisitos rígidos de SLA e compliance.",
      },
      {
        tipo: "subtitulo",
        texto: "Custo e flexibilidade",
      },
      {
        tipo: "paragrafo",
        texto:
          "O Proxmox, open source e baseado em KVM e LXC, elimina o custo de licença e entrega excelente performance. Em troca, exige mais maturidade da equipe interna e um parceiro técnico sólido para arquitetura, alta disponibilidade e suporte.",
      },
      {
        tipo: "lista",
        itens: [
          "Workloads críticos com forte exigência de SLA tendem a permanecer no VMware.",
          "Ambientes de desenvolvimento, laboratório e cargas elásticas se beneficiam do Proxmox.",
          "Cenários híbridos — VMware na produção, Proxmox no resto — são cada vez mais comuns.",
          "O custo total deve considerar licença, suporte, capacitação e risco operacional.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "A pergunta certa não é 'qual é melhor?', mas 'qual entrega o melhor resultado para a minha operação e a minha equipe?'.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Infodive conduz provas de conceito com os dois hypervisors e apresenta uma análise de TCO de três anos, para que a decisão seja baseada em dados — não em modismo.",
      },
    ],
  },
  {
    slug: "datasheet-lenovo-thinksystem-sr650-v3",
    tipo: "datasheet",
    categoria: "Infraestrutura",
    fabricante: "Lenovo",
    titulo: "Datasheet: Servidores ThinkSystem SR650 V3",
    descricao:
      "Especificações técnicas, configurações disponíveis e casos de uso recomendados.",
    data: "22 Abr 2026",
    imagemBg: "#1A1209",
    autor: "Equipe Infodive",
    tempoLeitura: "4 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "O Lenovo ThinkSystem SR650 V3 é um servidor rack 2U de duplo socket projetado para o coração do datacenter corporativo: virtualização, bancos de dados, cargas de IA e ambientes de uso geral que exigem desempenho e densidade.",
      },
      {
        tipo: "subtitulo",
        texto: "Especificações principais",
      },
      {
        tipo: "lista",
        itens: [
          "Processadores Intel Xeon Scalable de 5ª geração, até 64 núcleos por socket.",
          "Até 8 TB de memória DDR5 em 32 slots, com suporte a ECC.",
          "Até 20 baias NVMe/SAS/SATA para flexibilidade de armazenamento.",
          "Slots PCIe Gen5 para aceleradores GPU e adaptadores de alta velocidade.",
          "Fontes redundantes Titanium e refrigeração otimizada para eficiência energética.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Casos de uso recomendados",
      },
      {
        tipo: "paragrafo",
        texto:
          "O SR650 V3 é a base ideal para clusters de virtualização VMware ou Proxmox, infraestrutura hiperconvergente, bancos de dados transacionais e inferência de IA. Sua densidade de memória e expansão NVMe atendem desde consolidação até workloads de alta performance.",
      },
      {
        tipo: "citacao",
        texto:
          "Dimensionar corretamente o servidor na origem evita gargalos caros — e retrabalho — no futuro.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Infodive ajuda a configurar o SR650 V3 sob medida para o seu workload, com homologação de fábrica e suporte local. Solicite a configuração ideal para o seu projeto.",
      },
    ],
  },
  {
    slug: "ransomware-rede-hospitalar-acronis-cyber-protect",
    tipo: "case",
    categoria: "Segurança",
    fabricante: "Acronis",
    titulo:
      "Proteção contra ransomware em rede hospitalar com Acronis Cyber Protect",
    descricao:
      "Como implementamos backup imutável e detecção de comportamento em 72 horas.",
    data: "15 Abr 2026",
    imagemBg: "#140D1A",
    autor: "Equipe Infodive",
    tempoLeitura: "6 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "Em ambientes de saúde, indisponibilidade não é só prejuízo financeiro — é risco à vida. Uma rede hospitalar nos acionou após um incidente de ransomware no setor, buscando blindar sua operação rapidamente. Em 72 horas, colocamos em pé uma camada de proteção e recuperação confiável.",
      },
      {
        tipo: "subtitulo",
        texto: "O contexto: alto risco, baixa tolerância a downtime",
      },
      {
        tipo: "paragrafo",
        texto:
          "Sistemas de prontuário eletrônico, PACS de imagens e integrações com laboratório precisam estar disponíveis 24/7. Qualquer parada afeta atendimento. Era preciso uma solução que unisse backup, antimalware e detecção comportamental sem multiplicar consoles.",
      },
      {
        tipo: "subtitulo",
        texto: "A implementação em 72 horas",
      },
      {
        tipo: "lista",
        itens: [
          "Backup imutável local e em nuvem, protegido contra exclusão.",
          "Detecção comportamental de ransomware com reversão automática de arquivos.",
          "Política de proteção unificada para servidores, endpoints e cargas virtualizadas.",
          "Testes de restauração validando o RTO dos sistemas críticos.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "Ransomware não avisa antes de atacar. Quando ele chega, o que importa é a velocidade e a confiabilidade da recuperação.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Com o Acronis Cyber Protect, a rede hospitalar passou a contar com proteção integrada e recuperação testada. O time de TI ganhou visibilidade central e a direção, tranquilidade para focar no que importa: o paciente.",
      },
    ],
  },
  {
    slug: "finops-na-pratica-instana-turbonomic",
    tipo: "whitepaper",
    categoria: "Observability",
    fabricante: "IBM",
    titulo:
      "FinOps na prática: controlando custos de cloud com Instana e Turbonomic",
    descricao:
      "Framework e ferramentas para implementar governança financeira em ambientes multi-cloud.",
    data: "08 Abr 2026",
    imagemBg: "#0D1A0D",
    autor: "Equipe Infodive",
    tempoLeitura: "8 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "FinOps não é uma ferramenta — é uma disciplina que une engenharia, finanças e negócio em torno do valor entregue por cada real gasto em nuvem. Mas a disciplina precisa de instrumentação. É aí que entram observabilidade e automação de recursos.",
      },
      {
        tipo: "subtitulo",
        texto: "Observabilidade como base da decisão",
      },
      {
        tipo: "paragrafo",
        texto:
          "O IBM Instana entrega visibilidade de ponta a ponta da performance das aplicações, correlacionando consumo de recursos com experiência do usuário. Sem essa visão, qualquer corte de custo é um chute que pode degradar o serviço.",
      },
      {
        tipo: "subtitulo",
        texto: "Automação de recursos com Turbonomic",
      },
      {
        tipo: "paragrafo",
        texto:
          "O Turbonomic vai além de recomendar: ele equilibra continuamente alocação de CPU, memória e storage para garantir performance ao menor custo possível, aplicando ações de forma automatizada e segura conforme as políticas definidas.",
      },
      {
        tipo: "lista",
        itens: [
          "Inform: tornar o custo visível e atribuível por time e aplicação.",
          "Optimize: rightsizing contínuo e eliminação de desperdício.",
          "Operate: governança recorrente com metas e accountability.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "Governança financeira de nuvem não nasce de planilha — nasce de dados em tempo real e automação confiável.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Infodive implementa o framework FinOps combinando Instana e Turbonomic, estabelecendo o ciclo de inform, optimize e operate adaptado à realidade multi-cloud de cada cliente.",
      },
    ],
  },
  {
    slug: "ia-generativa-corporativo-por-onde-comecar",
    tipo: "artigo",
    categoria: "IA",
    fabricante: "Watson",
    titulo: "IA generativa no ambiente corporativo: por onde começar?",
    descricao:
      "Um guia prático para gestores de TI avaliando a adoção de IA nas operações da empresa.",
    data: "01 Abr 2026",
    imagemBg: "#0D1221",
    autor: "Equipe Infodive",
    tempoLeitura: "7 min de leitura",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "A pergunta deixou de ser 'se' e passou a ser 'como' adotar IA generativa na empresa. O risco não está em começar tarde, mas em começar sem método — investindo em pilotos vistosos que nunca chegam à produção e não geram valor mensurável.",
      },
      {
        tipo: "subtitulo",
        texto: "Comece pelo problema, não pela tecnologia",
      },
      {
        tipo: "paragrafo",
        texto:
          "Os melhores casos de uso resolvem dores concretas: atendimento que consome tempo, conhecimento disperso em documentos, processos manuais repetitivos. Escolher um problema bem delimitado e com retorno claro é o que separa um piloto de um produto.",
      },
      {
        tipo: "subtitulo",
        texto: "Governança e dados desde o primeiro dia",
      },
      {
        tipo: "paragrafo",
        texto:
          "Adotar IA corporativa exige cuidado com privacidade, propriedade dos dados e rastreabilidade das respostas. Plataformas como o watsonx permitem manter o controle sobre onde os dados vivem e como os modelos são governados — requisito inegociável para setores regulados.",
      },
      {
        tipo: "lista",
        itens: [
          "Defina um caso de uso com ROI mensurável antes de escolher o modelo.",
          "Garanta qualidade e governança dos dados que alimentam a solução.",
          "Mantenha humano no loop nas decisões sensíveis.",
          "Planeje a passagem de piloto para produção desde o início.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "IA generativa no ambiente corporativo não é o futuro — é o presente. O diferencial está na execução disciplinada.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Infodive ajuda a priorizar casos de uso, desenhar a arquitetura e estabelecer a governança necessária para tirar a IA do laboratório e colocá-la para trabalhar.",
      },
    ],
  },
  {
    slug: "demo-dell-poweredge-r760-alta-disponibilidade",
    tipo: "video",
    categoria: "Infraestrutura",
    fabricante: "Dell",
    titulo: "Demo: PowerEdge R760 em workloads de alta disponibilidade",
    descricao:
      "Vídeo técnico mostrando configuração e performance em ambiente de produção simulado.",
    data: "25 Mar 2026",
    imagemBg: "#1A0D0D",
    autor: "Equipe Infodive",
    tempoLeitura: "12 min de vídeo",
    conteudo: [
      {
        tipo: "paragrafo",
        texto:
          "Neste vídeo técnico, a equipe Infodive coloca o Dell PowerEdge R760 à prova em um cenário de alta disponibilidade, demonstrando configuração, tolerância a falhas e comportamento sob carga em um ambiente de produção simulado.",
      },
      {
        tipo: "subtitulo",
        texto: "O que você vai ver na demonstração",
      },
      {
        tipo: "lista",
        itens: [
          "Configuração de cluster com failover automático.",
          "Comportamento sob carga com simulação de pico de tráfego.",
          "Testes de tolerância a falhas de fonte, disco e rede.",
          "Telemetria e gerenciamento remoto via iDRAC.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Por que o R760 para alta disponibilidade",
      },
      {
        tipo: "paragrafo",
        texto:
          "Com processadores Intel Xeon Scalable, memória DDR5 e ampla expansão NVMe, o PowerEdge R760 entrega a redundância e a performance necessárias para sustentar aplicações críticas com SLA exigente.",
      },
      {
        tipo: "citacao",
        texto:
          "Alta disponibilidade não se improvisa: ela é arquitetada, configurada e testada antes de entrar em produção.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Quer ver o R760 rodando no seu cenário? A Infodive realiza demonstrações e provas de conceito sob medida. Fale com nosso time para agendar.",
      },
    ],
  },
];

export function getArtigoBySlug(slug: string): Artigo | undefined {
  return ARTIGOS.find((artigo) => artigo.slug === slug);
}

/** Outros conteúdos para a seção "leia também" — exclui o atual. */
export function getArtigosRelacionados(slug: string, limite = 3): Artigo[] {
  return ARTIGOS.filter((artigo) => artigo.slug !== slug).slice(0, limite);
}
