import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Suchama AI',
  description: 'Your production planning assistant - Simplifying Manufacturing Supply Chain Planning & Scheduling Operations',
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/favicon.jpeg',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon.jpeg',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/favicon.jpeg',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/favicon.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.jpeg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.jpeg" />
        <link rel="shortcut icon" href="/favicon.jpeg" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
