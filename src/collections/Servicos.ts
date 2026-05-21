import type { CollectionConfig } from 'payload'

export const Servicos: CollectionConfig = {
  slug: 'servicos',
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
        description: 'Ex: "Consultoria", "Migração", "Implantação"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'icone',
      type: 'text',
      admin: {
        description: 'Nome do ícone Tabler',
      },
    },
    {
      name: 'descricao',
      type: 'richText',
      required: true,
    },
    {
      name: 'beneficios',
      type: 'array',
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
