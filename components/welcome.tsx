import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Apple,
  Folder,
  Layout,
  Camera,
  Music,
  Terminal,
  Mail,
  Cpu,
  Globe,
  Shield,
} from 'lucide-react';

import Button from '@/components/system/MacButton';
import AboutMe from '@/components/aboutMeButton';
const features = [
  {
    icon:AboutMe,
    text:'About Me',
    description:'Learn more about me'
  },
  {
    icon: Folder,
    text: 'Functional file system',
  },
  {
    icon: Layout,
    text: 'Mac-like UI with window management',
    description: 'Familiar interface with intuitive window controls',
  },
  {
    icon: Camera,
    text: 'Photos app',
  },
  {
    icon: Music,
    text: 'Music player',
    description: 'Enjoy my favorite tunes with a built-in player',
  },
  {
    icon: Terminal,
    text: 'Working terminal with basic commands',
    description: 'Access powerful command-line tools',
  },
  {
    icon: Mail,
    text: 'Mail window for sending emails to me',
    description: 'You can send me an email from here',
  },
  {
    icon: Cpu,
    text: 'Efficient performance',
    description: 'Smooth and responsive user experience',
  },
  {
    icon: Globe,
    text: 'Web-based accessibility',
    description: 'Access desktop from any browser',
  },
  {
    icon: Shield,
    text: 'Secure environment',
  },
];

export default function WelcomeDialog({ onClose:onClose }:{onClose:()=>void}) {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-900 bg-opacity-50 backdrop-blur-md"
    >
      <Card className="w-full h-full mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="flex justify-center pt-4 pb-0">
          <motion.div variants={itemVariants}>
            <img src='/dragon.png' alt='Logo' className='w-32 h-32 mx-auto'/>
          </motion.div>
        </CardHeader>
        <CardBody className="flex flex-col items-center text-center overflow-hidden">
          <motion.h2
            variants={itemVariants}
            className="text-xl font-bold mb-2"
          >
            Welcome to Nabin`s Portfolio
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 mb-2">
            Explore the features of your new web-based Mac OS experience:
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-8"
            >
              {React.createElement(features[currentFeature].icon, {
                size: 64,
                className: 'text-blue-400 mb-4',
              })}
              <h3 className="text-xl font-semibold mb-2">
                {features[currentFeature].text}
              </h3>
              <p className="text-gray-400 max-w-xs">
                {features[currentFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </CardBody>
        <CardFooter className="flex justify-center gap-4 pb-8">
          <Button
            variant="flat"
            onPress={onClose}
            className="bg-gray-700 hover:bg-gray-600"
          >
            Close
          </Button>
          <Button onPress={onClose} className="bg-blue-600 hover:bg-blue-500">
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
