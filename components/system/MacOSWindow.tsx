import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowContext } from '@/Context/windowContext';

export default function MacOSWindow({
  id,
  title,
  icon,
  initialWidth,
  initialHeight,
  children,
}: {
  id: string;
  title: string;
  icon: string;
  initialWidth: number;
  initialHeight: number;
  children: React.ReactNode;
}) {
  const {
    windows,
    setWindowState,
    removeWindow,
    bringToFront,
    minimizeWindow,
  } = useWindowContext();
  const win = windows.find((w) => w.id === id);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => setIsOpening(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpening]);

  if (!win || !win.isVisible) return null;

  const handleMinimize = () => {
    setIsMinimizing(true);
    const windowElement = windowRef.current;

    if (windowElement) {
      const rect = windowElement.getBoundingClientRect();
      const startX = rect.left;
      const startY = rect.top;
      const startWidth = rect.width;

      const endX = window.innerWidth / 2;
      const endY = window.innerHeight;

      windowElement.style.transition =
        'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      windowElement.style.transform = `
        translate(${endX - startX - startWidth / 2}px, ${endY - startY}px)
        scale(0.1)
      `;
      windowElement.style.opacity = '0';
    }

    setTimeout(() => {
      minimizeWindow(id);
      setIsMinimizing(false);
      if (windowElement) {
        windowElement.style.transition = '';
        windowElement.style.transform = '';
        windowElement.style.opacity = '';
      }
    }, 500);
  };

  const handleMaximize = () => {
    if (win.isMaximized) {
      setWindowState(id, {
        isMaximized: false,
        width: win.previousSize?.width || initialWidth,
        height: win.previousSize?.height || initialHeight,
        x: win.previousPosition?.x || 0,
        y: win.previousPosition?.y || 0,
      });
    } else {
      setWindowState(id, {
        isMaximized: true,
        previousSize: {
          width: win.width as number,
          height: win.height as number,
        },
        previousPosition: { x: win.x || 40, y: win.y || 90 },
        width: '100%',
        height: '95.5%',
        x: 0,
        y: 0,
      });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      removeWindow(id);
    }, 300);
  };

  const safeZIndex =
    typeof win.zIndex === 'number' && isFinite(win.zIndex) ? win.zIndex : 9999;

  return (
    <Rnd
      bounds="parent"
      dragHandleClassName="window-header"
      minHeight={initialHeight}
      minWidth={initialWidth}
      position={{ x: win.x, y: win.y }}
      size={{ width: win.width, height: win.height }}
      style={{
        zIndex: safeZIndex,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragStop={(e, d) => {
        setIsDragging(false);
        setWindowState(id, { x: d.x, y: d.y });
      }}
      onMouseDown={() => bringToFront(id)}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWindowState(id, {
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
    >
      <div
        ref={windowRef}
        className="window-frame bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
        style={{
          transition: isDragging
            ? 'none'
            : 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          transform: isOpening || isClosing ? 'scale(0.9)' : 'scale(1)',
          opacity: isOpening || isClosing ? 0 : 1,
        }}
      >
        <div className="window-header flex items-center justify-between p-2 bg-gray-700 macos-cursor">
          <div className="flex space-x-2">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:macos-hand"
              onClick={handleClose}
            />
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 macos-hand"
              onClick={handleMinimize}
            />
            <button
              className="w-3 h-3 rounded-full bg-green-500 macos-hand"
              onClick={handleMaximize}
            />
          </div>
          <div className="flex items-center justify-center absolute left-0 right-0 pointer-events-none">
            <img alt={title} className="w-5 h-5 mr-2" src={icon} />
            <h3 className="text-sm font-medium text-gray-200">{title}</h3>
          </div>
          <div className="w-[70px]" aria-hidden="true" />
        </div>
        <div className="window-content flex-grow overflow-auto m-0 p-0">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
