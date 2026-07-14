import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Soro Ghana — Rise Above. Get Paid What You're Worth.",
  description: "Ghana's marketplace connecting skilled Ghanaians with real opportunity. Find vetted professionals for any service — local or remote. French, Spanish, English speakers.",
  keywords: ['Ghana freelancers', 'Accra professionals', 'Ghana services marketplace', 'Ghanaian translators', 'French speakers Ghana'],
  openGraph: {
    title: "Soro Ghana — Rise Above. Get Paid What You're Worth.",
    description: 'Connect with verified Ghanaian professionals. Translators, fixers, tech experts, creatives.',
    siteName: 'Soro Ghana',
    locale: 'en_GH',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#E8A020',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
