import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'empresa', 'email', 'pagina_origem', 'createdAt'],
    group: 'Comercial',
    description: 'Leads capturados pelos formulários. Apenas armazenamento — o tratamento comercial é feito em sistema externo.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
    },
    {
      name: 'empresa',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'telefone',
      type: 'text',
    },
    {
      name: 'cargo',
      type: 'text',
    },
    {
      name: 'mensagem',
      type: 'textarea',
    },
    {
      name: 'area_interesse',
      type: 'text',
      admin: {
        description: 'Área de interesse ou produto específico',
      },
    },
    {
      name: 'produto',
      type: 'relationship',
      relationTo: 'produtos',
      admin: {
        description: 'Preenchido quando o lead vem da página de um produto',
      },
    },
    {
      name: 'pagina_origem',
      type: 'text',
      required: true,
      admin: {
        description: 'URL completa onde o formulário foi preenchido',
      },
    },
    {
      name: 'consentimento_lgpd',
      type: 'checkbox',
      required: true,
      admin: {
        description: 'Sempre obrigatório',
      },
    },
  ],
}
