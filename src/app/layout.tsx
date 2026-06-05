import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { Navbar } from '@/layout/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SmoothScroll } from '@/components/smooth-scroll'
import '@/styles/globals.css'

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Infodive — Portal de Soluções de TI',
    template: '%s | Infodive',
  },
  description:
    'Soluções completas de TI para empresas que precisam de infraestrutura, segurança, proteção de dados, cloud e inteligência artificial.',
  metadataBase: new URL('https://infodive.com.br'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={ibmPlex.variable} style={{ backgroundColor: "#050507" }}>
      <body style={{ backgroundColor: "transparent" }}>
        <SmoothScroll />
        <ScrollToTop />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
