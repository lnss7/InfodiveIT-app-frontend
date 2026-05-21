import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'secao', 'ativo'],
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
      name: 'subtitulo',
      type: 'textarea',
      maxLength: 400,
    },
    {
      name: 'secao',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero (Home)', value: 'hero_home' },
        { label: 'Soluções', value: 'solucoes' },
        { label: 'Produtos', value: 'produtos' },
        { label: 'Fabricantes', value: 'fabricantes' },
        { label: 'Serviços', value: 'servicos' },
        { label: 'Conteúdos', value: 'conteudos' },
        { label: 'Sobre', value: 'sobre' },
      ],
    },
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cta_texto',
      type: 'text',
      admin: { description: 'Texto do botão (ex: "Saiba mais")' },
    },
    {
      name: 'cta_url',
      type: 'text',
    },
    {
      name: 'ativo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
