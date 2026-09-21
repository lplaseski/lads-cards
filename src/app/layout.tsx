import type { Metadata } from 'next';
import { Noto_Sans, Geist_Mono, Noto_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/common/site';
import './globals.css';

const geistSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Love and Deepspace',
    'LADS',
    'memory cards',
    'memory chart',
    'card collection tracker',
    'Xavier',
    'Zayne',
    'Rafayel',
    'Sylus',
    'Caleb',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'en_US',
    images: [{ url: '/banner.jpg', alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/banner.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
