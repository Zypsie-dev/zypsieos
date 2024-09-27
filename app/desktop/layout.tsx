import { Providers } from '../providers';

import TopBar from '@/components/system/TopBar';
import Dock from '@/components/system/dock';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen overflow-hidden">
            <TopBar />
            <main className="container max-w-7xl flex-grow overflow-hidden">
              {children}
              <footer className="w-full flex items-center justify-center py-3">
                <Dock />
              </footer>
            </main>
          </div>
        </Providers>
  );
}
