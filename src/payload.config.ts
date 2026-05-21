import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categorias } from './collections/Categorias'
import { Fabricantes } from './collections/Fabricantes'
import { Produtos } from './collections/Produtos'
import { Servicos } from './collections/Servicos'
import { Conteudos } from './collections/Conteudos'
import { Leads } from './collections/Leads'
import { Banners } from './collections/Banners'

import { Configuracoes } from './globals/Configuracoes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'Infodive Admin',
      description: 'Portal de Soluções de TI',
    },
  },
  collections: [
    Users,
    Media,
    Categorias,
    Fabricantes,
    Produtos,
    Servicos,
    Conteudos,
    Leads,
    Banners,
  ],
  globals: [Configuracoes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
