'use client';

import { useEffect, useState } from 'react';
import { Image } from '@nextui-org/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

import { useWindowContext } from '@/Context/windowContext';


interface Project {
  name: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  position: string;
  company: string;
  period: string;
}

interface TechStack {
  name: string;
  icon: string;
}

export default function WelcomeContent() {
  const [activeTab, setActiveTab] = useState('about');

  const education: Education[] = [
    {
      degree: "Bachelor's degree in Computer Science",
      institution: 'College Of Applied Business',
      year: '2020-2024',
    },
    {
      degree: 'Plus 2, Physical Sciences',
      institution: 'Reliance International College',
      year: '',
    },
  ];

  const experience: Experience[] = [
    {
      position: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022-Present',
    },
    {
      position: 'Web Development Intern',
      company: 'StartUp Co.',
      period: 'Summer 2021',
    },
  ];

  const projects: Project[] = [
    {
      name: 'Coding battle',
      description:
        'Designed and developed a real-time coding battle platform using React.js, Node.js, Express, TypeScript, and WebSockets, facilitating real-time coding challenges.',
      tags: [
        'react',
        'express',
        'typescript',
        'socketio',
        'mongodb',
        'tailwindcss',
        'materialui',
      ],
      link: 'https://codynn.com/',
      image: '/projects/codynn-battle.png',
    },
    {
      name: 'HRM',
      description:
        'Developed HRM system using Next.js, React, Express, and MongoDB to streamline employee management, payroll, and HR workflows for organizations.',
      tags: [
        'typescript',
        'tailwindcss',
        'react',
        'nextjs',
        'express',
        'socketio',
        'mongodb',
      ],
      link: 'https://hrm.voidnepal.com.np/',
      image: '/projects/hrm.png',
    },
    {
      name: 'Codynn Blog',
      description:
        'Implemented graphql on existing blog platform to provide better performance and flexibility for the users.',
      tags: ['nodejs', 'tailwindcss', 'express', 'graphql', 'mongodb'],
      image: '/projects/blog.png',
    },
    {
      name: 'Wholesale management system',
      description:
        'Developed an Electron-based desktop application with a React.js frontend to streamline wholesale inventory management and order processing for a mobile and accessories retail shop.',
      tags: ['electron', 'react', 'sqlite'],
      link: 'https://github.com/Zypsie-dev/Management-system',
      image: '/projects/mg.png',
    },
  ];
  const techStack: TechStack[] = [
    {
      name: 'MongoDB',
      icon: 'mongodb',
    },
    {
      name: 'Express',
      icon: 'express',
    },
    {
      name: 'React',
      icon: 'react',
    },
    {
      name: 'Node.js',
      icon: 'nodejs',
    },
    {
      name: 'Next.js',
      icon: 'nextjs',
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
    },
    {
      name: 'GraphQL',
      icon: 'graphql',
    },
    {
      name: 'Tailwind CSS',
      icon: 'tailwindcss',
    },
    {
      name: 'Material-UI',
      icon: 'materialui',
    },
    {
      name: 'Electron',
      icon: 'electron',
    },
    {
      name: 'SQLite',
      icon: 'sqlite',
    },
  ];

  const About = {
    name: 'Nabin Shrestha',
    role: 'Full Stack Developer',
    description:
      'Hello! I``m a dynamic and resourceful computer science student with a passion for full-stack development. Skilled in crafting responsive front-end interfaces and building robust backend systems, I excel at creating end-to-end solutions. Leveraging modern technologies like Next.js, React, Node.js, and WebSockets, I strive to deliver seamless, real-time applications. My experience ranges from developing HR management systems to real-time coding battle platforms, and I am eager to bring my holistic understanding of full-stack development to innovative projects.',
    github: 'https://github.com/Zypsie-dev',
    linkedin: 'https://www.linkedin.com/in/zypsie/',
    gmail: 'nabinshrtz1@gmail.com',
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const [columns, setColumns] = useState(3);
  const { windows } = useWindowContext();
  const [isCompact, setIsCompact] = useState(false);

  const currentWindow = windows.find((w) => w.id === 'aboutMe');

  useEffect(() => {
    const updateLayout = () => {
      const width = currentWindow?.width;

      let parsedWidth = 0;

      if (typeof width === 'number') {
        parsedWidth = width;
      }
      if (typeof width === 'string') {
        if (width.includes('%')) {
          parsedWidth = parseInt(width.replace('%', ''));
          parsedWidth = (parsedWidth * window.innerWidth) / 100;
        } else {
          parsedWidth = parseInt(width.replace('px', ''));
        }
      }
      if (parsedWidth < 640) {
        setIsCompact(true);
        setColumns(1);
      } else {
        setIsCompact(parsedWidth < 768);
        setColumns(2);
      }
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    const windowElement = document.getElementById('aboutMe');

    if (windowElement) {
      resizeObserver.observe(windowElement);
    }

    return () => {
      if (windowElement) {
        resizeObserver.unobserve(windowElement);
      }
    };
  }, [currentWindow]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 overflow-hidden">
      <div className="flex p-2 bg-gray-800 rounded-lg m-4">
        {['about', 'projects'].map((tab) => (
          <motion.button
            key={tab}
            className={`flex-1 px-4 py-2 rounded-md ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            animate="visible"
            className="h-full"
            exit="hidden"
            initial="hidden"
            variants={tabVariants}
          >
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Image
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                    src="/me.JPG"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {About.name}
                    </h3>
                    <p className="text-blue-400">{About.role}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-300">{About.description}</p>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white flex items-center">
                    <GraduationCap className="mr-2" /> Education
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {education.map((edu, index) => (
                      <li key={index}>
                        {edu.degree}, {edu.institution}, {edu.year}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white flex items-center">
                    <Briefcase className="mr-2" /> Experience
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {experience.map((exp, index) => (
                      <li key={index}>
                        {exp.position}, {exp.company}, {exp.period}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {techStack.map((tech, index) => (
                      <TechIcon key={index} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4 pb-2">
                  <motion.a
                    className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                    href={About.github}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-600 transition-colors"
                    href={About.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    className="p-2 bg-red-700 text-white rounded-full hover:bg-red-600 transition-colors"
                    href={`mailto:${About.gmail}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={24} />
                  </motion.a>
                </div>
              </div>
            )}
            {activeTab === 'projects' && (
              <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-4`}>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg group h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      alt={project.name}
                      className="w-full h-48 object-cover"
                      src={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70 opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end min-h-fit">
                      <h4
                        className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold text-white mb-2 drop-shadow-lg`}
                      >
                        {project.name}
                      </h4>
                      <p
                        className={`${isCompact ? 'text-xs' : 'text-sm'} text-gray-100 mb-2 drop-shadow-md`}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Image
                            key={tagIndex}
                            alt={tag}
                            className={`w-10 h-10 object-cover ${tag === 'express' || tag === 'socketio' ? 'bg-gray-400' : ''} rounded-full`}
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tag}/${tag}-${tag === 'tailwincss' || tag === 'graphql' ? 'plain' : 'original'}.svg`}
                          />
                        ))}
                      </div>
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center text-primary-foreground hover:text-primary-foreground/90 font-semibold ${isCompact ? 'text-xs' : 'text-sm'}`}
                          whileHover={{ x: 5 }}
                        >
                          View Project{' '}
                          <ExternalLink
                            size={isCompact ? 12 : 14}
                            className="ml-1"
                          />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TechIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex flex-col items-center">
      <Image
        alt={name}
        className={`w-10 h-10 object-cover ${icon === 'express' || icon === 'socketio' ? 'bg-gray-400' : ''} rounded-full`}
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-${icon === 'tailwincss' || icon === 'graphql' ? 'plain' : 'original'}.svg`}
      />
      <span className="text-sm mt-1 text-gray-400">{name}</span>
    </div>
  );
}
