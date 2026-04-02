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

const BASE_URL = 'https://chronos-reconstruct.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Chronos.Alpha — AI Artifact Reconstruction Engine',
    template: '%s | Chronos.Alpha',
  },
  description:
    'Submit any artifact image and watch history reconstruct itself. Chronos uses AI vision, image generation, and experimental video synthesis to restore ancient objects with cinematic lore, photorealistic imagery, and temporal animation.',

  keywords: [
    'AI artifact reconstruction',
    'historical artifact restoration',
    'AI image generation',
    'artifact lore generator',
    'temporal reconstruction',
    'AI history tool',
    'Pollinations AI',
    'Flux image generation',
    'AI artifact analyzer',
    'ancient artifact identification',
    'museum quality AI',
    'AI powered archaeology',
    'artifact scanner',
    'AI historical analysis',
    'image to lore',
    'sci-fi AI tool',
    'grok video generation',
    'Gemini vision analysis',
    'chronos reconstruct',
    'time capsule generator',
  ],

  authors: [{ name: 'Chronos.Alpha' }],
  creator: 'Chronos.Alpha',
  publisher: 'Chronos.Alpha',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: "kC-kuA97R9ZCDpar9AAtq0--uVgzRJC1K5YDWPTMeEc",
  },

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Chronos.Alpha',
    title: 'Chronos.Alpha — AI Artifact Reconstruction Engine',
    description:
      'Submit any artifact image and watch history reconstruct itself. AI-generated lore, photorealistic imagery, and cinematic temporal animation — powered by Pollinations AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chronos.Alpha — Temporal Reconstruction Engine',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Chronos.Alpha — AI Artifact Reconstruction Engine',
    description:
      'Submit any artifact image and watch history reconstruct itself. AI lore, photorealistic imagery, and experimental video — powered by Pollinations AI.',
    images: ['/og-image.png'],
    creator: '@chronos_alpha',
  },

  manifest: '/manifest.json',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
