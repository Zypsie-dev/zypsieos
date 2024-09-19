import clsx from 'clsx';
import { Metadata } from 'next';

import '@/styles/globals.css';
import ventura from '@/public/ventura.jpg';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  icons: {
    icon: '/favicon.ico',
  },  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="macos-cursor" lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen font-sans bg-cover antialiased',
          fontSans.variable
        )}
        style={{ backgroundImage: `url(${ventura.src})` }}
      >
        {children}
      </body>
    </html>
  );
}



