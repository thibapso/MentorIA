import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'MentorIA',
  description: 'Com a MentorIA, você nunca estará sozinho em sua jornada de aprendizado.',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
