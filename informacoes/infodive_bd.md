# Infodive — Modelagem do Banco de Dados

> PostgreSQL via Neon — gerenciado pelo Payload CMS v3 com Drizzle ORM

---

## Visão Geral

| Tabela | Tipo | Descrição |
|---|---|---|
| `categorias` | Collection | As 9 áreas do portfólio |
| `fabricantes` | Collection | Parceiros e fabricantes |
| `produtos` | Collection | Catálogo completo de produtos |
| `servicos` | Collection | Serviços profissionais |
| `conteudos` | Collection | Materiais, artigos, posts |
| `leads` | Collection | Capturas de formulário |
| `banners` | Collection | Banners configuráveis por seção |
| `media` | Collection | Uploads de imagens e arquivos |
| `configuracoes` | Global | Dados globais do site |
| `users` | Collection | Usuários do admin (Payload built-in) |

> Tabelas de junção (many-to-many) são geradas automaticamente pelo Payload com sufixo `_rels`.

---

## Tabelas

---

### `categorias`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária (gerado pelo Payload) |
| `nome` | `varchar(100)` | ✓ | Ex: "Infraestrutura", "Segurança" |
| `slug` | `varchar(120)` | ✓ | URL-friendly, único. Ex: `infraestrutura` |
| `icone` | `varchar(50)` | | Nome do ícone (Tabler Icons) |
| `descricao_curta` | `varchar(300)` | | Aparece nos cards da home e hub |
| `descricao_completa` | `text` | | Corpo da página da solução |
| `banner_id` | `uuid` | | FK → `media.id` |
| `ordem` | `integer` | | Ordenação no grid |
| `ativo` | `boolean` | ✓ | Default: `true` |
| `created_at` | `timestamptz` | ✓ | Gerado automaticamente |
| `updated_at` | `timestamptz` | ✓ | Gerado automaticamente |

**Índices:** `slug` (unique)

---

### `fabricantes`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária |
| `nome` | `varchar(100)` | ✓ | Ex: "IBM", "Veeam" |
| `slug` | `varchar(120)` | ✓ | Ex: `ibm`, `veeam` |
| `logo_id` | `uuid` | ✓ | FK → `media.id` |
| `descricao` | `text` | | Texto da página do fabricante |
| `site_oficial` | `varchar(255)` | | URL do site do fabricante |
| `destaque` | `boolean` | ✓ | Aparece na home. Default: `false` |
| `ordem` | `integer` | | Ordenação no marquee/grid |
| `ativo` | `boolean` | ✓ | Default: `true` |
| `created_at` | `timestamptz` | ✓ | |
| `updated_at` | `timestamptz` | ✓ | |

**Índices:** `slug` (unique)

---

### `produtos`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária |
| `nome` | `varchar(150)` | ✓ | Ex: "IBM Guardium" |
| `slug` | `varchar(180)` | ✓ | Ex: `ibm-guardium` |
| `categoria_id` | `uuid` | ✓ | FK → `categorias.id` |
| `fabricante_id` | `uuid` | ✓ | FK → `fabricantes.id` |
| `subcategoria` | `varchar(100)` | | Ex: "Segurança de Dados" |
| `descricao_curta` | `varchar(400)` | ✓ | Aparece nos cards e topo da página |
| `descricao_completa` | `text` | | Tab "Visão Geral" |
| `casos_de_uso` | `text` | | Tab "Casos de Uso" |
| `diferenciais` | `text` | | Tab "Diferenciais" |
| `imagem_principal_id` | `uuid` | | FK → `media.id` |
| `destaque` | `boolean` | ✓ | Aparece na home. Default: `false` |
| `ativo` | `boolean` | ✓ | Default: `true` |
| `created_at` | `timestamptz` | ✓ | |
| `updated_at` | `timestamptz` | ✓ | |

**Índices:** `slug` (unique), `categoria_id`, `fabricante_id`, `destaque`

---

### `servicos`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária |
| `nome` | `varchar(100)` | ✓ | Ex: "Consultoria", "Migração" |
| `slug` | `varchar(120)` | ✓ | |
| `descricao` | `text` | ✓ | Descrição do serviço |
| `beneficios` | `text` | | Lista de benefícios |
| `icone` | `varchar(50)` | | Nome do ícone (Tabler Icons) |
| `ordem` | `integer` | | Ordenação na página |
| `ativo` | `boolean` | ✓ | Default: `true` |
| `created_at` | `timestamptz` | ✓ | |
| `updated_at` | `timestamptz` | ✓ | |

**Índices:** `slug` (unique)

---

### `conteudos`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária |
| `titulo` | `varchar(200)` | ✓ | |
| `slug` | `varchar(220)` | ✓ | |
| `tipo` | `enum` | ✓ | `whitepaper` `datasheet` `case` `infografico` `video` `artigo` |
| `origem` | `enum` | ✓ | `interno` `instagram` `linkedin` |
| `descricao` | `varchar(500)` | | Resumo / legenda |
| `conteudo` | `text` | | Corpo do artigo (se tipo = artigo) |
| `arquivo_id` | `uuid` | | FK → `media.id` (PDFs, vídeos) |
| `thumbnail_id` | `uuid` | | FK → `media.id` |
| `categoria_id` | `uuid` | | FK → `categorias.id` |
| `fabricante_id` | `uuid` | | FK → `fabricantes.id` |
| `produto_id` | `uuid` | | FK → `produtos.id` |
| `url_externa` | `varchar(500)` | | Link para post no Instagram/LinkedIn |
| `social_post_id` | `varchar(200)` | | ID do post na rede social (para deduplicação) |
| `publicado_em` | `timestamptz` | | Data de publicação original |
| `ativo` | `boolean` | ✓ | Default: `true` |
| `created_at` | `timestamptz` | ✓ | |
| `updated_at` | `timestamptz` | ✓ | |

**Índices:** `slug` (unique), `tipo`, `origem`, `categoria_id`, `fabricante_id`, `publicado_em`

---

### `leads`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária |
| `nome` | `varchar(150)` | ✓ | |
| `empresa` | `varchar(150)` | ✓ | |
| `email` | `varchar(254)` | ✓ | |
| `telefone` | `varchar(30)` | | |
| `cargo` | `varchar(100)` | | |
| `mensagem` | `text` | | |
| `area_interesse` | `varchar(150)` | | Texto livre ou slug da categoria |
| `produto_id` | `uuid` | | FK → `produtos.id` (se veio de página de produto) |
| `pagina_origem` | `varchar(500)` | ✓ | URL completa onde o form foi preenchido |
| `consentimento_lgpd` | `boolean` | ✓ | Obrigatório ser `true` |
| `status` | `enum` | ✓ | `novo` `em_contato` `qualificado` `convertido` `descartado` |
| `created_at` | `timestamptz` | ✓ | Data/hora do envio |
| `updated_at` | `timestamptz` | ✓ | |

**Índices:** `email`, `status`, `created_at`, `produto_id`

---

### `banners`

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `uuid` | ✓ | Chave primária |
| `titulo` | `varchar(200)` | ✓ | Texto do banner |
| `subtitulo` | `varchar(400)` | | |
| `secao` | `enum` | ✓ | `hero_home` `solucoes` `produtos` `fabricantes` `servicos` `conteudos` `sobre` |
| `imagem_id` | `uuid` | | FK → `media.id` |
| `cta_texto` | `varchar(80)` | | Texto do botão |
| `cta_url` | `varchar(500)` | | Destino do botão |
| `ativo` | `boolean` | ✓ | Default: `true` |
| `created_at` | `timestamptz` | ✓ | |
| `updated_at` | `timestamptz` | ✓ | |

---

### `media` (gerada pelo Payload)

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `uuid` | Chave primária |
| `filename` | `varchar(255)` | Nome do arquivo |
| `mime_type` | `varchar(100)` | Ex: `image/jpeg`, `application/pdf` |
| `filesize` | `integer` | Tamanho em bytes |
| `width` | `integer` | Largura (imagens) |
| `height` | `integer` | Altura (imagens) |
| `url` | `varchar(500)` | URL de acesso |
| `alt` | `varchar(300)` | Texto alternativo (SEO + acessibilidade) |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

> Storage: Vercel Blob ou Cloudflare R2 (não armazenar no servidor).

---

### `configuracoes` (Global)

Não é uma tabela de múltiplos registros — é um registro único editável no admin.

| Campo | Tipo | Descrição |
|---|---|---|
| `telefone` | `varchar(30)` | Telefone de contato |
| `email_contato` | `varchar(254)` | E-mail principal |
| `email_leads` | `varchar(254)` | E-mail que recebe notificações de leads |
| `endereco` | `varchar(300)` | Endereço físico |
| `linkedin_url` | `varchar(255)` | URL do LinkedIn |
| `instagram_url` | `varchar(255)` | URL do Instagram |
| `facebook_url` | `varchar(255)` | URL do Facebook |
| `instagram_token` | `text` | Token da API (longa duração, 60 dias) |
| `linkedin_token` | `text` | Token OAuth da API |
| `updated_at` | `timestamptz` | |

---

## Tabelas de Junção (Many-to-Many)

Geradas automaticamente pelo Payload com base nos campos `relationship`.

| Tabela | Relaciona |
|---|---|
| `produtos_rels` | produto ↔ serviços relacionados |
| `produtos_rels` | produto ↔ conteúdos relacionados |
| `fabricantes_rels` | fabricante ↔ categorias |
| `categorias_rels` | categoria ↔ serviços |
| `produtos_imagens` | produto ↔ galeria de imagens (media) |

---

## Diagrama de Relacionamentos

```
categorias ──────────────────────────── fabricantes
     │                                       │
     │ 1:N                              1:N  │
     ▼                                       ▼
  produtos ◄──────────────────────────────── /
     │
     ├── 1:N ──► serviços
     ├── 1:N ──► conteudos
     └── 1:N ──► leads

conteudos ──► categorias  (opcional)
conteudos ──► fabricantes (opcional)
conteudos ──► produtos    (opcional)

leads ──► produtos (opcional, se veio de página de produto)

banners ──► media
todos ──► media (imagens e arquivos)
```

---

## Enums

```sql
tipo_conteudo:   whitepaper | datasheet | case | infografico | video | artigo
origem_conteudo: interno | instagram | linkedin
status_lead:     novo | em_contato | qualificado | convertido | descartado
secao_banner:    hero_home | solucoes | produtos | fabricantes | servicos | conteudos | sobre
```

---

## Notas Importantes

**Payload e Drizzle ORM**
O Payload v3 usa Drizzle ORM para gerar e gerenciar o schema automaticamente a partir das collection configs em TypeScript. Não é necessário escrever SQL manualmente — as tabelas são criadas via `payload migrate`.

**Tokens das APIs sociais**
Os tokens do Instagram e LinkedIn ficam na tabela `configuracoes` e são editáveis pelo admin. O token do Instagram expira a cada 60 dias e precisa ser renovado via endpoint dedicado.

**Storage de arquivos**
Não usar disco local em produção. Configurar Vercel Blob (mais simples) ou Cloudflare R2 (mais barato em escala) como adapter de storage no Payload.

**LGPD**
O campo `consentimento_lgpd` em `leads` deve ser validado server-side — não confiar apenas no client. Leads sem `consentimento_lgpd = true` devem ser rejeitados na API.
