# Prompt — Implementar Página de Serviços (Infodive)

> Para colar no Claude Code. Leia a skill `infodive-context` antes.
> Este documento já mapeia os componentes REAIS do projeto (extraídos da página /sobre).
> NÃO crie componentes de animação novos — reutilize os que já existem.

---

## Conceito: Serviços ≠ Soluções

A distinção precisa ficar clara na UI, não só no texto:

- **Soluções = O QUE.** A tecnologia/produto. "Que tecnologia eu preciso?" (Infraestrutura, Segurança, Cloud...). Formato: **grid de catálogo**.
- **Serviços = COMO.** A expertise e mão de obra da Infodive sobre a tecnologia. "Quem planeja, implanta e mantém isso pra mim?" (Consultoria, Assessment, Implantação...). Formato: **jornada/processo/ciclo**.

Analogia que deve transparecer: uma solução sem serviço é só um produto numa caixa. O serviço é o que faz a tecnologia funcionar no ambiente do cliente.

**Regra visual de ouro:** NÃO repetir o layout de grid de Soluções. Serviços usa timeline, stepper e sequência — comunica continuidade e processo.

---

## Componentes do projeto a reutilizar

Estes JÁ EXISTEM. Use-os, não recrie:

### Animação de scroll
- `Reveal` (`src/components/animations/reveal.tsx`) — revela bloco com blur + deslocamento ao entrar na viewport. Props: `delay`, `blur`, `y`. Padrão pra "aparecer ao scrollar".
- `TextEffect` (`src/components/animations/text-effect.tsx`) — anima texto palavra/letra na entrada. Presets: `blur`, `fade`, `slide`, `scale`. Permite destacar palavras.
- `TextReveal` (`src/components/ui/text-reveal.tsx`) — frase que acende palavra por palavra ligada ao scroll. Props: `text`, `highlightLines`, `trackHeight`, `revealViewports`.
- `NumberTicker` (`src/components/ui/number-ticker.tsx`) — contador animado que dispara ao entrar na tela.
- `InteractiveGridPattern` (`src/components/animations/interactive-grid-pattern.tsx`) — grade SVG de fundo que reage ao mouse (heros dark).

### Layout / utilitários
- `Footer` (`src/layout/footer.tsx`) — rodapé padrão com parallax embutido.
- `cn()` (`src/lib/utils.ts`) — helper de classes Tailwind.

### Infra de scroll (importante)
- Smooth scroll global: Lenis em `src/components/smooth-scroll.tsx`, exposto em `window.lenis`. Scroll programático: `window.lenis.scrollTo(el, { duration: 1.2 })`.
- GSAP + ScrollTrigger já sincronizados com Lenis. Padrão de parallax/pin: seguir `src/layout/footer.tsx` — usar `gsap.matchMedia()` pra rodar efeito só no desktop (`min-width: 1024px`), com `scrollTrigger: { scrub: true }`.
- **iOS:** transforms atrelados ao scroll travam no iOS. Efeitos pesados são desktop-only, mobile tem fallback estático. Seguir esse padrão.

### Bibliotecas disponíveis (nada novo a instalar)
GSAP + ScrollTrigger, Lenis, Framer Motion, Lucide (`lucide-react`), `next/image`.

---

## Design tokens (de src/styles/globals.css)

- Cores: `brand` (#0E66FF), `ink-950`/`ink-900` (textos escuros), `ink-500` (secundário), `ink-200` (#D8D8D8 bordas), `ink-50` (fundo alt), `teal` (#46BEA3 accent). Fundo dark das seções: **#050507**.
- Classes: `.container-default`, `.section`, `.section-dark`, `.section-tint`, `.eyebrow`, `.btn-primary`, `.btn-secondary`.
- Fonte única: IBM Plex Sans. Bordas 1px solid #D8D8D8. Enterprise clean (Vercel/Linear/Stripe), sem glow/neon/gradiente excessivo.
- **Acento exclusivo de Serviços:** o gradiente da marca `#6F0101 → #3B1F59 → #063FB4` pode ser usado com parcimônia nesta página (barra de progresso da timeline, número da etapa ativa) para diferenciá-la sutilmente de Soluções.

---

## LAYOUT COMPLETO — Página `/servicos`

Composição: `src/app/servicos/page.tsx` — Metadata (SEO) + as 5 seções na ordem + `<Footer />`.
Cada seção é um arquivo em `src/sections/servicos/`.

---

### Seção 1 — `hero.tsx` (dark)

**Conteúdo:**
- Fundo dark #050507 com `InteractiveGridPattern` reagindo ao mouse
- Eyebrow: "SERVIÇOS"
- Título (via `TextEffect`, preset blur, palavra-a-palavra):
  "Tecnologia é só o começo. Resultado vem da execução."
- Subtítulo: "A Infodive não entrega apenas a tecnologia — planejamos, implantamos, migramos e sustentamos o ambiente que mantém sua empresa no ar."
- 2 botões: "Conheça nossos serviços" (scroll pro ciclo via `window.lenis.scrollTo`) + "Fale com um especialista"

**Efeito de scroll:** título palavra-a-palavra com blur na entrada + parallax de saída (conteúdo afunda/esmaece ao rolar). Mesmo padrão do `hero.tsx` de /sobre.

---

### Seção 2 — `manifesto.tsx` (simples)

**Conteúdo:**
- Frase-manifesto única, estática:
  "Comprar tecnologia é fácil. Difícil é fazê-la **funcionar**."
- A palavra destacada ("funcionar", ou "fazê-la funcionar") usa **estilo outline/contorno transparente**: texto sem preenchimento, apenas com a borda visível (efeito stroke), fundo transparente no meio. Em CSS: `-webkit-text-stroke: 1px <cor>; color: transparent;`. Cor do stroke pode ser o `brand` (#0E66FF) ou branco se a seção for dark.
- O resto da frase fica em texto normal (cor sólida).

**Efeito:** sem animação pesada. No máximo um `Reveal` simples na entrada (blur leve). Sem `TextReveal`, sem pin, sem scrub. É um respiro editorial entre o hero e o ciclo.

---

### Seção 3 — `ciclo.tsx` (O CORAÇÃO DA PÁGINA — diferencial visual)

**Conceito:** os serviços como uma JORNADA sequencial pinada, não cards soltos. Esta é a seção que diferencia Serviços de Soluções.

**Formato:** seção pinada (pin) onde o scroll vertical avança pelas etapas — pode ser stepper horizontal deslizante (como a `timeline.tsx` de /sobre) ou timeline vertical com barra de progresso. Reaproveitar a mecânica de pin+scrub da timeline de /sobre.

**As 8 etapas (em ordem de ciclo):**

1. **Consultoria** — "Entendemos seu ambiente, suas dores e seus objetivos antes de qualquer recomendação."
2. **Assessment** — "Diagnóstico técnico detalhado do cenário atual: o que existe, o que falta, o que está em risco."
3. **Projeto** — "Desenho da arquitetura e planejamento da solução sob medida para o seu ambiente."
4. **Implantação** — "Execução e instalação das soluções com metodologia e mínimo impacto na operação."
5. **Migração** — "Transição de ambientes legados para novas plataformas sem downtime e sem perda de dados."
6. **Sustentação** — "Suporte contínuo e manutenção para manter tudo funcionando com previsibilidade."
7. **Operação Assistida** — "Nossa equipe opera e gere o ambiente como extensão do seu time de TI."
8. **Monitoramento** — "Observabilidade e resposta proativa — detectamos e agimos antes que vire problema."

**Detalhes visuais:**
- Cada etapa tem número (01–08) usando o gradiente da marca na etapa ativa
- Barra de progresso preenche conforme avança (gradiente #6F0101→#3B1F59→#063FB4)
- Mobile: vira lista vertical estática (fallback, sem pin)
- Ícones Lucide por etapa (ex: Search, ClipboardCheck, PenTool, Rocket, ArrowRightLeft, Wrench, Users, Activity)

---

### Seção 4 — `metodologia.tsx` (editorial)

**Conteúdo:**
- Coluna de texto sticky à esquerda (padrão `ourNumbers.tsx`/`ourValues.tsx` de /sobre)
- Eyebrow: "COMO TRABALHAMOS"
- Título: "Método, não improviso."
- À direita, cards revelando em camadas (`Reveal` com blur+slide) cobrindo:
  - Abordagem orientada a resultado e SLA
  - Equipe certificada nos principais fabricantes
  - Documentação e transparência em cada etapa
  - Padrões de segurança e conformidade (LGPD)
- Opcional: `NumberTicker` com métricas de credibilidade (anos de mercado, projetos entregues, % de retenção)

**Efeito:** coluna sticky + cards em parallax/reveal escalonado.

---

### Seção 5 — `cta.tsx` (fechamento)

**Conteúdo:**
- Reaproveitar a seção de contato/CTA já existente no projeto (mesma da home/sobre)
- Headline: "Pronto para tirar seu projeto do papel?"
- Botão: "Fale com um especialista"

**Efeito:** `Reveal` simples + botões.

---

## Modelo de dados

A entidade `servicos` já existe (nome, slug, descricao, beneficios, icone, ordem, ativo).

Adicionar se necessário:
- `ordem_no_ciclo` (number) — posição na jornada (1–8), para ordenar a Seção 3

---

## Navegação

Garantir que "Serviços" na navbar aponta para `/servicos`. Se houver dropdown, listar as 8 etapas/serviços principais.

---

## Ordem de execução (importante)

1. Comece pela estrutura da página + Seção 1 (hero) + Seção 2 (manifesto). Mostre.
2. Depois Seção 3 (ciclo) — a mais crítica. Valide se a distinção visual de Soluções ficou clara ANTES de continuar.
3. Por fim Seções 4 e 5.

Não quebre nada existente. Reutilize os componentes de animação listados. Siga o padrão desktop-only com fallback mobile para efeitos pesados.
