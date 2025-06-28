import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'موقعي الحلو',
  description: 'فوت عادي مش حرام',
  generator: 'MotazDarawsha',
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
