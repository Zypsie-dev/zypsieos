'use client';
import { useEffect, useState } from 'react';

import MacOSWindow from '@/components/system/MacOSWindow';
import { useWindowContext } from '@/Context/windowContext';
import WelcomeDialog from '@/components/welcome';
export default function Desktop() {
  const { windows,addWindow,removeWindow } = useWindowContext();
 const [firstTime, setFirstTime] = useState(localStorage.getItem('firstTime') === null);

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      setTimeout(() => {
       addWindow('Welcome',<WelcomeDialog onClose={()=>{removeWindow('Welcome')}}/> , 900,500);
      }, 3000);
      localStorage.setItem('firstTime', 'true');
    }
  }, [firstTime]);

  return (
    <>
      {windows.map((window) => (
        <MacOSWindow
          key={window.id}
          icon={window.icon}
          id={window.id}
          initialHeight={window.height as number || 500}
          initialWidth={window.width as number || 500}
          title={window.id}
        >
          {window.content}
        </MacOSWindow>
      ))}
    </>
  );
}


