# Infodive — Frontend (Next.js)

Site institucional e catálogo comercial da Infodive (integrador B2B desde 2003). Este projeto contém **apenas o frontend**. O backend é um projeto Spring Boot separado em `../backend/`.

> **Contexto completo do projeto:** `.claude/skills/infodive-context/SKILL.md` (auto-invocada quando a tarefa envolve criar telas, componentes, schemas ou qualquer artefato deste projeto).

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **IBM Plex Sans** (única fonte do projeto)
- **GSAP + Lenis** (animações + smooth scroll)
- **React Three Fiber + Three.js** (shader WebGL do hero)
- **Framer Motion** (micro-interações)
- **Lucide React** (ícones)
- **Vercel** (deploy)

> Não tem Payload, banco, ORM nem nada de backend aqui. O frontend consome a API do Spring Boot via `NEXT_PUBLIC_API_URL`.

---

## Estrutura de pastas

```
frontend/
├── src/
│   ├── app/                       # App Router (Next.js)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/                    # componentes genéricos (button, etc.)
│   ├── layout/
│   │   └── navbar/                # navbar + dropdowns + mobile menu
│   ├── sections/
│   │   └── home/                  # seções da home (hero, etc.)
│   ├── lib/
│   │   ├── api.ts                 # cliente HTTP da API (NEXT_PUBLIC_API_URL)
│   │   └── utils.ts               # cn() e helpers
│   └── styles/
│       └── globals.css            # design tokens + utilities
├── public/                        # assets estáticos (criar quando necessário)
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── .env.example
```

**Convenções de organização de componentes:**

- `components/ui/` → genéricos e reusáveis (Button, Input, Card, Badge…)
- `layout/` → navbar, footer (estrutura presente em todas as páginas)
- `sections/<página>/` → seções completas de uma página específica (`home/hero.tsx`, `home/fabricantes.tsx`, etc.)
- `sections/shared/` → seções compartilhadas entre páginas (CTA final, etc.) — criar quando surgir
- `components/<nome>/` → componentes específicos do projeto reusados em várias páginas (product-card, lead-form…) — criar quando surgir

---

## Regras de código

- **TypeScript obrigatório**, sem `any` e sem JS puro
- Imagens via `next/image`, fontes via `next/font`
- Formulários **validados client-side com Zod** e **enviados para a API** (validação final é responsabilidade do backend)
- `consentimento_lgpd` obrigatório em todo form de lead
- Variáveis de ambiente via `.env.local` (nunca hardcoded)
- Aliases de import: `@/*` → `src/*`
- Imports relativos `../../foo` só para vizinhos diretos; resto usa `@/`

---

## Direção visual

**Nível 1.5 — Enterprise com Presença.** Referências: Vercel, Linear, IBM, Stripe, Resend.

**Nunca:** gradientes excessivos, neon/glow/blur decorativo, estética SaaS genérica, sombras pesadas em cards, animações que distraem.

**Sempre:** fundo branco/cinzas neutros, bordas finas (`1px solid #D8D8D8`), grid organizado e respirado, IBM Plex Sans com hierarquia clara.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api    # backend Spring Boot local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Scripts

- `npm run dev` — dev server (porta 3000)
- `npm run build` — build de produção
- `npm run start` — serve o build
- `npm run lint` — ESLint

---

## Backend

A API consumida vive em **`../backend/`** (Spring Boot + Java + PostgreSQL Neon). O cliente HTTP está em [src/lib/api.ts](src/lib/api.ts) e usa `NEXT_PUBLIC_API_URL`.

Endpoints esperados (a serem implementados no backend):
- `GET /categorias`
- `GET /produtos` (filtros: `categoria`, `fabricante`, `limit`)
- `GET /produtos/{slug}`
- `GET /fabricantes`
- `GET /servicos`
- `GET /conteudos` (filtros: `tipo`, `limit`)
- `GET /banners` (filtro: `secao`)
- `POST /leads`
