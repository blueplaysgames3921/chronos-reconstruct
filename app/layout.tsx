import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LabBackground } from '@/components/LabBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Chronos',
  description: 'AI-Driven Historical Reconstruction',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} scanline bg-void`}>
        <LabBackground />
        {children}
      </body>
    </html>
  );
}
