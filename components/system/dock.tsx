'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/tooltip';
import Image from 'next/image';

import Music from './MusicPlayer';
import Finder from './Finder'; 
import MailWindow from './mail/mailWindow';

import { useWindowContext } from '@/Context/windowContext';
import { siteConfig } from '@/config/site';

const dockMenu = siteConfig.dockMenu;

export default function Dock() {
  const { windows, setWindowState, addWindow, restoreWindow } =
    useWindowContext();

  const handleAppClick = (appId: string) => {
    const window = windows.find((w) => w.id === appId);

    if (window) {
      if (window.isMinimized) {
        restoreWindow(appId);
      } else {
        setWindowState(appId, { isVisible: true });
      }
    } else {
      switch (appId) {
        case 'Finder':
          addWindow(appId, <Finder />, 600, 400);
          break;
        case 'Mail':
          addWindow(appId, <MailWindow/>, 600, 400);
          break;
        case 'Music':
          addWindow(appId, <Music />, 600, 400);
          break;
        default:
          addWindow(appId, <div />,500,500);
          break;
      }
      // if(appId === 'Finder'){
      //   addWindow(appId,<Finder/>,600,400);
      //   <Finder/>
      // }
      
      // else
      //   addWindow(appId, <div />);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <motion.div
        animate={{ y: 0 }}
        className="flex items-end space-x-2 frosted-glass rounded-2xl p-2 shadow-lg"
        initial={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {dockMenu.map((app) => {
          const isMinimized = windows.some(
            (w) => w.id === app.id && w.isMinimized
          );

          return (
            <Tooltip
              key={app.name}
              className="mb-3"
              closeDelay={0}
              content={app.name}
              delay={0}
              placement="top"
            >
              <motion.div
                className="relative"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ y: -10 }}
                onClick={() => handleAppClick(app.id)}
              >
                <motion.div
                  className="w-12 h-12 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleAppClick(app.id)}
                >
                  <Image
                    alt={`${app.name} icon`}
                    className="w-full h-full object-cover"
                    height={48}
                    src={app.icon}
                    width={48}
                  />
                </motion.div>
                {isMinimized && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </motion.div>
            </Tooltip>
          );
        })}
      </motion.div>
    </div>
  );
}
