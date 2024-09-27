'use client';
import { useEffect, useState } from 'react';

import MacOSWindow from '@/components/system/MacOSWindow';
import { useWindowContext } from '@/Context/windowContext';
import WelcomeDialog from '@/components/welcome';

export default function Desktop() {
  const { windows, addWindow, removeWindow } = useWindowContext();
  const [firstTime, setFirstTime] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isFirstTime = localStorage.getItem('firstTime') === null;
    setFirstTime(isFirstTime);

    if (isFirstTime) {
      setTimeout(() => {
        addWindow(
          'welcome',
          <WelcomeDialog
            onClose={() => {
              removeWindow('welcome');
            }}
          />,
          900,
          500
        );
      }, 3000);
      localStorage.setItem('firstTime', 'true');
    }
  }, []);

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <>
      {windows.map((window) => (
        <MacOSWindow
          key={window.id}
          icon={window.icon}
          id={window.id}
          initialHeight={(window.height as number) || 500}
          initialWidth={(window.width as number) || 500}
          title={window.id}
        >
          {window.content}
        </MacOSWindow>
      ))}
    </>
  );
}
