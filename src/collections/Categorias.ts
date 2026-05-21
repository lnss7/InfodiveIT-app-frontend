import type { CollectionConfig } from 'payload'

export const Categorias: CollectionConfig = {
  slug: 'categorias',
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'slug', 'ordem', 'ativo'],
    group: 'Portfólio',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      admin: {
        description: 'Ex: "Infraestrutura", "Segurança"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL amigável (ex: "infraestrutura")',
      },
    },
    {
      name: 'icone',
      type: 'text',
      admin: {
        description: 'Nome do ícone Tabler (ex: "ti-server")',
      },
    },
    {
      name: 'descricao_curta',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Aparece nos cards da home e hub de soluções',
      },
    },
    {
      name: 'descricao_completa',
      type: 'richText',
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'problemas_resolvidos',
      type: 'array',
      labels: { singular: 'Problema', plural: 'Problemas' },
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'descricao', type: 'textarea' },
      ],
    },
    {
      name: 'ordem',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'ativo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
