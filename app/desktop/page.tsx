'use client';
import MacOSWindow from '@/components/system/MacOSWindow';
import { useWindowContext } from '@/Context/windowContext';

export default function Desktop() {
  const { windows } = useWindowContext();

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
    // <div className="p-4">
    //   {windows.some((w) => w.id === 'mail-window') && (
    //     <MacOSWindow id='mail-window' title="Mail">
    //       <div className="p-4">
    //         <h1 className="text-2xl font-bold">Mail App</h1>
    //         <p>Welcome to your Mail app!</p>
    //       </div>
    //     </MacOSWindow>
    //   )}

    //   {windows.some((w) => w.id === 'home-window') && (
    //     <MacOSWindow id="home-window" title="Other App">
    //       <div className="p-4">
    //         <h1 className="text-2xl font-bold">Other App</h1>
    //         <p>This is another app window.</p>
    //       </div>
    //     </MacOSWindow>
    //   )}
    // </div>
  );
}


