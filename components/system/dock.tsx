'use client';

import { motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/tooltip';
import Image from 'next/image';

import { siteConfig } from '@/config/site';
const dockMenu = siteConfig.dockMenu;

export default function Dock() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <motion.div
        animate={{ y: 0 }}
        className="flex items-end space-x-2 frosted-glass rounded-2xl p-2 shadow-lg"
        initial={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {dockMenu.map((app) => (
          <Tooltip
            key={app.name}
            className='mb-3'
            closeDelay={0}
            content={app.name}
            delay={0}
            placement="top"
          >
            <motion.div
              className="relative"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full overflow-hidden"
                whileHover={{ scale: 1.2 }}
              >
                <Image
                  alt={`${app.name} icon`}
                  className="w-full h-full object-cover"
                  height={48}
                  src={app.icon}
                  width={48}
                />
              </motion.div>
            </motion.div>
          </Tooltip>
        ))}
      </motion.div>
    </div>
  );
}
