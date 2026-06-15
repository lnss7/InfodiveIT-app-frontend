# Prompt — Implementar Página de Blog (Infodive)

> Para colar no Claude Code. Leia a skill `infodive-context` antes de qualquer coisa.
> Página com duas seções de conteúdo separadas: artigos/materiais e posts de redes sociais.

---

## Contexto

Última página do site. Dividida em dois blocos distintos:

1. **Artigos e materiais** — conteúdo próprio da Infodive (whitepapers, cases, datasheets, vídeos)
2. **Redes sociais** — feed mockado do Instagram e LinkedIn (no futuro integrado via API, por agora estático)

Os dois blocos têm layouts completamente diferentes — não use o mesmo card pras duas seções.

---

## Componentes do projeto a reutilizar

Não crie nada novo:

- `Reveal` (`src/components/animations/reveal.tsx`) — blur + deslocamento na viewport
- `TextEffect` (`src/components/animations/text-effect.tsx`) — anima texto na entrada
- `InteractiveGridPattern` (`src/components/animations/interactive-grid-pattern.tsx`) — grid reativo ao mouse
- `Footer` (`src/layout/footer.tsx`)
- `cn()` (`src/lib/utils.ts`)

**Infra de scroll:** Lenis em `window.lenis`. GSAP + ScrollTrigger sincronizados. Efeitos pesados desktop-only, fallback mobile estático.

---

## Design tokens

- Fundo dark: `#050507`
- `brand` #0E66FF, `ink-950` #141413, `ink-900` #1A1919
- `ink-500` #7B7B7B, `ink-200` #D8D8D8, `ink-50` #FAFAFA, `teal` #46BEA3
- Classes: `.container-default`, `.section`, `.section-dark`, `.eyebrow`, `.btn-primary`, `.btn-secondary`
- IBM Plex Sans. Bordas 1px solid #D8D8D8. Sem glow/neon.

---

## LAYOUT — Página `/blog`

Composição: `src/app/blog/page.tsx` — Metadata + 4 seções + `<Footer />`.
Seções em `src/sections/blog/`.

---

### Seção 1 — `hero.tsx`

Simples e direta.

- Fundo dark `#050507` com `InteractiveGridPattern`
- Eyebrow: "CONTEÚDOS"
- Título via `TextEffect` (preset blur):
  "Conhecimento técnico para decisões melhores."
- Subtítulo: "Artigos, materiais técnicos e o que a Infodive compartilha nas redes."
- Sem botões

---

### Seção 2 — `artigos.tsx` ⭐

Fundo branco. Padding generoso.

#### Header da seção (space-between)

```
[Eyebrow: "ARTIGOS & MATERIAIS"]
[Título: "Conteúdo técnico produzido pela equipe Infodive."]
```

#### Filtros

Linha horizontal de pills:

```
[ Todos ]  [ Artigos ]  [ Whitepapers ]  [ Cases ]  [ Datasheets ]  [ Vídeos ]
```

- Pill ativo: fundo `brand` #0E66FF, texto branco
- Pill inativo: transparente, borda `ink-200`, texto `ink-500`
- Hover: borda `brand`
- `useState` client component — filtra os mocks pelo campo `tipo`

#### Grid de cards

3 colunas desktop, 2 tablet, 1 mobile. Gap 24px.
Cada card com `Reveal` escalonado (delay por índice).

**Anatomia do card:**

```
┌────────────────────────────────┐
│  [THUMBNAIL — 200px altura]    │  ← bg escuro temático, border-radius top
│  [BADGE TIPO] (top-left abs.)  │
├────────────────────────────────┤
│  Categoria • Fabricante        │  ← 11px, ink-500
│  [TÍTULO]                      │  ← 17px weight 600, ink-950, line-height 1.4
│  [DESCRIÇÃO — 2 linhas max]    │  ← 13px, ink-500, line-height 1.6
│  ─────────────────────────── │
│  [DATA]          [Ler mais →]  │  ← space-between, 12px
└────────────────────────────────┘
```

- Border: `1px solid #D8D8D8`, border-radius 8px
- Hover: `border-color: #0E66FF`, `translateY(-2px)` suave
- Sem sombra

**Cores dos badges:**

| Tipo | Background | Texto |
|---|---|---|
| Artigo | `#E4EAFF` | `#0E66FF` |
| Whitepaper | `#F0F0F0` | `#7B7B7B` |
| Case | `#E8F8F4` | `#46BEA3` |
| Datasheet | `#FFF7E6` | `#BA7517` |
| Vídeo | `#FFE8E8` | `#C0001A` |

**9 mocks:**

```ts
const artigos = [
  {
    tipo: 'artigo',
    tag: 'Segurança • IBM',
    titulo: 'Como o IBM Guardium protege dados sensíveis em ambientes híbridos',
    descricao: 'Entenda como implementar conformidade LGPD sem impactar a performance do ambiente.',
    data: '18 Mai 2026',
    imagemBg: '#0D1221',
  },
  {
    tipo: 'whitepaper',
    tag: 'Proteção de Dados • Veeam',
    titulo: 'Guia completo de recuperação de desastres com Veeam Data Platform',
    descricao: 'Estratégias práticas para atingir RTO abaixo de 4 horas em ambientes críticos.',
    data: '10 Mai 2026',
    imagemBg: '#0D1A0D',
  },
  {
    tipo: 'case',
    tag: 'Cloud • Azure',
    titulo: 'Como reduzimos 40% dos custos de cloud de uma fintech em 3 meses',
    descricao: 'Da auditoria ao FinOps: o processo que a Infodive usou para recuperar controle do budget.',
    data: '02 Mai 2026',
    imagemBg: '#140D1A',
  },
  {
    tipo: 'artigo',
    tag: 'Virtualização • VMware',
    titulo: 'VMware vs Proxmox: qual escolher para modernizar seu datacenter?',
    descricao: 'Análise técnica e comercial das duas plataformas mais usadas em virtualização enterprise.',
    data: '28 Abr 2026',
    imagemBg: '#0D1221',
  },
  {
    tipo: 'datasheet',
    tag: 'Infraestrutura • Lenovo',
    titulo: 'Datasheet: Servidores ThinkSystem SR650 V3',
    descricao: 'Especificações técnicas, configurações disponíveis e casos de uso recomendados.',
    data: '22 Abr 2026',
    imagemBg: '#1A1209',
  },
  {
    tipo: 'case',
    tag: 'Segurança • Acronis',
    titulo: 'Proteção contra ransomware em rede hospitalar com Acronis Cyber Protect',
    descricao: 'Como implementamos backup imutável e detecção de comportamento em 72 horas.',
    data: '15 Abr 2026',
    imagemBg: '#140D1A',
  },
  {
    tipo: 'whitepaper',
    tag: 'Observability • IBM',
    titulo: 'FinOps na prática: controlando custos de cloud com Instana e Turbonomic',
    descricao: 'Framework e ferramentas para implementar governança financeira em ambientes multi-cloud.',
    data: '08 Abr 2026',
    imagemBg: '#0D1A0D',
  },
  {
    tipo: 'artigo',
    tag: 'IA • Watson',
    titulo: 'IA generativa no ambiente corporativo: por onde começar?',
    descricao: 'Um guia prático para gestores de TI avaliando a adoção de IA nas operações da empresa.',
    data: '01 Abr 2026',
    imagemBg: '#0D1221',
  },
  {
    tipo: 'video',
    tag: 'Infraestrutura • Dell',
    titulo: 'Demo: PowerEdge R760 em workloads de alta disponibilidade',
    descricao: 'Vídeo técnico mostrando configuração e performance em ambiente de produção simulado.',
    data: '25 Mar 2026',
    imagemBg: '#1A0D0D',
  },
]
```

Botão "Carregar mais conteúdos" centralizado abaixo do grid — `.btn-secondary`, apenas visual por ora.

---

### Seção 3 — `social.tsx` ⭐⭐ (CAPRICHA NO LAYOUT)

Fundo `#050507` (dark). Separação visual clara da seção de artigos.

Esta seção simula o feed social da Infodive. No futuro virá da API — por ora são mocks.
**O layout deve parecer com um feed real de rede social, não um grid genérico de cards.**

#### Header

```
Eyebrow: "NAS REDES SOCIAIS"
Título: "Acompanhe a Infodive no Instagram e LinkedIn."
Subtítulo: "Conteúdo técnico, novidades e bastidores da equipe."
```

À direita do header: dois botões outline brancos lado a lado:
- `[Instagram →]` linkando para o perfil
- `[LinkedIn →]` linkando para a página

#### Tabs de rede

Abaixo do header, duas tabs:

```
[ Instagram ]  [ LinkedIn ]
```

- Tab ativa: underline `brand` #0E66FF + texto branco
- Tab inativa: texto `ink-500`
- `useState` — alterna qual feed exibir

#### Feed Instagram (quando aba Instagram ativa)

Layout em **mosaico/masonry de 3 colunas** — altura variável por post.
Simula um feed do Instagram de verdade.

**Anatomia do card Instagram:**

```
┌─────────────────────────────────┐
│                                 │
│   [IMAGEM — altura variável]    │  ← bg escuro temático, aspect-ratio variado
│                                 │     ex: alguns quadrados, alguns portrait
│                                 │
├─────────────────────────────────┤
│  [🤍 84]  [💬 12]  [↗ Share]   │  ← row de interações, ícones Lucide
│  ─────────────────────────────  │
│  infodive_it  [texto da legenda]│  ← username bold + legenda truncada (2 linhas)
│  Ver mais...                    │  ← link de expandir, 12px brand
│  ─────────────────────────────  │
│  2 dias atrás                   │  ← timestamp, 11px ink-500
└─────────────────────────────────┘
```

- Background do card: `#0D0D0F`
- Border: `1px solid #1E1E22`
- Border-radius: 12px
- Hover: border sobe pra `#2A2A30`, leve `translateY(-2px)`
- Sem sombra pesada

**Detalhe visual importante:** no topo de cada card, antes da imagem, colocar um mini header de perfil:
```
[Avatar circular placeholder 32px]  infodive_it  [Logo Instagram 16px]
```

**6 mocks Instagram:**

```ts
const instagramPosts = [
  {
    imagemBg: '#0A0F1A',
    altura: '280px',    // altura variada pra mosaico
    likes: 142,
    comentarios: 23,
    legenda: '🔐 Segurança não é produto, é processo. Saiba como o IBM Guardium está protegendo dados críticos de empresas no Brasil. #Segurança #IBM #LGPD',
    tempo: '2 dias atrás',
  },
  {
    imagemBg: '#0A1A0A',
    altura: '220px',
    likes: 98,
    comentarios: 11,
    legenda: '☁️ Cloud sem governança é dinheiro jogado fora. Fizemos uma thread completa sobre FinOps — vale a leitura! #Cloud #FinOps #Azure',
    tempo: '4 dias atrás',
  },
  {
    imagemBg: '#1A0A1A',
    altura: '320px',
    likes: 215,
    comentarios: 34,
    legenda: '🚀 Missão cumprida: 200 VMs migradas para Proxmox em um final de semana, zero downtime. Orgulho do time! #Virtualização #Proxmox #Infodive',
    tempo: '1 semana atrás',
  },
  {
    imagemBg: '#1A100A',
    altura: '240px',
    likes: 76,
    comentarios: 8,
    legenda: '📊 Novo datasheet disponível: Lenovo ThinkSystem SR650 V3. Baixe gratuitamente no link da bio. #Infraestrutura #Lenovo #Datacenter',
    tempo: '1 semana atrás',
  },
  {
    imagemBg: '#0A1215',
    altura: '300px',
    likes: 187,
    comentarios: 29,
    legenda: '🤖 IA no ambiente corporativo: não é o futuro, é o presente. Como o Watson está sendo usado por clientes Infodive. #IA #IBM #Watson',
    tempo: '2 semanas atrás',
  },
  {
    imagemBg: '#0F0A1A',
    altura: '260px',
    likes: 63,
    comentarios: 6,
    legenda: '🛡️ Ransomware não avisa antes de atacar. Veja o case de como implementamos proteção em uma rede hospitalar em 72 horas. #Segurança #Acronis',
    tempo: '2 semanas atrás',
  },
]
```

#### Feed LinkedIn (quando aba LinkedIn ativa)

Layout diferente do Instagram — **posts mais longos, estilo feed profissional**.
2 colunas no desktop, 1 no mobile.

**Anatomia do card LinkedIn:**

```
┌─────────────────────────────────────────┐
│  [Logo Infodive 40px]  Infodive IT      │  ← header do post
│  [            ]        Integradora de   │
│                        Tecnologia B2B   │
│                        X dias atrás     │
├─────────────────────────────────────────┤
│                                         │
│  [Texto do post — até 4 linhas visíveis]│  ← 14px, #BFBFBF, line-height 1.6
│                        ...ver mais      │  ← link brand
│                                         │
├─────────────────────────────────────────┤
│  [IMAGEM — 100% largura, 200px altura] │  ← bg temático opcional
├─────────────────────────────────────────┤
│  [👍 94]  [💬 17]  [🔁 Compartilhar]   │  ← ações, ícones Lucide, ink-500
└─────────────────────────────────────────┘
```

- Background do card: `#0D0D0F`
- Border: `1px solid #1E1E22`
- Border-radius: 12px
- Hover: `border-color #2A2A30`

**4 mocks LinkedIn:**

```ts
const linkedinPosts = [
  {
    texto: 'Acabamos de concluir mais um projeto de modernização de datacenter. O cliente tinha servidores legados com mais de 8 anos operando aplicações críticas. Em 90 dias, sem nenhuma interrupção do serviço, migramos tudo para uma nova infraestrutura Lenovo ThinkSystem.\n\nO resultado: 40% de redução no consumo energético, 3x mais capacidade de processamento e SLA de 99.98%.\n\nÉ por projetos assim que acordamos todo dia. 🚀',
    temImagem: true,
    imagemBg: '#0A0F1A',
    likes: 94,
    comentarios: 17,
    tempo: '3 dias atrás',
  },
  {
    texto: 'Uma reflexão importante para gestores de TI:\n\nComprar tecnologia é a parte fácil. O que diferencia ambientes que funcionam de ambientes que travam é a execução — planejamento, implantação e sustentação feitos com método.\n\nNos últimos 20 anos vimos muitas empresas adquirirem soluções excelentes que nunca chegaram ao potencial por falta de um parceiro técnico sólido.\n\nÉ exatamente esse gap que a Infodive preenche.',
    temImagem: false,
    imagemBg: '',
    likes: 231,
    comentarios: 42,
    tempo: '1 semana atrás',
  },
  {
    texto: 'Publicamos um novo whitepaper: "Guia completo de recuperação de desastres com Veeam Data Platform".\n\nAbordamos RTO, RPO, backup imutável, e estratégias testadas em ambientes reais de clientes.\n\nDownload gratuito — link nos comentários. 👇',
    temImagem: true,
    imagemBg: '#0A1A0A',
    likes: 78,
    comentarios: 24,
    tempo: '1 semana atrás',
  },
  {
    texto: 'Estamos contratando! 🎯\n\nProcuramos Engenheiro de Infraestrutura com experiência em ambientes VMware e/ou Proxmox para atuar em projetos enterprise em Porto Alegre.\n\nSe você quer trabalhar com tecnologia de missão crítica e um time que respira TI, fala com a gente.',
    temImagem: false,
    imagemBg: '',
    likes: 156,
    comentarios: 38,
    tempo: '2 semanas atrás',
  },
]
```

#### Aviso de integração futura

Abaixo do feed, centralizado, texto sutil:
```
"Em breve este feed será atualizado automaticamente direto das redes sociais."
— 12px, ink-500, italic
```

---

### Seção 4 — `cta.tsx`

Reaproveitar a seção de CTA já existente.
Headline: "Quer receber conteúdos técnicos em primeira mão?"
Botão: "Fale com um especialista"

---

## Modelo de dados (referência)

Entidade `conteudos` já existe: `titulo`, `slug`, `tipo` (enum), `origem` (interno/instagram/linkedin), `descricao`, `conteudo`, `arquivo`, `thumbnail`, `categoria`, `fabricante`, `produto`, `publicadoEm`, `ativo`.

Os mocks já respeitam essa estrutura.

---

## Navegação

"Conteúdos" na navbar → `/blog`.

---

## Ordem de execução

1. Estrutura da página + Seção 1 (hero). Mostre.
2. Seção 2 (artigos) — grid + filtros. Mostre.
3. Seção 3 (social) — feed Instagram e LinkedIn. **Capriche aqui.** Mostre antes de continuar.
4. Seção 4 (CTA) — reaproveitar existente.

Não quebre nada. Não instale nada novo. Vá por partes.
