import clsx from 'clsx';
import { Metadata } from 'next';

import { Providers } from './providers';

import '@/styles/globals.css';
import ventura from '@/public/ventura.jpg';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import TopBar from '@/components/system/TopBar';
import Dock  from '@/components/system/dock';

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
          'dark dark:text-secondary-50 min-h-screen font-sans bg-cover antialiased',
          fontSans.variable
        )}
        style={{ backgroundImage: `url(${ventura.src})` }}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen ">
            <TopBar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Dock/>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}



