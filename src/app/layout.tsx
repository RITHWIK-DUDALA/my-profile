import type { Metadata } from 'next';
import { Space_Grotesk, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/site';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import SmoothScrollProvider from '@/components/layout/SmoothScroll';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.supportingStatement,
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Autonomous Systems',
    'Robotics',
    'Deep Learning',
    'Portfolio',
    'Amrita Vishwa Vidyapeetham',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.supportingStatement,
    type: 'website',
    locale: 'en_US',
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.supportingStatement,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#E6D5BD] text-[#101010] selection:bg-[#D5360C] selection:text-[#F2E9DC]">
        <SmoothScrollProvider>
          <SiteHeader />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
