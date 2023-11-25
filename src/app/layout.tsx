import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import './range-input.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blindtest Hero',
  description: 'Become the hero of your next blindtest!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
