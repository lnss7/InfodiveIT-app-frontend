# Infodive — Portal de Soluções de TI

Site institucional e catálogo comercial da Infodive, integrador de tecnologia B2B (desde 2003).

> **Contexto completo do projeto:** `.claude/skills/infodive-context/SKILL.md`
> A skill é auto-invocada quando a tarefa envolve criar telas, componentes, código, schemas ou qualquer artefato deste projeto. Os arquivos em `references/` (arquitetura completa e modelagem do banco) só são lidos sob demanda.

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Payload CMS v3** (admin + ORM, roda dentro do Next.js)
- **PostgreSQL** via Neon (gerenciado pelo Drizzle via Payload)
- **Tailwind CSS** + **IBM Plex Sans** (única fonte do projeto)
- **GSAP + Lenis** (animações + smooth scroll)
- **React Three Fiber + Three.js** (shader WebGL do hero)
- **Vercel** (deploy) + **Vercel Blob** ou **Cloudflare R2** (storage)
- **Resend** (e-mail de leads)

---

## Estrutura de pastas

```
src/
├── app/
│   ├── (frontend)/         # Páginas públicas
│   └── (payload)/          # Admin + API do Payload
├── collections/            # Schemas Payload (Categorias, Produtos, Leads, etc.)
├── globals/                # Configuracoes (singleton)
├── components/             # Componentes React reutilizáveis
├── lib/                    # Utilitários (cn(), helpers)
├── styles/globals.css      # Design tokens + utilities
└── payload.config.ts

.claude/
└── skills/infodive-context/   # Skill auto-invocada com contexto do projeto
    ├── SKILL.md               # Entry point — sempre leia antes de gerar código
    └── references/
        ├── arquitetura.md     # Rotas, seções, fluxos
        └── banco.md           # Schema completo do banco

estrutura.md                # Visão visual de cada página (humanos)
README.md                   # Setup local, scripts, deploy
```

---

## Regras de código (resumo — detalhes na skill)

- **TypeScript obrigatório**, sem `any` e sem JS puro
- Imagens via `next/image`, fontes via `next/font`
- Formulários **validados server-side** (nunca confiar só no client)
- `consentimento_lgpd` obrigatório em todo form — rejeitar server-side se `false`
- Storage de arquivos: nunca disco local em produção
- Variáveis de ambiente via `.env.local` (nunca hardcoded)

---

## Direção visual

**Nível 1.5 — Enterprise com Presença.** Referências: Vercel, Linear, IBM, Stripe, Resend.

**Nunca:** gradientes excessivos, neon/glow/blur decorativo, estética SaaS genérica, sombras pesadas em cards, animações que distraem.

**Sempre:** fundo branco/cinzas neutros, bordas finas (`1px solid #D8D8D8`), grid organizado e respirado, IBM Plex Sans com hierarquia clara.

---

## Documentação adicional

- **`.claude/skills/infodive-context/SKILL.md`** — contexto completo (stack, tokens, regras, fabricantes, categorias)
- **`.claude/skills/infodive-context/references/arquitetura.md`** — todas as páginas e seções detalhadas
- **`.claude/skills/infodive-context/references/banco.md`** — schema completo (tabelas, colunas, FKs, índices)
- **`estrutura.md`** — visão visual das páginas (linguagem humana)
- **`README.md`** — setup local, scripts npm, deploy na Vercel
