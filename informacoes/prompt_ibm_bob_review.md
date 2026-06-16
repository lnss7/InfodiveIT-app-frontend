# Revisao de Codigo, Testes e Documentacao — Infodive Frontend

## Contexto do Projeto

Este e o frontend do site institucional da Infodive IT, uma empresa integradora de tecnologia B2B. O projeto e construido em Next.js 14 com App Router, TypeScript, Tailwind CSS, GSAP, Lenis e React Three Fiber. A fonte unica e IBM Plex Sans.

Leia a skill em `skills/infodive-context/SKILL.md` antes de qualquer acao.

Execute cada fase em ordem. Pare entre cada uma e apresente um relatorio antes de continuar.

---

## FASE 1 — AUDITORIA DE CONSISTENCIA DO DESIGN SYSTEM

### 1.1 Inventario de componentes

Liste todos os arquivos em `src/components/` organizados por categoria. Para cada componente registre:

- Nome do arquivo e caminho
- Se e Client Component (`'use client'`) ou Server Component
- Props aceitas e seus tipos
- Se possui variantes (ex: primario, secundario, ghost)

### 1.2 Auditoria de botoes

Localize todos os elementos `<button>` e componentes de botao no projeto inteiro (incluindo secoes e layouts). Para cada ocorrencia verifique e registre:

- Caminho do arquivo e linha
- Border-radius aplicado (valor exato)
- Cor de fundo e texto
- Altura e padding
- Peso da fonte
- Variante (primario, secundario, ghost, outline)
- Se usa a classe `.btn-primary`, `.btn-secondary` do design system ou tem estilo proprio
- Se o hover state esta definido

Gere uma tabela comparativa. Identifique qualquer inconsistencia — exemplo: botao com `rounded-full` em uma tela e `rounded` em outra, ou padding diferente entre paginas equivalentes.

### 1.3 Auditoria de tipografia

Verifique em todas as paginas e componentes:

- Se a fonte usada e sempre IBM Plex Sans (nenhuma fonte diferente pode aparecer)
- Se os pesos usados sao apenas 400, 500 e 600
- Se os tamanhos de heading seguem a escala definida (h1 text-4xl/6xl, h2 text-3xl/4xl, etc.)
- Se textos secundarios usam `ink-500` (#7B7B7B)
- Se headings usam `ink-950` (#141413)
- Ocorrencias de tamanho ou peso arbitrario fora da escala

### 1.4 Auditoria de cores

Verifique em todos os arquivos:

- Ocorrencias de cores hardcoded em hex que nao passam pelos tokens (ex: `text-[#0E66FF]` ao inves de `text-brand`, `bg-[#141413]` ao inves de `bg-ink-950`)
- Uso correto dos tokens: brand, brand-deep, teal, indigo, ink-950, ink-900, ink-500, ink-300, ink-200, ink-50
- Secoes dark devem usar `#050507` como fundo — verificar inconsistencias (ex: `#0A0A0A`, `#000000`, `#111111` no lugar)
- Gradiente da marca so deve aparecer nos locais planejados: `linear-gradient(135deg, #6F0101 0%, #3B1F59 50%, #063FB4 100%)`

### 1.5 Auditoria de bordas e espacamento

- Border-radius padrao e `rounded` (8px) e `rounded-lg` (12px). Identificar usos de `rounded-full`, `rounded-2xl` ou valores arbitrarios em componentes que deveriam seguir o padrao
- Bordas de cards devem ser `1px solid #D8D8D8`. Identificar variacoes
- Verificar se o `.container-default` e usado consistentemente para largura maxima e padding lateral
- Identificar secoes com padding vertical fora do padrao `.section` (py-20 md:py-28)

### 1.6 Relatorio de inconsistencias

Ao final da Fase 1, gere um relatorio estruturado com:

- Lista de inconsistencias encontradas por categoria
- Arquivo e linha de cada ocorrencia
- Correcao recomendada para cada item
- Classificacao de severidade: CRITICO (quebra visual notavel), MEDIO (divergencia sutil), BAIXO (preferencia)

Corrija automaticamente apenas os itens classificados como CRITICO e MEDIO. Para cada correcao feita, descreva o que foi alterado. Nao altere logica ou estrutura — apenas tokens visuais.

---

## FASE 2 — REVISAO DE ESTRUTURA E QUALIDADE DE CODIGO

### 2.1 Estrutura de pastas

Nao ha uma estrutura pre-definida para seguir. Analise a estrutura atual do projeto de forma autonoma e avalie se ela segue boas praticas consolidadas para projetos Next.js 14 com App Router em escala de producao.

Comece mapeando o que existe:

1. Execute `find src -type f | sort` e apresente a arvore completa
2. Com base no que encontrar, avalie cada decisao estrutural segundo os seguintes criterios:

Separacao de responsabilidades: cada pasta tem uma responsabilidade clara e unica? Um desenvolvedor novo consegue prever onde encontrar cada tipo de arquivo sem precisar abrir varios diretorios?

Escalabilidade: a estrutura atual suportaria o dobro de paginas e componentes sem se tornar confusa? Ha pastas que ja estao com arquivos demais sem subdivisao?

Colocalizacao: arquivos que mudam juntos estao proximos entre si? Testes, tipos e componentes relacionados estao organizados de forma que uma mudanca em um nao exija busca em multiplos diretorios?

Convencoes Next.js App Router: a estrutura de `src/app/` segue as convencoes do App Router — route groups, layouts aninhados, loading e error boundaries no lugar correto?

Nomenclatura: arquivos de componente estao em kebab-case? Componentes exportados estao em PascalCase? Hooks comecam com `use`? Ha mistura de convencoes?

Separacao client/server: e possivel identificar rapidamente quais arquivos sao Client Components e quais sao Server Components pela sua localizacao ou nomenclatura?

3. Gere um relatorio com:
   - O que esta bem estruturado e por que
   - O que esta problematico, com justificativa tecnica clara
   - Proposta de nova estrutura apenas para os pontos problematicos (nao reescreva o que ja esta bom)
   - Estimativa de impacto de cada mudanca proposta: baixo, medio ou alto

4. Corrija automaticamente apenas:
   - Imports com caminho relativo longo (`../../..`) trocando pelo alias `@/`
   - Arquivos com nome inconsistente com a convencao predominante no proprio projeto
   - Arquivos claramente duplicados com funcao identica

Para qualquer mudanca estrutural maior — mover pastas, renomear diretorios, reorganizar hierarquia — descreva a proposta e aguarde confirmacao antes de executar.

### 2.2 Qualidade de codigo TypeScript

Verifique em todos os arquivos `.ts` e `.tsx`:

- Ocorrencias de `any` explicito — cada uma deve ser justificada ou eliminada
- Props de componentes sem tipo definido (interface ou type)
- Funcoes sem tipo de retorno explicito quando o retorno nao e obvio
- Variaveis `let` que nunca sao reatribuidas (devem ser `const`)
- `console.log` esquecidos em producao — liste e remova todos
- Imports nao utilizados — liste e remova todos
- Componentes Client (`'use client'`) que nao usam nenhum hook ou evento de browser e poderiam ser Server Components

### 2.3 Padroes de componente

Para cada componente em `src/components/ui/`:

- Verificar se aceita `className` como prop para customizacao externa (padrao de design system)
- Verificar se usa `cn()` de `src/lib/utils.ts` para mesclar classes
- Verificar se variantes estao implementadas via objeto de variantes (padrao cva ou similar) e nao via ternarios aninhados

### 2.4 Performance e boas praticas Next.js

- Verificar uso de `next/image` em todas as tags `<img>` — nenhuma tag `<img>` nativa deve existir
- Verificar uso de `next/font` para IBM Plex Sans — nao deve haver import de Google Fonts via `<link>` no HTML
- Identificar Client Components desnecessariamente grandes que poderiam ser divididos (componente acima de 200 linhas com `'use client'`)
- Verificar se paginas dinamicas (`[slug]`) tem `generateMetadata` implementado
- Verificar se dados estaticos (listas de categorias, fabricantes) estao em `src/config/` e nao hardcoded dentro de componentes de pagina

### 2.5 Acessibilidade basica

- Todas as imagens devem ter atributo `alt` descritivo (nao vazio, nao "image")
- Botoes sem texto visivel devem ter `aria-label`
- Links devem ter texto descritivo (nao apenas "clique aqui" ou "saiba mais" sem contexto)
- Inputs de formulario devem ter `<label>` associado ou `aria-label`
- Verificar contraste minimo: texto sobre fundo dark (#050507) deve ser pelo menos ink-500 (#7B7B7B)

---

## FASE 3 — TESTES UNITARIOS E DE COBERTURA

### 3.1 Setup do ambiente de testes

Verifique se o ambiente de testes ja esta configurado. Se nao estiver, configure:

Instale as dependencias necessarias:

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-node
```

Crie `jest.config.ts` na raiz:

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
}

export default createJestConfig(config)
```

Crie `jest.setup.ts`:

```ts
import '@testing-library/jest-dom'
```

Adicione ao `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

Nota importante: async Server Components nao sao suportados pelo Jest. Para componentes de pagina que fazem fetch de dados, use testes E2E com Playwright. Os testes unitarios cobrem componentes de UI, hooks e utilitarios.

### 3.2 Testes para componentes de UI (src/components/ui/)

Para cada componente em `src/components/ui/`, crie um arquivo de teste em `src/components/ui/__tests__/[nome-do-componente].test.tsx`.

Cada suite de testes deve cobrir:

**Button:**

```
- renderiza corretamente com texto
- aplica variante 'primary' com classes corretas
- aplica variante 'secondary' com classes corretas
- aplica variante 'ghost' com classes corretas
- chama onClick quando clicado
- renderiza desabilitado quando prop disabled=true
- nao chama onClick quando desabilitado
- aceita e aplica className adicional via prop
- renderiza como elemento <a> quando prop href e fornecido
```

**Input:**

```
- renderiza campo de texto
- exibe label quando fornecida
- exibe placeholder corretamente
- chama onChange com o valor correto
- exibe estado de erro com mensagem
- aplica classe de foco corretamente
- renderiza desabilitado quando prop disabled=true
- aceita className adicional
```

**Badge:**

```
- renderiza com texto correto
- aplica variante 'brand' (fundo #E4EAFF, texto #0E66FF)
- aplica variante 'teal' (fundo #E8F8F4, texto #46BEA3)
- aplica className adicional
```

**Card:**

```
- renderiza children corretamente
- aplica borda padrao 1px solid #D8D8D8
- aplica hover state com border-color brand quando variante 'hover'
- aceita className adicional
```

**Select:**

```
- renderiza com placeholder
- exibe opcoes corretamente
- chama onChange com valor selecionado
- exibe estado de erro
```

### 3.3 Testes para hooks (src/hooks/)

Para cada hook customizado em `src/hooks/`, crie testes em `src/hooks/__tests__/`:

**useMediaQuery (se existir):**

```
- retorna true quando a media query corresponde
- retorna false quando a media query nao corresponde
- atualiza quando a largura da janela muda
```

**useScroll (se existir):**

```
- retorna posicao inicial correta
- atualiza posicao ao fazer scroll
```

Para cada hook, teste o comportamento via `renderHook` do React Testing Library.

### 3.4 Testes para utilitarios (src/lib/)

**cn() em src/lib/utils.ts:**

```
- concatena classes simples
- resolve conflitos de classes Tailwind (ex: px-2 e px-4 -> mantém px-4)
- ignora valores falsy (undefined, null, false)
- aceita arrays de classes
- aceita objetos condicionais
```

**Funcoes em src/lib/format.ts (se existirem):**

- Teste cada funcao de formatacao com valores validos, invalidos e limites

**Cliente HTTP em src/lib/api.ts:**

```
- faz fetch para a URL correta com o path fornecido
- inclui header Content-Type: application/json
- lanca erro quando response.ok e false
- retorna dados parseados corretamente
- usa next: { revalidate: 60 } por padrao
```

Use `jest.spyOn(global, 'fetch')` para mockar as chamadas HTTP.

### 3.5 Testes de integracao para componentes compostos

Para componentes que combinam logica e UI (ex: formulario de lead, filtros de blog), crie testes de integracao em `src/components/shared/__tests__/`:

**LeadForm (se existir):**

```
- renderiza todos os campos (nome, empresa, email, telefone, cargo, mensagem)
- exibe erro de validacao quando email invalido e submetido
- exibe erro quando campos obrigatorios estao vazios
- nao permite submit sem consentimento LGPD
- chama a funcao de submit com os dados corretos quando valido
- exibe estado de loading durante o submit
- exibe mensagem de sucesso apos submit bem-sucedido
- exibe mensagem de erro quando o submit falha
```

**Filtros de Blog (src/sections/blog/):**

```
- exibe todos os posts quando filtro 'Todos' esta ativo
- filtra posts por tipo quando pill de tipo e clicado
- troca o feed quando tab Instagram/LinkedIn e clicada
- pill ativo tem estilo correto (fundo brand, texto branco)
```

### 3.6 Execucao e relatorio de cobertura

Apos escrever todos os testes:

1. Execute `npm run test` e corrija qualquer falha de configuracao
2. Execute `npm run test:coverage`
3. Apresente o relatorio de cobertura completo (por arquivo)
4. Identifique arquivos com cobertura abaixo de 70% e justifique ou adicione testes
5. A meta minima e: 75% de linhas, 75% de funcoes, 70% de branches

---

## FASE 4 — DOCUMENTACAO FORMAL

### 4.1 JSDoc em todos os componentes de UI

Para cada componente em `src/components/ui/`, adicione JSDoc completo:

```ts
/**
 * Componente de botao padrao do design system Infodive.
 *
 * @param variant - Variante visual do botao. Define cor de fundo e borda.
 *   - 'primary': fundo azul (#0E66FF), texto branco. Usado para CTAs principais.
 *   - 'secondary': fundo transparente, borda ink-200. Usado para acoes secundarias.
 *   - 'ghost': sem borda, fundo transparente. Usado em contextos internos.
 *   - 'dark': fundo ink-950, texto branco. Usado em secoes claras que precisam de contraste.
 * @param size - Tamanho do botao. Default: 'md'.
 * @param disabled - Desabilita interacao e aplica opacidade reduzida.
 * @param className - Classes Tailwind adicionais para customizacao pontual.
 * @param children - Conteudo do botao (texto, icone ou combinacao).
 *
 * @example
 * // Botao primario simples
 * <Button variant="primary">Fale com um especialista</Button>
 *
 * @example
 * // Botao secundario com classe adicional
 * <Button variant="secondary" className="w-full">Ver catalogo</Button>
 */
```

Padrao obrigatorio para todos os componentes:
- Descricao de uma linha no topo
- Todos os props documentados com `@param` incluindo os valores possiveis para unions/enums
- Pelo menos um `@example` por componente
- Para hooks: documentar o retorno com `@returns`

### 4.2 JSDoc em hooks e utilitarios

Para cada hook em `src/hooks/` e funcao exportada em `src/lib/`:

- Descricao do proposito
- Parametros tipados com descricao
- Valor de retorno com `@returns`
- Exemplo de uso com `@example`

### 4.3 Comentarios em logica de animacao

Todos os blocos GSAP ScrollTrigger e Lenis em `src/sections/` devem ter comentario explicando:

- O que a animacao faz em linguagem simples
- Por que o efeito e desktop-only se aplicavel
- Qualquer valor magico (durations, scrub values, stagger) deve ter comentario justificando

Exemplo:

```ts
// Parallax de saida: o conteudo do hero afunda e perde opacidade conforme o usuario
// scrolla para baixo. Cria sensacao de profundidade na transicao para a proxima secao.
// Desktop-only: transforms atrelados ao scroll travam no iOS Safari.
gsap.matchMedia().add('(min-width: 1024px)', () => {
  gsap.to(containerRef.current, {
    y: 80,      // desloca 80px para baixo (proporcional ao viewport height)
    opacity: 0,
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2, // suavizacao de 1.2s entre scroll e animacao
    },
  })
})
```

### 4.4 README.md atualizado

Reescreva o `README.md` do projeto frontend com as seguintes secoes obrigatorias, em portugues, sem emojis, sem markdown excessivo:

```
# Infodive Web

Descricao de uma linha do projeto.

## Visao Geral

O que e o projeto, para que serve, qual o contexto de negocio.

## Stack Tecnologica

Tabela com tecnologia, versao e proposito de cada dependencia principal.

## Estrutura do Projeto

Arvore de pastas com descricao de cada diretorio.

## Design System

Paleta de cores com nome do token, valor hex e uso.
Escala tipografica com tamanhos, pesos e contexto de uso.
Classes utilitarias disponiveis (.btn-primary, .section, etc.)

## Pre-requisitos

Node.js 20+, npm 10+.

## Instalacao e Execucao Local

Passo a passo numerado: clonar, instalar, configurar .env, rodar.

## Variaveis de Ambiente

Tabela com nome da variavel, descricao e se e obrigatoria.

## Scripts Disponíveis

Tabela com comando e descricao (dev, build, start, lint, test, test:coverage).

## Arquitetura de Componentes

Explicacao das quatro categorias: ui, layout, sections, shared.
Regras de onde cada tipo de componente deve ficar.

## Convencoes de Codigo

Nomenclatura de arquivos (kebab-case), componentes (PascalCase), hooks (usePascalCase).
Regra server vs client component.
Como usar cn() para classes.

## Testes

Como rodar os testes.
Meta de cobertura (75% linhas, 75% funcoes, 70% branches).
Onde ficam os arquivos de teste.

## Conexao com o Backend

URL da API, como as variaveis de ambiente configuram o endpoint, revalidacao ISR.

## Deploy

Como e feito o deploy na Vercel.
```

### 4.5 Documentacao de componentes (COMPONENTS.md)

Crie `COMPONENTS.md` na raiz do projeto documentando cada componente de `src/components/ui/`:

Para cada componente:

```
### Button

Botao padrao do design system. Disponivel em quatro variantes e dois tamanhos.

Props:

| Prop      | Tipo                                          | Obrigatorio | Default    | Descricao                        |
|-----------|-----------------------------------------------|-------------|------------|----------------------------------|
| variant   | 'primary' or 'secondary' or 'ghost' or 'dark' | nao         | 'primary'  | Define a aparencia visual        |
| size      | 'sm' or 'md' or 'lg'                          | nao         | 'md'       | Define o tamanho                 |
| disabled  | boolean                                       | nao         | false      | Desabilita a interacao           |
| className | string                                        | nao         | undefined  | Classes adicionais do Tailwind   |
| children  | React.ReactNode                               | sim         | -          | Conteudo interno do botao        |

Uso:

  <Button variant="primary">Fale com um especialista</Button>
  <Button variant="secondary" disabled>Indisponivel</Button>

Notas:
- Sempre usar variant="primary" para o CTA principal de cada secao
- Nunca usar mais de um botao primario visivel simultaneamente por secao
- Em secoes dark, usar variant="dark" ao inves de "secondary"
```

---

## RELATORIO FINAL

Ao concluir todas as fases, gere um relatorio final consolidado com as seguintes secoes:

**1. Resumo Executivo**
Quantidade de inconsistencias encontradas e corrigidas por categoria. Cobertura de testes atingida. Arquivos documentados.

**2. Inconsistencias Corrigidas**
Lista completa com arquivo, linha, problema original e correcao aplicada.

**3. Testes Implementados**
Lista de todos os arquivos de teste criados com a quantidade de casos por arquivo e a cobertura resultante.

**4. Pendencias**
O que nao foi possivel corrigir automaticamente e requer decisao humana. Justificativa para cada item.

**5. Recomendacoes**
Sugestoes de melhoria que estao fora do escopo desta revisao mas valem considerar no futuro.

---

## Restricoes

- Nao altere logica de negocio, comportamento de animacoes ou estrutura de rotas
- Nao instale dependencias novas alem das listadas na Fase 3.1
- Nao modifique arquivos de teste existentes — apenas crie novos
- Nao use emojis em nenhuma documentacao gerada
- Pare entre cada fase e apresente o relatorio parcial antes de avancar
- Se encontrar algo ambiguo, descreva o problema e peca orientacao ao inves de decidir sozinho
EOF