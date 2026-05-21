import type { CollectionConfig } from 'payload'

export const Fabricantes: CollectionConfig = {
  slug: 'fabricantes',
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'slug', 'destaque', 'ativo'],
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'descricao',
      type: 'richText',
    },
    {
      name: 'site_oficial',
      type: 'text',
      admin: {
        description: 'URL completa (com https://)',
      },
    },
    {
      name: 'categorias',
      type: 'relationship',
      relationTo: 'categorias',
      hasMany: true,
      admin: {
        description: 'Em quais áreas do portfólio este fabricante atua',
      },
    },
    {
      name: 'destaque',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Aparece em destaque na home',
      },
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
