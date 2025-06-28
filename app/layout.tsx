import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Motaz Darawsha',
  description: 'معتز دراوشة - مبرمج ومصمم.',
  metadataBase: new URL('https://motazdarawsha.vercel.app'),
  openGraph: {
    title: 'Motaz Darawsha',
    description: 'معتز دراوشة - مبرمج ومصمم.',
    url: 'https://motazdarawsha.vercel.app',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86_20250628_124606_%D9%A0%D9%A0%D9%A0%D9%A0-CtRS8eEvVjwJP98jFpC6etKkii93wi.png'
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
