import { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import './range-input.css';

export const metadata: Metadata = {
  title: 'Blindtest Hero',
  description: 'Become the hero of your next blindtest!',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

type RootLayoutProps = {
  children: ReactNode;
};
