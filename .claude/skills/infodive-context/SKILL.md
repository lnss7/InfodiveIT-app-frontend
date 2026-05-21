---
name: infodive-context
description: >
  Contexto completo do projeto de redesign do site da Infodive. Use esta skill SEMPRE que o usuário mencionar Infodive, pedir para criar telas, componentes, código, protótipos, schemas, queries ou qualquer artefato relacionado ao projeto. Também use quando o usuário mencionar stack do projeto, design tokens, arquitetura de páginas, CMS, banco de dados, animações ou shaders no contexto do projeto. Se a tarefa envolve construir qualquer parte do site da Infodive — use esta skill primeiro.
---

# Infodive — Contexto do Projeto

Antes de qualquer geração de código, tela ou decisão técnica, leia este documento completo.
Para detalhes de arquitetura de páginas → `references/arquitetura.md`
Para modelagem do banco → `references/banco.md`

---

## O que é a Infodive

Integrador de tecnologia B2B com sede em Porto Alegre. Atua desde 2003 com infraestrutura, segurança, cloud, virtualização, proteção de dados e IA. Público-alvo: diretores de TI, CTOs e gerentes de infraestrutura de empresas médias e grandes.

**Posicionamento:** Portal de Soluções de TI B2B Premium — não é SaaS, não é produto próprio, é integrador.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| CMS / Admin | Payload CMS v3 (roda dentro do Next.js) |
| Banco | PostgreSQL via Neon |
| ORM | Drizzle (gerenciado pelo Payload) |
| Styling | Tailwind CSS |
| Tipografia | IBM Plex Sans (400 / 500 / 600) |
| Animações | GSAP + Lenis (smooth scroll) |
| WebGL / Shaders | React Three Fiber + Three.js |
| Deploy | Vercel |
| Linguagem | TypeScript (tudo) |
| Storage de arquivos | Vercel Blob ou Cloudflare R2 |

---

## Design Tokens

### Cores

```ts
// Brand
'--blue-primary':   '#0E66FF'  // CTA principal, links
'--blue-deep':      '#001DFF'  // hover, dark variant
'--blue-mid':       '#0E5CFF'  // variante
'--blue-light':     '#1469FD'  // links inline
'--blue-tint':      '#E4EAFF'  // backgrounds informativos

// Accent
'--teal':           '#46BEA3'  // badges, tags, destaques
'--indigo':         '#5754FF'  // accent secundário

// Neutros
'--gray-950':       '#141413'  // heading, bg dark sections
'--gray-900':       '#1A1919'  // body text
'--gray-500':       '#7B7B7B'  // texto secundário
'--gray-300':       '#BFBFBF'  // placeholder
'--gray-200':       '#D8D8D8'  // bordas
'--gray-50':        '#FAFAFA'  // bg de seções alternas
'--white':          '#FFFFFF'  // bg cards
```

### Tipografia

- Família única: **IBM Plex Sans** em tudo
- Pesos: 400 (body), 500 (subheadings, labels), 600 (headings, CTAs)
- Nunca usar fonte diferente

---

## Direção Visual

**Nível:** 1.5 — Enterprise com Presença

**O que é:** Hero com shader WebGL sutil (partículas ou malha 3D reagindo ao mouse) + reveals no scroll via GSAP + micro-interações nos cards. O restante do site é limpo, editorial, corporativo.

**Referências aprovadas:** Vercel, Linear, IBM, Stripe, Resend

**O que NUNCA fazer:**
- Gradientes excessivos
- Estética SaaS/startup genérica
- Neon, glow, blur decorativo
- Cards com sombra pesada
- Excesso de ícones coloridos
- Animações que distraem do conteúdo

**O que priorizar:**
- Fundo branco / cinzas neutros / seções dark escassas
- Bordas finas (`1px solid #D8D8D8`)
- Grid organizado, layout respirado
- Tipografia IBM Plex Sans com hierarquia clara
- Fotos de datacenter / ambientes corporativos

---

## Navegação Principal

```
Início
Soluções      → dropdown: 9 categorias
Produtos      → catálogo com filtros
Fabricantes   → grid de parceiros
Serviços      → serviços profissionais
Conteúdos     → feed social (Instagram + LinkedIn) + materiais
Sobre

[CTA fixo]    → Fale com um especialista
```

---

## Categorias do Portfólio (slugs)

```
/solucoes/infraestrutura
/solucoes/armazenamento
/solucoes/protecao-de-dados
/solucoes/seguranca
/solucoes/observability
/solucoes/virtualizacao
/solucoes/cloud
/solucoes/inteligencia-artificial
/solucoes/endpoints
```

---

## Fabricantes Parceiros

IBM, Lenovo, Dell, HPE, Supermicro, Acronis, Veeam, Microsoft, VMware, Red Hat, SUSE, Virtuozzo, Proxmox, AWS, Azure, IBM Cloud, Apple

---

## Coleções Payload (resumo)

| Collection | Propósito |
|---|---|
| `categorias` | 9 áreas do portfólio |
| `fabricantes` | parceiros |
| `produtos` | catálogo completo |
| `servicos` | serviços profissionais |
| `conteudos` | materiais + posts sociais |
| `leads` | capturas de formulário |
| `banners` | banners configuráveis por seção |
| `media` | uploads (Payload built-in) |
| `configuracoes` | global: contatos, tokens de API social |

Detalhes completos dos campos → `references/banco.md`

---

## Seções da Home (ordem)

1. Hero — shader WebGL + headline + 2 CTAs
2. Números — contador animado (GSAP on scroll)
3. Soluções — grid 9 categorias
4. Produtos em destaque — seleção manual no admin
5. Fabricantes — marquee infinito com logos
6. Problemas que resolvemos — layout editorial
7. Serviços — grid resumido
8. Últimos conteúdos — 3 cards recentes
9. Contato — formulário inline + dados de contato (dark section)

---

## Regras de Código

- **Sempre TypeScript** — sem `any`, sem JS puro
- Componentes em `src/components/`, páginas em `src/app/`
- Coleções Payload em `src/collections/`
- Variáveis de ambiente via `.env.local` (nunca hardcoded)
- Imagens sempre via `next/image`
- Fontes via `next/font`
- Formulários validados server-side (nunca confiar só no client)
- `consentimento_lgpd` obrigatório em todos os forms — rejeitar server-side se `false`
- Storage de arquivos: nunca disco local em produção

---

## Integrações Importantes

**Instagram:** Basic Display API foi descontinuada. Usar Instagram Graph API com conta Business vinculada ao Facebook. Token expira a cada 60 dias — precisa de renovação.

**LinkedIn:** OAuth 2.0 com permissão `r_organization_social`. Aprovação manual pelo LinkedIn — pode levar semanas. Iniciar processo cedo.

**Email de leads:** Usar Resend para notificações de novos leads.

---

## O que NÃO está no escopo do MVP

- Área do cliente / login de usuários
- E-commerce / loja
- Chat / chatbot
- Busca inteligente com IA
- Integração com CRM externo
- Cases de sucesso (Fase 2)
