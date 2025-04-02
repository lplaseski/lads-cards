import type { Metadata } from 'next';
import { Noto_Sans, Geist_Mono, Noto_Serif } from 'next/font/google';
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
  title: 'Love and Deepspace Memmory Chart',
  description: 'Look at all these pretty cards!',
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
      </body>
    </html>
  );
}
