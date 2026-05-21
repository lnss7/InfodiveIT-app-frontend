# Infodive — Estrutura Visual do Site

> Resumo rápido: cada página, suas seções e o que aparece em cada lugar.
> Para detalhes técnicos completos, ver `.claude/skills/infodive-context/references/arquitetura.md`.

---

## 🧭 Header (presente em todas as páginas)

```
┌──────────────────────────────────────────────────────────────────┐
│  [LOGO]  Início  Soluções▾  Produtos  Fabricantes  Serviços      │
│                  Conteúdos  Sobre              [Fale com especi.] │
└──────────────────────────────────────────────────────────────────┘
```

- Logo à esquerda
- Navegação centralizada
- CTA "Fale com um especialista" à direita (fixo, sempre visível)
- Dropdown em "Soluções" lista as 9 categorias

---

## 🦶 Footer (presente em todas as páginas)

```
┌──────────────────────────────────────────────────────────────────┐
│  [LOGO + tagline]                                                │
│                                                                   │
│  Soluções          Empresa         Contato                       │
│  Infraestrutura    Sobre           contato@infodive.com.br       │
│  Segurança         Conteúdos       (51) 3330-0444                │
│  Cloud             LGPD            [LinkedIn] [Instagram] [FB]   │
│  ...                                                              │
│                                                                   │
│  © 2026 Infodive. Todos os direitos reservados.                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🏠 Home (`/`)

### 1. Hero
- Background com shader WebGL sutil (partículas/malha reagindo ao mouse)
- Headline forte (ex: "Tecnologia corporativa para empresas que precisam evoluir com segurança")
- Subtítulo curto
- 2 botões: "Conheça nossas soluções" + "Fale com um especialista"

### 2. Números
- 3 a 4 métricas de credibilidade (Desde 2003, 100% projetos entregues, N clientes)
- Contagem animada ao entrar no viewport (GSAP)

### 3. Soluções
- Grid 3×3 com as 9 categorias do portfólio
- Cada card: ícone + nome + descrição curta
- Hover com micro-animação

### 4. Produtos em Destaque
- 4 a 6 produtos marcados como destaque no admin
- Cards com fabricante + nome + descrição curta + categoria

### 5. Fabricantes
- Marquee/strip infinito com logos dos parceiros
- Hover pausa o scroll

### 6. Problemas que Resolvemos
- Layout editorial em 2 colunas
- Lista de desafios → cada item linka para a solução correspondente

### 7. Serviços (resumo)
- Grid horizontal com 6 a 8 serviços
- Ícone + nome + descrição curta

### 8. Últimos Conteúdos
- 3 cards dos materiais/posts mais recentes
- CTA "Ver todos os conteúdos"

### 9. Contato (substitui o /contato separado)
- Background dark
- Formulário inline à esquerda (Nome, Empresa, E-mail, Telefone, Cargo, Mensagem, LGPD)
- Informações de contato à direita (telefone, e-mail, endereço, redes sociais)

---

## 🧩 Soluções (`/solucoes`)

- Banner com headline
- Grid com as 9 categorias
- Cada card linka para `/solucoes/[slug]`

---

## 🧩 Solução Individual (`/solucoes/infraestrutura`, etc.)

### Seções
1. **Banner** — imagem + título da categoria + descrição
2. **Problemas que resolve** — lista
3. **Produtos relacionados** — grid com cards
4. **Fabricantes nesta área** — logos
5. **Serviços relacionados** — cards
6. **Conteúdos relacionados** — artigos, whitepapers
7. **CTA comercial** — botão para scroll na seção de contato da home

---

## 📦 Catálogo (`/produtos`)

```
┌─────────────────────────────────────────────────────────────────┐
│  Catálogo de Produtos                                           │
│  [🔍 Buscar...                                              ]   │
├─────────────────────────────────────────────────────────────────┤
│  Filtros:  [Fabricante▾]  [Categoria▾]  [Tipo▾]   [Limpar]      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Produto  │  │ Produto  │  │ Produto  │  │ Produto  │         │
│  │  Card    │  │  Card    │  │  Card    │  │  Card    │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
│         (paginação ou scroll infinito)                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Produto Individual (`/produtos/[slug]`)

### Topo
- Breadcrumb: Categoria > Fabricante > Produto
- Nome em destaque
- Descrição curta (acima da dobra)

### Tabs internas
- **Visão Geral** — descrição completa + benefícios
- **Casos de Uso** — cenários de aplicação
- **Diferenciais** — destaques e comparativos
- **Materiais** — PDFs, datasheets para download

### Sidebar / Final
- Card do fabricante com link
- Serviços relacionados
- Formulário de interesse (lead capture)
- Produtos relacionados (sugestões)

---

## 🏢 Fabricantes (`/fabricantes`)

- Intro com headline
- Grid de logos com nome
- Filtro opcional por categoria
- Cada logo linka para `/fabricantes/[slug]`

---

## 🏢 Fabricante Individual (`/fabricantes/ibm`, etc.)

1. **Logo em destaque** + descrição institucional
2. **Link para o site oficial**
3. **Soluções relacionadas** — categorias em que o fabricante atua
4. **Produtos** — grid de produtos deste fabricante
5. **Serviços relacionados**
6. **CTA comercial**

---

## 🛠️ Serviços (`/servicos`)

1. **Banner**
2. **Lista de serviços** — Consultoria, Assessment, Implantação, Migração, Sustentação, etc.
3. **Metodologia** — timeline ou etapas do processo
4. **Benefícios**
5. **CTA final**

---

## 📰 Conteúdos (`/conteudos`)

### Abas internas
```
┌─────────────────────────────────────────────────────────────────┐
│  [ Todos ]  [ Instagram ]  [ LinkedIn ]  [ Materiais ]          │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│  │ Post IG  │  │  Post LI │  │Whitepaper│                       │
│  │ [imagem] │  │ [imagem] │  │  [PDF]   │                       │
│  └──────────┘  └──────────┘  └──────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

- **Todos**: feed unificado
- **Instagram**: posts da API (clique abre na rede social)
- **LinkedIn**: posts da API (clique abre na rede social)
- **Materiais**: whitepapers, datasheets, cases, infográficos, vídeos para download

---

## 📰 Conteúdo Individual (`/conteudos/[slug]`)

- Título + tipo + fabricante + data
- Corpo do artigo OU botão de download
- Conteúdos relacionados
- CTA lateral: "Fale com um especialista sobre este tema"

---

## ℹ️ Sobre (`/sobre`)

1. Headline institucional
2. História desde 2003
3. Missão / Visão / Valores
4. Números de credibilidade
5. Equipe (opcional)
6. Parceiros / Certificações
7. CTA para seção de contato da home

---

## 🔧 Admin (`/admin`)

```
┌─────────────────────────────────────────────────────────────────┐
│  Infodive Admin                                    [usuario ▾]  │
├──────────────────┬──────────────────────────────────────────────┤
│                  │                                              │
│  Portfólio       │  Dashboard                                   │
│  ├ Categorias    │  ┌────────┐ ┌────────┐ ┌────────┐            │
│  ├ Fabricantes   │  │ Leads  │ │Produtos│ │Conteúd.│            │
│  ├ Produtos      │  │   24   │ │   87   │ │   42   │            │
│  └ Serviços      │  └────────┘ └────────┘ └────────┘            │
│                  │                                              │
│  Conteúdo        │                                              │
│  ├ Conteúdos     │                                              │
│  └ Banners       │                                              │
│                  │                                              │
│  Comercial       │                                              │
│  └ Leads         │                                              │
│                  │                                              │
│  Sistema         │                                              │
│  ├ Media         │                                              │
│  ├ Users         │                                              │
│  └ Config.       │                                              │
└──────────────────┴──────────────────────────────────────────────┘
```

### Grupos de menu
- **Portfólio** — Categorias, Fabricantes, Produtos, Serviços
- **Conteúdo** — Conteúdos, Banners
- **Comercial** — Leads (apenas armazenamento — tratamento comercial em sistema externo)
- **Sistema** — Media, Users, Configurações

---

## 🎨 Padrões Visuais

### Espaçamento entre seções
- Mobile: `py-20` (5rem)
- Desktop: `py-28` (7rem)

### Container
- Largura máxima: `1280px`
- Padding lateral: `1.5rem` mobile, `2.5rem` desktop

### Hierarquia tipográfica
```
h1 → 3xl mobile / 6xl desktop  →  títulos de hero
h2 → 3xl mobile / 4xl desktop  →  títulos de seção
h3 → 2xl mobile / 3xl desktop  →  títulos de card
h4 → xl  mobile / 2xl desktop  →  subtítulos
body → base / lg               →  parágrafos
```

### Cores de seção
- Padrão: `bg-white`
- Alternada: `bg-ink-50` (cinza claro)
- Dark: `bg-ink-950` (preto, contraste forte)
