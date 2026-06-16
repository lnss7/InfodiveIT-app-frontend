# Componentes de UI

Referência dos componentes em `src/components/ui/`. Todos aceitam `className` para
customização pontual e usam `cn()` para mesclar classes. Os exemplos de uso
assumem import a partir de `@/components/ui/<arquivo>`.

---

## Button

Botão padrão do design system. Renderiza um `motion.button` (Framer Motion) com
micro-interação de salto/escala no hover.

| Prop | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'dark' | não | 'primary' | Aparência visual |
| size | 'sm' \| 'md' \| 'lg' | não | 'md' | Tamanho |
| disabled | boolean | não | false | Desabilita a interação |
| className | string | não | undefined | Classes adicionais |
| children | React.ReactNode | sim | - | Conteúdo do botão |

Uso:

    <Button variant="primary">Fale com um especialista</Button>
    <Button variant="secondary" className="w-full">Ver catálogo</Button>

Notas:
- Use `variant="primary"` para o CTA principal de cada seção; no máximo um por seção.
- Em seções dark, prefira `variant="secondary"` ou `variant="dark"`.

---

## Badge

Selo curto de categoria/subcategoria (estilo shadcn).

| Prop | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| variant | 'default' \| 'brand' \| 'secondary' \| 'outline' | não | 'default' | Aparência do selo |
| className | string | não | undefined | Classes adicionais |
| ...span | React.HTMLAttributes\<HTMLSpanElement\> | não | - | Atributos de `<span>` |

Uso:

    <Badge variant="brand">Segurança</Badge>

---

## CardContent

Área de conteúdo de um card. Aplica o padding padrão `p-6 pt-0`.

| Prop | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| className | string | não | undefined | Classes adicionais |
| children | React.ReactNode | sim | - | Conteúdo interno |
| ...div | React.HTMLAttributes\<HTMLDivElement\> | não | - | Atributos de `<div>` (ref encaminhada) |

Uso:

    <CardContent className="flex flex-col gap-2">...</CardContent>

---

## SelectField

Select acessível e customizado (sem `<select>` nativo). O painel é renderizado via
portal e reposiciona-se em scroll/resize.

| Prop | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| value | string | sim | - | Valor selecionado (controlado) |
| onChange | (value: string) => void | sim | - | Callback com o valor escolhido |
| options | { value: string; label: string }[] | sim | - | Opções disponíveis |
| placeholder | string | não | 'Selecione' | Texto sem valor |
| disabled | boolean | não | false | Desabilita a abertura |
| invalid | boolean | não | false | Estilo de erro + `aria-invalid` |
| ariaLabel | string | não | undefined | Rótulo acessível do gatilho |
| className | string | não | undefined | Classes do wrapper |

Uso:

    <SelectField value={fab} onChange={setFab} options={opcoes} placeholder="Fabricante" />

---

## Tabs

Conjunto de abas (estilo shadcn, sem Radix). Composto por `Tabs`, `TabsList`,
`TabsTrigger` e `TabsContent`. Controlado ou não-controlado.

| Prop (Tabs) | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| defaultValue | string | não | '' | Aba ativa inicial (não-controlado) |
| value | string | não | undefined | Aba ativa (controlado) |
| onValueChange | (value: string) => void | não | undefined | Callback ao trocar de aba |
| className | string | não | undefined | Classes do wrapper |
| children | React.ReactNode | sim | - | `TabsList` + `TabsContent` |

`TabsTrigger` recebe `value: string` (obrigatório); `TabsContent` recebe
`value: string` e só renderiza quando é a aba ativa.

Uso:

    <Tabs defaultValue="visao">
      <TabsList>
        <TabsTrigger value="visao">Visão geral</TabsTrigger>
        <TabsTrigger value="specs">Especificações</TabsTrigger>
      </TabsList>
      <TabsContent value="visao">...</TabsContent>
      <TabsContent value="specs">...</TabsContent>
    </Tabs>

Notas:
- Os subcomponentes lançam erro se usados fora de `<Tabs>`.

---

## Breadcrumb

Trilha de navegação composta. Subcomponentes: `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage` (página atual, não-clicável) e
`BreadcrumbSeparator`.

Cada subcomponente aceita `className` e os atributos do seu elemento HTML base
(`nav`, `ol`, `li`, `a`, `span`).

Uso:

    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Produtos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

---

## BentoGrid / BentoCard

Grade de bento (estilo Magic UI). `BentoGrid` é o container em grid; `BentoCard` é
cada card, com hover que revela o CTA.

| Prop (BentoCard) | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| name | string | sim | - | Título do card |
| className | string | sim | - | Classes, incl. span de colunas (ex.: `col-span-2`) |
| background | React.ReactNode | sim | - | Nó renderizado ao fundo |
| Icon | React.ElementType | sim | - | Componente de ícone |
| description | string | sim | - | Texto descritivo |
| href | string | sim | - | Destino do CTA |
| cta | string | sim | - | Rótulo do CTA |

Uso:

    <BentoGrid>
      <BentoCard name="Infraestrutura" className="col-span-2" background={<Bg />}
        Icon={Server} description="..." href="/solucoes/infra" cta="Saiba mais" />
    </BentoGrid>

---

## Marquee

Marquee horizontal infinito. Os filhos são duplicados internamente para o loop.

| Prop | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| reverse | boolean | não | false | Inverte a direção |
| pauseOnHover | boolean | não | false | Pausa no hover |
| duration | string | não | '80s' | Duração de uma volta |
| className | string | não | undefined | Classes do container |
| children | React.ReactNode | sim | - | Itens a rolar |

Uso:

    <Marquee pauseOnHover duration="60s">{logos}</Marquee>

---

## NumberTicker

Contador animado: ao entrar na viewport, conta de `startValue` até `value`.

| Prop | Tipo | Obrigatório | Default | Descrição |
|---|---|---|---|---|
| value | number | sim | - | Valor final |
| startValue | number | não | 0 | Valor inicial |
| direction | 'up' \| 'down' | não | 'up' | Sentido da contagem |
| delay | number | não | 0 | Atraso (s) antes de iniciar |
| decimalPlaces | number | não | 0 | Casas decimais |
| className | string | não | undefined | Classes do `<span>` |

Uso:

    <NumberTicker value={2003} />

---

## GlowBorder / GlowBorderOverlay / handleGlowMove

Brilho de borda que segue o cursor no hover.

- `handleGlowMove(e)`: handler de `onMouseMove` que grava `--glow-x`/`--glow-y` no
  elemento. Um único handler serve para N elementos.
- `GlowBorderOverlay`: o anel de brilho. Props: `glowColor` (default `#0E66FF`),
  `glowSize` (default 90), `className`. O pai precisa ser `group relative` e ter
  `onMouseMove={handleGlowMove}`.
- `GlowBorder`: botão que já embute overlay + handler.

Uso:

    <article className="group relative" onMouseMove={handleGlowMove}>
      <GlowBorderOverlay glowColor="#0E66FF" glowSize={240} />
    </article>

---

## Componentes de animação

Estes componentes são decorativos e excluídos da métrica de cobertura de testes.

### BorderBeam

Feixe de gradiente que percorre a borda do elemento pai (`relative` + `rounded-*`).
Props principais: `size` (50), `duration` (6s), `colorFrom` (`#0E66FF`),
`colorTo` (`#7aa9ff`), `reverse` (false), `borderWidth` (1.5).

### MagicCard

Card com borda/brilho que reage ao cursor. `mode="gradient"` (halo radial segue o
mouse) ou `mode="orb"` (esfera de luz desfocada). As props de brilho de cada modo
são exclusivas (união discriminada por `mode`).

### OrbitingCircles

Anel de ícones que orbitam um centro. Props: `radius` (120), `duration` (20s),
`speed` (1), `reverse` (false), `iconSize` (36), `path` (true), `pathColor`. O pai
precisa ser `relative flex items-center justify-center`.

### TextReveal

Frase revelada palavra por palavra conforme o scroll. Props: `text` (use `\n` para
quebra), `highlightLines` ([]), `highlightClassName` (`text-brand`), `trackHeight`
(`h-[200vh]`), `revealViewports` (1).

### TracingBeam

Fio vertical à esquerda do conteúdo cujo gradiente preenche conforme a rolagem.
Desktop-only. Props: `children`, `className`.
