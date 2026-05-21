# Infodive Redesign — Checklist do Projeto

> Última atualização: fase de planejamento

---

## Fase 0 — Planejamento e Definições

### Estratégia
- [x] Análise do briefing completo
- [x] Diagnóstico do site atual (infodive.com.br)
- [x] Definição do posicionamento: Portal de Soluções B2B Premium
- [x] Definição do nível visual: 1.5 — Enterprise com Presença

### Design Tokens
- [x] Extração das cores do site atual (CSS Peeper)
- [x] Extração da tipografia (IBM Plex Sans)
- [x] Consolidação e organização dos tokens (paleta + pesos)
- [ ] Exportar tokens como arquivo CSS/JS (`tokens.css` ou `design-tokens.ts`)

### Arquitetura
- [x] Mapa de páginas e rotas definido
- [x] Estrutura interna de cada página documentada
- [x] Integração social definida (Instagram + LinkedIn em /conteudos)
- [x] Formulário de contato movido para seção da Home (sem /contato separado)
- [x] Relações entre coleções do CMS mapeadas
- [ ] Sitemap visual (diagrama de navegação)

### Stack e Tecnologia
- [x] Stack principal definida (Next.js 14 + Payload v3 + Neon + Vercel)
- [x] Camada visual definida (GSAP + Lenis + React Three Fiber)
- [ ] Lista completa de dependências/bibliotecas npm
- [ ] Decisão sobre gerenciador de pacotes (npm / pnpm / yarn)

---

## Fase 1 — Design e Prototipagem

### Protótipos de Tela
- [ ] Protótipo da Home (prioridade — define o tom visual de tudo)
- [ ] Protótipo da página de Solução individual
- [ ] Protótipo do Catálogo de Produtos
- [ ] Protótipo da página de Produto individual
- [ ] Protótipo da página de Fabricante individual
- [ ] Protótipo do Hub de Conteúdos (/conteudos com abas sociais)
- [ ] Protótipo da página Sobre
- [ ] Protótipo do Admin (dashboard + CRUD de produtos)

### Sistema de Componentes
- [ ] Definição dos componentes base (Button, Card, Badge, Input, Select)
- [ ] Definição do Header (navegação + CTA fixo)
- [ ] Definição do Footer
- [ ] Componente de formulário de lead (reutilizável em várias páginas)
- [ ] Componente de card de produto
- [ ] Componente de card de fabricante
- [ ] Componente de card de conteúdo/post social
- [ ] Componente de marquee (strip de logos)

---

## Fase 2 — Setup do Ambiente

### Repositório e Projeto
- [ ] Criar repositório no GitHub
- [ ] Inicializar projeto Next.js 14 com TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Configurar Payload CMS v3 dentro do Next.js
- [ ] Instalar e configurar dependências de animação (GSAP, Lenis)
- [ ] Instalar e configurar React Three Fiber + Three.js
- [ ] Configurar IBM Plex Sans (Google Fonts ou self-hosted)
- [ ] Configurar variáveis de ambiente (.env.local)

### Banco de Dados
- [ ] Criar projeto no Neon (PostgreSQL)
- [ ] Conectar Payload ao banco Neon
- [ ] Rodar migrations iniciais

### Deploy
- [ ] Criar projeto no Vercel
- [ ] Conectar repositório GitHub ao Vercel
- [ ] Configurar variáveis de ambiente no Vercel
- [ ] Configurar domínio (infodive.com.br)
- [ ] Testar pipeline de CI/CD (push → deploy automático)

---

## Fase 3 — Desenvolvimento: CMS e Admin

### Coleções Payload (schemas)
- [ ] Collection: `categorias`
- [ ] Collection: `fabricantes`
- [ ] Collection: `produtos`
- [ ] Collection: `servicos`
- [ ] Collection: `conteudos`
- [ ] Collection: `leads`
- [ ] Collection: `banners`
- [ ] Global: `configuracoes` (dados do site: telefone, email, redes sociais)

### Admin
- [ ] Testar CRUD de categorias
- [ ] Testar CRUD de fabricantes
- [ ] Testar CRUD de produtos (com relacionamentos)
- [ ] Testar CRUD de conteúdos
- [ ] Testar captura de leads
- [ ] Cadastrar dados reais: categorias, fabricantes, produtos iniciais

---

## Fase 4 — Desenvolvimento: Frontend

### Layout Global
- [ ] Header com navegação + dropdown Soluções + CTA fixo
- [ ] Footer com links, redes sociais e LGPD
- [ ] Smooth scroll (Lenis)
- [ ] Transições de página (GSAP)

### Home `/`
- [ ] Seção 1: Hero com shader WebGL + headline + CTAs
- [ ] Seção 2: Números/credenciais com contador animado
- [ ] Seção 3: Grid de soluções com hover
- [ ] Seção 4: Produtos em destaque
- [ ] Seção 5: Marquee de fabricantes
- [ ] Seção 6: Problemas que resolvemos
- [ ] Seção 7: Serviços (resumo)
- [ ] Seção 8: Últimos conteúdos
- [ ] Seção 9: Formulário de contato + informações

### Soluções
- [ ] `/solucoes` — hub com grid de categorias
- [ ] `/solucoes/[slug]` — página individual (×9 categorias)

### Produtos
- [ ] `/produtos` — catálogo com busca e filtros
- [ ] `/produtos/[slug]` — página individual com tabs

### Fabricantes
- [ ] `/fabricantes` — grid de logos
- [ ] `/fabricantes/[slug]` — página individual

### Serviços
- [ ] `/servicos` — página completa

### Conteúdos
- [ ] `/conteudos` — hub com abas (Todos / Instagram / LinkedIn / Materiais)
- [ ] `/conteudos/[slug]` — material individual

### Sobre
- [ ] `/sobre` — página institucional

### Páginas de suporte
- [ ] `/politica-de-privacidade`
- [ ] Página 404 customizada

---

## Fase 5 — Integrações

### Formulários e Leads
- [ ] Integrar formulário da Home com collection `leads` do Payload
- [ ] Integrar formulários de produto com collection `leads`
- [ ] Captura automática de `pagina_origem`
- [ ] Notificação por e-mail ao receber novo lead (Resend ou Nodemailer)

### Redes Sociais (/conteudos)
- [ ] Configurar Instagram Basic Display API (token de longa duração)
- [ ] Configurar renovação automática do token Instagram (60 dias)
- [ ] Configurar LinkedIn API (OAuth 2.0 — página empresarial)
- [ ] Implementar revalidação periódica com Next.js ISR

### SEO
- [ ] `generateMetadata()` em todas as páginas dinâmicas
- [ ] `sitemap.xml` dinâmico
- [ ] `robots.txt`
- [ ] Open Graph tags (compartilhamento social)

---

## Fase 6 — Qualidade e Entrega

### Performance
- [ ] Lazy loading de imagens (next/image)
- [ ] Otimização de fontes (next/font)
- [ ] Verificar Core Web Vitals (LCP, CLS, FID)
- [ ] Teste de performance no Vercel Analytics

### Responsividade
- [ ] Testar em mobile (375px)
- [ ] Testar em tablet (768px)
- [ ] Testar em desktop (1280px+)
- [ ] Menu mobile (hamburguer)

### Segurança e LGPD
- [ ] HTTPS ativo
- [ ] Consentimento LGPD em todos os formulários
- [ ] Política de privacidade atualizada
- [ ] Rate limiting nos endpoints de formulário

### Revisão Final
- [ ] Conteúdo real inserido no admin (produtos, fabricantes, categorias)
- [ ] Revisar todos os links internos
- [ ] Testar fluxo completo de lead (home → produto → formulário → admin)
- [ ] Aprovação do cliente
- [ ] Go live
