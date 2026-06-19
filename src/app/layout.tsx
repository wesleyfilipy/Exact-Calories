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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
        <Script src="https://fast.wistia.com/embed/e0md5zus5a.js" strategy="afterInteractive" type="module" />
        {/* Meta Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1030362109358006');
          fbq('track','PageView');
        `}} />
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
