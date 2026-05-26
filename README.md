# Infodive Frontend

Site institucional e catálogo comercial da Infodive — Next.js 14 (App Router) + TypeScript + Tailwind.

> Backend Spring Boot em `../backend/`.

---

## Pré-requisitos

- **Node.js** ≥ 20 (use `nvm use` para pegar a versão do `.nvmrc`)
- **npm** ≥ 10
- Backend rodando em `http://localhost:8080` (ver `../backend/README.md`)

---

## Setup

```bash
# 1. Instalar deps
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# edite .env.local se a porta do backend for diferente

# 3. Subir o dev server
npm run dev
```

Acesse `http://localhost:3000`.

---

## Scripts

| Comando         | O que faz                       |
|-----------------|---------------------------------|
| `npm run dev`   | Dev server com hot reload       |
| `npm run build` | Build de produção               |
| `npm run start` | Serve o build                   |
| `npm run lint`  | ESLint                          |

---

## Estrutura

```
src/
├── app/                  # rotas (App Router)
├── components/ui/        # componentes genéricos
├── layout/navbar/        # navbar + dropdowns + mobile
├── sections/home/        # seções da home
├── lib/                  # api.ts (cliente HTTP), utils.ts
└── styles/globals.css    # tokens + utilities
```

Detalhes em [CLAUDE.md](./CLAUDE.md).

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + IBM Plex Sans
- **GSAP + Lenis** (animações)
- **React Three Fiber + Three.js** (shader WebGL)
- **Framer Motion** (micro-interações)
- **Lucide React** (ícones)
- **Zod** (validação de forms)

---

## Variáveis de ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Deploy

- **Vercel** — conectar este diretório como root do projeto.
- Definir `NEXT_PUBLIC_API_URL` apontando para o domínio do backend em produção.

---

## Convenções

- Imports absolutos via `@/*` (mapeado para `src/*`)
- TypeScript estrito (`strict: true`)
- Imagens via `next/image`, fontes via `next/font`
- LGPD: `consentimento_lgpd` obrigatório em forms de lead
