import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import LabBackground from '@/components/LabBackground';

const mono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Project Chronos',
  description: 'AI-Driven Historical Reconstruction',
};

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="font-mono antialiased">
        <LabBackground />
        {children}
      </body>
    </html>
  );
}
