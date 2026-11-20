import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'Lorenzo Mastrangelo | Fullstack Developer',
  description:
    'Lorenzo Mastrangelo, sviluppatore di Pescara. Creo siti, gestionali e app per aziende e professionisti.',
  authors: [{ name: 'Lorenzo Mastrangelo' }],
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={archivo.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
