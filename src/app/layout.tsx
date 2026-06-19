import type { Metadata } from 'next';
import './globals.css';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import Script from 'next/script';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Exact Calories — Luxury Nutrition Tracking',
  description: 'Your personal calorie and nutrition tracker. Scan meals, track calories, reach your goals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
        <Script src="https://fast.wistia.com/embed/e0md5zus5a.js" strategy="afterInteractive" type="module" />
        <style dangerouslySetInnerHTML={{ __html: `
          wistia-player[media-id='e0md5zus5a']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/e0md5zus5a/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 177.78%;
          }
        `}} />
      </head>
      <body className={cn("min-h-screen bg-background font-body", ptSans.variable, playfair.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
