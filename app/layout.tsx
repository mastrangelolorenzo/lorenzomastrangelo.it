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
