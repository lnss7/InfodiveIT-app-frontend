import type { CollectionConfig } from 'payload'

export const Produtos: CollectionConfig = {
  slug: 'produtos',
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'categoria', 'fabricante', 'destaque', 'ativo'],
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
      name: 'categoria',
      type: 'relationship',
      relationTo: 'categorias',
      required: true,
      index: true,
    },
    {
      name: 'fabricante',
      type: 'relationship',
      relationTo: 'fabricantes',
      required: true,
      index: true,
    },
    {
      name: 'subcategoria',
      type: 'text',
      admin: {
        description: 'Ex: "Segurança de Dados", "Backup em Nuvem"',
      },
    },
    {
      name: 'descricao_curta',
      type: 'textarea',
      maxLength: 400,
      required: true,
      admin: {
        description: 'Aparece nos cards e no topo da página do produto',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Visão Geral',
          fields: [
            { name: 'descricao_completa', type: 'richText' },
            {
              name: 'beneficios',
              type: 'array',
              fields: [
                { name: 'titulo', type: 'text', required: true },
                { name: 'descricao', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Casos de Uso',
          fields: [
            { name: 'casos_de_uso', type: 'richText' },
          ],
        },
        {
          label: 'Diferenciais',
          fields: [
            { name: 'diferenciais', type: 'richText' },
          ],
        },
        {
          label: 'Materiais',
          fields: [
            {
              name: 'materiais',
              type: 'array',
              labels: { singular: 'Material', plural: 'Materiais' },
              fields: [
                { name: 'titulo', type: 'text', required: true },
                { name: 'arquivo', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'imagem_principal',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'galeria',
      type: 'array',
      labels: { singular: 'Imagem', plural: 'Galeria' },
      fields: [
        { name: 'imagem', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'servicos_relacionados',
      type: 'relationship',
      relationTo: 'servicos',
      hasMany: true,
    },
    {
      name: 'destaque',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Aparece em "Produtos em Destaque" na home',
      },
    },
    {
      name: 'ativo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
