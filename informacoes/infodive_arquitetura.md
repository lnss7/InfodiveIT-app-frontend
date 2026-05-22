# Infodive — Arquitetura do Site

> Versão 1.0 — Plano estrutural completo para o redesign

---

## Stack Definida

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| CMS / Admin | Payload CMS v3 |
| Banco de dados | PostgreSQL via Neon |
| Styling | Tailwind CSS + IBM Plex Sans |
| Animações | GSAP + Lenis (smooth scroll) |
| WebGL / Shaders | React Three Fiber + Three.js |
| Deploy | Vercel |
| Linguagem | TypeScript |

**Nível visual:** 1.5 — Enterprise com Presença  
Hero com shader/partículas sutil + reveals no scroll + micro-interações. Sem estética de portfólio criativo.

---

## Navegação Principal

```
Início
Soluções          → dropdown com as 9 categorias
Produtos          → catálogo completo com filtros
Fabricantes       → grid de parceiros
Serviços          → serviços profissionais
Conteúdos         → posts sociais + materiais ricos
Sobre a Infodive

[CTA fixo no header] → Fale com um especialista
```

---

## Mapa de Páginas

### Páginas Públicas

```
/                          Home
/solucoes                  Hub de Soluções
/solucoes/[slug]           Página individual de Solução (×9)
/produtos                  Catálogo de Produtos
/produtos/[slug]           Página individual de Produto
/servicos                  Página de Serviços
/conteudos                 Hub de Conteúdos
/conteudos/[slug]          Artigo / Material individual
/sobre                     Sobre a Infodive
/politica-de-privacidade   LGPD
```

### Área Administrativa

```
/admin                     Dashboard
/admin/categorias          CRUD de Categorias
/admin/produtos            CRUD de Produtos
/admin/servicos            CRUD de Serviços
/admin/conteudos           CRUD de Conteúdos
/admin/leads               Gestão de Leads
/admin/banners             Gestão de Banners
```

---

## Estrutura de Cada Página

---

### `/` — Home

**Seção 1 — Hero**
- Shader WebGL sutil no background (malha 3D ou partículas reagindo ao mouse)
- Headline institucional forte
- Subtítulo
- 2 CTAs: "Conheça nossas soluções" + "Fale com um especialista"


**Seção 2 — Fabricantes**
- Marquee/strip infinito com logos dos parceiros
- Animação suave contínua
- Hover pausa o scroll

**Seção 3 — Telas carrosel**
- Telas dos produtos passando em carrosel

**Seção 4 — Soluções**
- Grid 3×3 ou 2×5 com as categorias do portfólio
- Ícone + nome + descrição curta
- Hover com micro-animação
- CTA individual por card

**Seção 5 — Produtos em Destaque**
- Seleção manual de produtos marcados como destaque no admin
- Cards com fabricante, categoria, nome
- Link para página do produto

**Seção 6 — Cases**
- Grid com cases de principais clientes
- CTA para uma pagina especifica com todos os cases

**Seção 7 — Problemas que Resolvemos**
- Lista de desafios do mercado
- Layout editorial em duas colunas
- Cada item linkado para a solução correspondente

**Seção 8 — Últimos Conteúdos - blog**
- 3 cards dos conteúdos mais recentes
- Tipo, título, fabricante/categoria
- CTA "Ver todos os conteúdos"

**Seção 9 — Contato + formulario**
- Headline de fechamento
- Formulário de contato inline:
  - Nome, Empresa, E-mail, Telefone, Cargo
  - Área de interesse (select)
  - Mensagem
  - Consentimento LGPD
- Informações de contato ao lado: telefone, e-mail, redes sociais
- Background com contraste (dark section)

---

### `/solucoes` — Hub de Soluções

- Banner com headline da área
- Grid com todas as 9 categorias
- Cada card: ícone, nome, descrição curta, link
- Scroll reveal por coluna (GSAP)

---

### `/solucoes/[slug]` — Página de Solução Individual

Exemplos de slugs:
`/solucoes/infraestrutura`  
`/solucoes/seguranca`  
`/solucoes/protecao-de-dados`  
`/solucoes/cloud`  
`/solucoes/virtualizacao`  
`/solucoes/observability`  
`/solucoes/inteligencia-artificial`  
`/solucoes/armazenamento`  
`/solucoes/endpoints`

**Estrutura interna:**
- Banner da solução (imagem + título + descrição)
- Problemas que resolve (lista)
- Produtos relacionados (cards com link)
- Fabricantes relacionados (logos com link)
- Serviços relacionados
- Conteúdos relacionados (artigos, whitepapers)
- CTA comercial (formulário inline ou scroll para seção de contato da home)

---

### `/produtos` — Catálogo

- Campo de busca por palavra-chave
- Filtros laterais ou em barra horizontal:
  - Fabricante (multiselect)
  - Categoria/Solução (multiselect)
  - Tipo
- Grid de cards de produto
- Paginação ou scroll infinito
- Estado vazio com sugestão de contato

---

### `/produtos/[slug]` — Produto Individual

- Nome + fabricante + categoria (breadcrumb)
- Descrição curta (acima da dobra)
- Tabs internas:
  - **Visão Geral** — descrição completa + benefícios
  - **Casos de Uso** — cenários de aplicação
  - **Diferenciais** — comparativo / destaques
  - **Materiais** — PDFs, datasheets, whitepapers para download
- Fabricante relacionado (card lateral ou seção)
- Serviços relacionados
- Formulário de interesse / captura de lead
- Produtos relacionados (sugestões)

---

### `/fabricantes` — Grid de Fabricantes

- Intro com headline
- Grid de logos com nome
- Hover: nome + breve descrição
- Clique leva para página do fabricante
- Filtro por categoria (opcional)

---

### `/fabricantes/[slug]` — Fabricante Individual

Exemplos:
`/fabricantes/ibm`  
`/fabricantes/lenovo`  
`/fabricantes/dell`  
`/fabricantes/veeam`  
`/fabricantes/acronis`

**Estrutura interna:**
- Logo em destaque + descrição institucional
- Link para site oficial
- Soluções relacionadas (quais categorias este fabricante cobre)
- Produtos deste fabricante (grid)
- Serviços relacionados
- CTA comercial

---

### `/servicos` — Serviços Profissionais

- Banner da área
- Lista de serviços com ícone + nome + descrição:
  - Consultoria
  - Assessment
  - Implantação
  - Migração
  - Sustentação
  - Operação Assistida
  - Monitoramento
  - Projetos
  - Modernização de Ambientes
- Metodologia de trabalho (timeline ou etapas)
- Benefícios
- CTA final

---

### `/conteudos` — Hub de Conteúdos

**Abas de navegação interna:**
- **Todos** — feed unificado
- **Instagram** — posts puxados via Instagram Basic Display API
- **LinkedIn** — posts puxados via LinkedIn API
- **Materiais** — whitepapers, datasheets, PDFs, cases, infográficos

**Feed social (Instagram + LinkedIn):**
- Cards no estilo do post original (imagem/vídeo + legenda resumida)
- Badge da rede social no card
- Clique abre o post na rede original (nova aba)
- Atualização automática via revalidação periódica (Next.js ISR)

**Materiais ricos:**
- Grid de cards com tipo, título, fabricante, categoria
- Botão de download (PDF) ou visualização
- Filtro por tipo: Whitepaper / Datasheet / Case / Infográfico / Vídeo
- Filtro por fabricante e categoria

> **Integrações necessárias:**
> - Instagram Basic Display API (token de longa duração, renovação a cada 60 dias)
> - LinkedIn API (OAuth 2.0 — posts de página empresarial)
> - Ambas via variáveis de ambiente no Vercel

---

### `/conteudos/[slug]` — Conteúdo Individual

- Título + tipo + fabricante + data
- Conteúdo completo (artigo) ou botão de download (PDF/whitepaper)
- Conteúdos relacionados
- CTA lateral: "Fale com um especialista sobre este tema"

---

### `/sobre` — Sobre a Infodive

- Headline institucional
- História desde 2003
- Missão / Visão / Valores
- Números (métricas de credibilidade)
- Equipe (opcional)
- Parceiros / Certificações
- CTA de contato (scroll para seção de contato da home ou formulário inline)

---

## Coleções do CMS (Payload v3)

```
categorias        → as 9 áreas do portfólio
fabricantes       → parceiros/fabricantes
produtos          → catálogo completo
servicos          → serviços profissionais
conteudos         → artigos, PDFs, materiais
leads             → capturas de formulário
banners           → hero e banners por seção
```

### Relações entre coleções

```
produto         → pertence a 1 categoria
produto         → pertence a 1 fabricante
produto         → pode ter N serviços relacionados
produto         → pode ter N conteúdos relacionados

fabricante      → cobre N categorias
fabricante      → tem N produtos

categoria       → tem N produtos
categoria       → tem N fabricantes
categoria       → tem N serviços

conteudo        → pode estar ligado a categoria, fabricante ou produto

lead            → captura produto de interesse + página de origem
```

---

## Fluxo do Usuário (Principal)

```
Home
 └─ Clica em Solução (ex: Segurança)
     └─ /solucoes/seguranca
         └─ Vê produtos relacionados → clica em IBM Guardium
             └─ /produtos/ibm-guardium
                 └─ Preenche formulário de interesse
                     └─ Lead entra no /admin/leads
```

---

## Formulários e LGPD

Todos os formulários capturam:
- `nome`, `empresa`, `email`, `telefone`, `cargo`
- `produto_interesse` (produto ou área)
- `pagina_origem` (URL da página onde o form foi preenchido)
- `consentimento_lgpd` (boolean obrigatório)
- `data_criacao` (timestamp automático)

---

## SEO — Estrutura de URLs

| Página | URL |
|---|---|
| Home | `/` |
| Hub de Soluções | `/solucoes` |
| Solução: Infraestrutura | `/solucoes/infraestrutura` |
| Catálogo | `/produtos` |
| Produto individual | `/produtos/ibm-guardium` |
| Fabricantes | `/fabricantes` |
| Fabricante individual | `/fabricantes/ibm` |
| Serviços | `/servicos` |
| Conteúdos | `/conteudos` |
| Artigo individual | `/conteudos/como-proteger-dados-com-veeam` |
| Sobre | `/sobre` |

Todas as páginas dinâmicas (`[slug]`) geram metadados via `generateMetadata()` do Next.js com dados vindos do Payload.

---

## Fases de Entrega

### Fase 1 — MVP (mês 1)
- [ ] Home completa com shader/animações + seção de contato
- [ ] Página de Soluções + 9 páginas individuais
- [ ] Catálogo de Produtos + página individual
- [ ] Grid de Fabricantes + página individual
- [ ] Hub de Conteúdos com integração Instagram + LinkedIn
- [ ] Admin: categorias, fabricantes, produtos, leads
- [ ] Deploy em Vercel + domínio

### Fase 2 — Crescimento
- [ ] Página de Serviços completa
- [ ] Hub de Conteúdos + materiais ricos
- [ ] Cases de sucesso
- [ ] Landing pages por campanha
- [ ] Integração com CRM

### Fase 3 — Escala
- [ ] Busca inteligente no catálogo
- [ ] Recomendações dinâmicas de produto
- [ ] Chatbot de qualificação
- [ ] Automação de marketing
- [ ] Analytics avançado
