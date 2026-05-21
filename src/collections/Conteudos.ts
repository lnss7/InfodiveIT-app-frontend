import type { CollectionConfig } from 'payload'

export const Conteudos: CollectionConfig = {
  slug: 'conteudos',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'origem', 'publicado_em'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titulo',
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
      name: 'tipo',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Artigo', value: 'artigo' },
        { label: 'Whitepaper', value: 'whitepaper' },
        { label: 'Datasheet', value: 'datasheet' },
        { label: 'Case de Sucesso', value: 'case' },
        { label: 'Infográfico', value: 'infografico' },
        { label: 'Vídeo', value: 'video' },
      ],
    },
    {
      name: 'origem',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'interno',
      options: [
        { label: 'Interno (admin)', value: 'interno' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    {
      name: 'descricao',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'conteudo',
      type: 'richText',
      admin: {
        description: 'Corpo completo do artigo (apenas para tipo "Artigo")',
        condition: (data) => data.tipo === 'artigo',
      },
    },
    {
      name: 'arquivo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'PDF, vídeo ou outro arquivo para download',
        condition: (data) => ['whitepaper', 'datasheet', 'case', 'infografico', 'video'].includes(data.tipo),
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'url_externa',
      type: 'text',
      admin: {
        description: 'Link para post original (Instagram/LinkedIn)',
        condition: (data) => data.origem !== 'interno',
      },
    },
    {
      name: 'social_post_id',
      type: 'text',
      admin: {
        description: 'ID do post na rede (preenchido automaticamente pela API)',
        condition: (data) => data.origem !== 'interno',
      },
    },
    {
      name: 'categoria',
      type: 'relationship',
      relationTo: 'categorias',
    },
    {
      name: 'fabricante',
      type: 'relationship',
      relationTo: 'fabricantes',
    },
    {
      name: 'produto',
      type: 'relationship',
      relationTo: 'produtos',
    },
    {
      name: 'publicado_em',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'ativo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
