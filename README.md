# Infodive — Portal de Soluções de TI

Site institucional e catálogo comercial da Infodive, construído com Next.js 14 e Payload CMS v3.

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Payload CMS v3** rodando dentro do Next.js
- **PostgreSQL** via Neon
- **Tailwind CSS** + IBM Plex Sans
- **GSAP + Lenis** para animações
- **React Three Fiber + Three.js** para shaders WebGL
- **Vercel Blob** para armazenamento de imagens/PDFs
- **Resend** para envio de e-mails
- Deploy na **Vercel**

---

## Pré-requisitos

- Node.js 20+
- npm 10+
- Conta no [Neon](https://neon.tech) (banco PostgreSQL gratuito)
- Conta na [Vercel](https://vercel.com) (deploy + Blob storage)
- Conta no [Resend](https://resend.com) (envio de e-mails)

---

## Setup Local

### 1. Clonar e instalar dependências

```bash
git clone <repo-url>
cd infodive-site

# Devido a um conflito de versões entre o Payload CMS v3 e o Next.js 14, 
# é necessário utilizar a flag --legacy-peer-deps durante a instalação:
npm install --legacy-peer-deps
```

### 2. Criar o banco de dados no Neon

1. Acesse [console.neon.tech](https://console.neon.tech) e crie um projeto
2. Copie a connection string (formato `postgresql://user:password@host/database?sslmode=require`)

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` e preencha:

```env
PAYLOAD_SECRET=                # gere com: openssl rand -hex 32
DATABASE_URI=                  # cole a connection string do Neon
BLOB_READ_WRITE_TOKEN=         # configurar depois do deploy na Vercel
RESEND_API_KEY=                # pegue em resend.com/api-keys
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Rodar o projeto

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Na primeira vez que acessar o admin, será solicitado criar o usuário inicial.

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Roda o linter |
| `npm run generate:types` | Gera tipos TypeScript do Payload |
| `npm run generate:importmap` | Regenera o import map do Payload |

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── (frontend)/         # Páginas públicas do site
│   │   ├── layout.tsx      # Layout com fonte + globals.css
│   │   └── page.tsx        # Home
│   └── (payload)/          # Admin e API do Payload
│       ├── admin/          # Rota do painel administrativo
│       ├── api/            # REST + GraphQL endpoints
│       └── layout.tsx
├── collections/            # Schemas das tabelas (Payload)
│   ├── Users.ts
│   ├── Media.ts
│   ├── Categorias.ts
│   ├── Fabricantes.ts
│   ├── Produtos.ts
│   ├── Servicos.ts
│   ├── Conteudos.ts
│   ├── Leads.ts
│   └── Banners.ts
├── globals/                # Configurações globais (Payload)
│   └── Configuracoes.ts
├── components/             # Componentes React reutilizáveis
├── lib/                    # Utilitários
│   └── utils.ts            # cn() para classes Tailwind
├── styles/
│   └── globals.css         # Design tokens + utilities
└── payload.config.ts       # Configuração central do Payload

.claude/
└── skills/
    └── infodive-context/   # Skill auto-invocada com contexto do projeto

CLAUDE.md                   # Carregado automaticamente pelo Claude Code
```

---

## Design System

Tokens definidos em `src/styles/globals.css` e `tailwind.config.ts`.

### Cores principais

| Token Tailwind | Hex | Uso |
|---|---|---|
| `brand` | `#0E66FF` | CTA primário, links |
| `brand-deep` | `#001DFF` | Hover do brand |
| `teal` | `#46BEA3` | Badges, destaques |
| `indigo` | `#5754FF` | Accent secundário |
| `ink-950` | `#141413` | Headings, dark sections |
| `ink-900` | `#1A1919` | Body text |
| `ink-500` | `#7B7B7B` | Texto secundário |
| `ink-200` | `#D8D8D8` | Bordas |
| `ink-50` | `#FAFAFA` | Background alternado |

### Classes prontas

```html
<button class="btn-primary">CTA principal</button>
<button class="btn-secondary">Secundário</button>
<button class="btn-dark">Dark section</button>

<div class="card">Card padrão</div>
<div class="card-hover">Card com hover</div>

<input class="input" />
<label class="label">Nome</label>

<span class="badge-brand">Em destaque</span>
<span class="badge-teal">Novo</span>

<section class="section">Seção padrão</section>
<section class="section-dark">Seção dark</section>
<section class="section-tint">Seção cinza claro</section>
```

---

## Banco de Dados

Gerenciado automaticamente pelo Payload v3 (Drizzle ORM por baixo). Todas as tabelas são criadas a partir das collections em `src/collections/`.

**Tabelas principais:**

- `categorias` — 9 áreas do portfólio
- `fabricantes` — parceiros (IBM, Lenovo, Dell, etc.)
- `produtos` — catálogo completo
- `servicos` — serviços profissionais
- `conteudos` — materiais + posts do Instagram/LinkedIn
- `leads` — capturas de formulário (apenas armazenamento, tratamento em sistema externo)
- `banners` — banners configuráveis
- `media` — uploads
- `users` — admin do CMS

Documentação completa em `.claude/skills/infodive-context/references/banco.md`.

---

## Deploy

### Vercel (recomendado)

1. Crie um projeto na Vercel conectado ao repositório GitHub
2. Adicione as variáveis de ambiente (mesmas do `.env.local`)
3. Configure o Vercel Blob (Storage → Blob → Create)
4. Conecte o domínio (`infodive.com.br`)
5. Cada push na branch `main` faz deploy automático

### Banco

O Neon free tier é suficiente para começar. Para produção considerar Neon Pro.

---

## Skill `infodive-context`

A pasta `.claude/skills/infodive-context/` contém uma skill com todo o contexto do projeto (stack, tokens, arquitetura, regras).

**No Claude Code (este projeto):** auto-descoberta — qualquer prompt sobre o site da Infodive carrega a skill automaticamente. O arquivo `CLAUDE.md` na raiz também é carregado em toda conversa.

**No Claude.ai (web):** empacote a pasta em `.zip` e faça upload como skill na interface.

---

## Próximos Passos

- [ ] Construir páginas do frontend (a partir do protótipo aprovado)
- [ ] Cadastrar conteúdo real no admin (categorias, fabricantes, produtos)
- [ ] Configurar integração Instagram Graph API
- [ ] Iniciar processo de aprovação LinkedIn (`r_organization_social`)
- [ ] Configurar Resend e templates de e-mail de leads
- [ ] Implementar shader WebGL do hero
- [ ] Conectar domínio em produção

---

## Documentação Adicional

- `CLAUDE.md` — Contexto carregado automaticamente pelo Claude Code
- `estrutura.md` — Estrutura visual e funcional de cada página do site
- `.claude/skills/infodive-context/SKILL.md` — Contexto completo (stack, tokens, regras)
- `.claude/skills/infodive-context/references/arquitetura.md` — Detalhamento completo de rotas e seções
- `.claude/skills/infodive-context/references/banco.md` — Schema completo do banco de dados

---

## Suporte

- Payload v3: [payloadcms.com/docs](https://payloadcms.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Tailwind: [tailwindcss.com/docs](https://tailwindcss.com/docs)
