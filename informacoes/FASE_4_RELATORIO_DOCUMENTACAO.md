# FASE 4 — Relatório de Documentação Formal (plano)

## Objetivo

Documentar formalmente o frontend conforme a seção 4 do prompt de revisão, sem
emojis e em português. Cinco frentes:

1. JSDoc em todos os componentes de `src/components/ui/`.
2. JSDoc nas funções exportadas de `src/lib/` (e hooks, se existissem).
3. Comentários explicativos nos blocos de animação GSAP/Lenis de `src/sections/`.
4. Reescrita do `README.md` no formato pedido.
5. Criação do `COMPONENTS.md`.

## Estado inicial observado

- Vários componentes de UI já têm um comentário de uma linha (badge, breadcrumb,
  marquee, tabs, border-beam, tracing-beam), mas faltam `@param`/`@example`
  formais. Outros não têm JSDoc (button, card, bento-grid, number-ticker,
  select-field).
- `src/lib/api.ts` já está totalmente documentado por método; `cn()` tem
  descrição curta. Os helpers de dados (`getProductBySlug`, `getRelatedProducts`,
  `getArtigoBySlug`, `getArtigosRelacionados`) têm comentários soltos, sem JSDoc.
- Não existe pasta `src/hooks/` — não há hooks customizados a documentar.
- As animações GSAP ScrollTrigger vivem em `src/sections/sobre/*` e
  `src/sections/servicos/*`. O `home/hero.tsx` não usa GSAP: usa Lenis
  (`window.lenis.scrollTo`) para o scroll suave por âncora.
- `README.md` existe, mas é enxuto e não cobre todas as seções pedidas
  (Design System, Arquitetura de Componentes, Testes, etc.).

## Plano de execução

### 4.1 JSDoc nos componentes de UI

Adicionar bloco JSDoc com descrição de uma linha, `@param` para cada prop
(incluindo os valores possíveis em unions) e ao menos um `@example` em: button,
card, badge, bento-grid, breadcrumb, marquee, number-ticker, select-field, tabs,
glow-border, border-beam, magic-card, orbiting-circles, text-reveal, tracing-beam.

### 4.2 JSDoc nos utilitários de lib

Expandir o JSDoc de `cn()` (params + returns + example) e adicionar JSDoc completo
aos helpers de `products-data.ts` e `blog-data.ts`. Os métodos de `api.ts` já estão
documentados e serão mantidos.

### 4.3 Comentários de animação

Garantir que cada bloco GSAP ScrollTrigger em `sobre/*` e `servicos/*` e cada uso
de Lenis tenham comentário explicando o efeito, o motivo de ser desktop-only quando
aplicável e a justificativa de valores mágicos (scrub, start/end, stagger).

### 4.4 README.md

Reescrever com as seções: Visão Geral, Stack Tecnológica (tabela), Estrutura do
Projeto, Design System (cores, tipografia, utilitárias), Pré-requisitos, Instalação
e Execução Local, Variáveis de Ambiente (tabela), Scripts (tabela), Arquitetura de
Componentes, Convenções de Código, Testes, Conexão com o Backend, Deploy.

### 4.5 COMPONENTS.md

Documentar cada componente de `src/components/ui/` com descrição, tabela de props
(tipo, obrigatório, default, descrição), exemplo de uso e notas.

## Restrições

- Sem emojis na documentação.
- Apenas adicionar comentários/JSDoc e documentação; não alterar lógica, animações
  ou rotas.
- Parar ao final e apresentar o relatório antes do relatório final consolidado.

O resultado executado está em `FASE_4_DOCUMENTACAO_IMPLEMENTADA.md`.
