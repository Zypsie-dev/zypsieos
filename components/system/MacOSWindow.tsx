'use client';

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
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => setIsOpening(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpening]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!win || !win.isVisible) return null;

  const handleMinimize = () => {
    if (isMobile) {
      minimizeWindow(id);
      return;
    }

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
    if (isMobile) return; // Do nothing on mobile

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
      bounds={isMobile ? 'window' : 'parent'}
      dragHandleClassName="window-header"
      minHeight={isMobile ? '100%' : initialHeight}
      minWidth={isMobile ? '100%' : initialWidth}
      position={isMobile ? { x: 0, y: 0 } : { x: win.x, y: win.y }}
      size={
        isMobile
          ? { width: '100%', height: '100%' }
          : { width: win.width, height: win.height }
      }
      style={{
        zIndex: safeZIndex,
      }}
      disableDragging={isMobile}
      enableResizing={!isMobile}
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
        className={`window-frame bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col ${
          isMobile ? 'fixed inset-0' : ''
        }`}
        style={{
          transition: isDragging
            ? 'none'
            : 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          transform: isOpening || isClosing ? 'scale(0.9)' : 'scale(1)',
          opacity: isOpening || isClosing ? 0 : 1,
        }}
      >
        <div className="window-header flex items-center p-2 bg-gray-700 macos-cursor">
          <div className="flex space-x-2 items-center">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 focus:outline-none"
              onClick={handleClose}
              aria-label="Close"
            />
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 focus:outline-none"
              onClick={handleMinimize}
              aria-label="Minimize"
            />
            <button
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200 focus:outline-none"
              onClick={handleMaximize}
              aria-label="Maximize"
            />
          </div>
          <div className="flex items-center justify-center absolute left-0 right-0 pointer-events-none">
            <img alt={title} className="w-5 h-5 mr-2" src={icon} />
            <h3 className="text-sm font-medium text-gray-200">{title}</h3>
          </div>
        </div>
        <div className="window-content flex-grow overflow-auto m-0 p-0">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
