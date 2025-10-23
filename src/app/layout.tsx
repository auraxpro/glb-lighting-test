import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GLB Lighting Test',
  description: 'Interactive lighting test for GLB models with real-time controls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
