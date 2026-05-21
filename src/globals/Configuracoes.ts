import type { GlobalConfig } from 'payload'

export const Configuracoes: GlobalConfig = {
  slug: 'configuracoes',
  label: 'Configurações do Site',
  admin: {
    group: 'Sistema',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contato',
          fields: [
            { name: 'telefone', type: 'text' },
            { name: 'email_contato', type: 'email' },
            {
              name: 'email_leads',
              type: 'email',
              admin: { description: 'Recebe notificações de novos leads' },
            },
            { name: 'endereco', type: 'textarea' },
          ],
        },
        {
          label: 'Redes Sociais',
          fields: [
            { name: 'linkedin_url', type: 'text' },
            { name: 'instagram_url', type: 'text' },
            { name: 'facebook_url', type: 'text' },
          ],
        },
        {
          label: 'APIs Sociais',
          description: 'Tokens para puxar posts em /conteudos',
          fields: [
            {
              name: 'instagram_token',
              type: 'textarea',
              admin: {
                description: 'Token da Instagram Graph API (renovar a cada 60 dias)',
              },
            },
            {
              name: 'instagram_business_id',
              type: 'text',
              admin: { description: 'ID da conta Instagram Business' },
            },
            {
              name: 'linkedin_token',
              type: 'textarea',
              admin: { description: 'OAuth token da LinkedIn API' },
            },
            {
              name: 'linkedin_organization_id',
              type: 'text',
              admin: { description: 'ID da página empresarial no LinkedIn' },
            },
          ],
        },
      ],
    },
  ],
}
