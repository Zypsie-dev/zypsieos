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
  Download,
  MapPin,
  Calendar,
  Award,
  Code,
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
      company: 'Webstudio Nepal',
      period: 'Feb 2025 - Present',
    },
    {
      position: 'Backend Developer',
      company: 'Yuwasoft Tech Solutions Inc.',
      period: 'May 2024 - Jan 2025',
    },
    {
      position: 'Full stack',
      company: 'Codynn',
      period: 'March 2023 - Apr 2024',
    },
  ];

  const projects: Project[] = [
    {
      name: 'Restaurant Management System',
      description:
        'Comprehensive backend system for restaurant operations including billing, inventory management, order processing, and staff management. Features real-time order tracking, payment processing, and detailed analytics dashboard.',
      tags: [
        'backend',
        'nodejs',
        'express',
        'mongodb',
        'api',
        'billing',
        'inventory',
      ],
      link: 'https://akhabare.restaurantbilling.com/',
      image: '/projects/restaurant-management.png',
    },
    {
      name: 'Gold Management System',
      description:
        'Full-stack jewelry management platform with separate customer and admin portals. Features inventory tracking, price management, customer orders, and comprehensive reporting for gold and jewelry business operations.',
      tags: [
        'fullstack',
        'react',
        'nodejs',
        'mongodb',
        'inventory',
        'ecommerce',
        'admin-panel',
      ],
      link: 'https://barungems.webstudiomatrix.com/',
      image: '/projects/gold-management.png',
    },
    {
      name: 'Hotel Management System',
      description:
        'Complete hotel management solution with room booking, guest management, billing, housekeeping, and staff coordination. Includes real-time availability, payment processing, and comprehensive reporting features.',
      tags: [
        'fullstack',
        'react',
        'nodejs',
        'booking',
        'payment',
        'management',
        'hospitality',
      ],
      link: 'https://hotel.webstudiomatrix.com/',
      image: '/projects/hotel-management.png',
    },
    {
      name: 'Bhansamart E-commerce',
      description:
        'Full-featured e-commerce platform with product catalog, shopping cart, payment gateway integration, order management, and customer portal. Includes admin dashboard for inventory and order management.',
      tags: [
        'fullstack',
        'ecommerce',
        'react',
        'nodejs',
        'payment-gateway',
        'shopping-cart',
        'admin-panel',
      ],
      link: 'https://bhansamart.com/',
      image: '/projects/ecommerce.png',
    },
    {
      name: 'CTEVT College Management',
      description:
        'Educational institution management system for CTEVT colleges featuring student enrollment, course management, examination system, grade tracking, and administrative workflows for technical education.',
      tags: [
        'fullstack',
        'education',
        'student-management',
        'examination',
        'grades',
        'administration',
        'ctevt',
      ],
      link: 'https://kalika.ctevtnepal.com/',
      image: '/projects/college-management.png',
    },
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
    location: 'Nepal',
    description:
      "Hello! I'm a dynamic and resourceful computer science student with a passion for full-stack development. Skilled in crafting responsive front-end interfaces and building robust backend systems, I excel at creating end-to-end solutions. Leveraging modern technologies like Next.js, React, Node.js, and WebSockets, I strive to deliver seamless, real-time applications. My experience ranges from developing HR management systems to real-time coding battle platforms, and I am eager to bring my holistic understanding of full-stack development to innovative projects.",
    github: 'https://github.com/Zypsie-dev',
    linkedin: 'https://www.linkedin.com/in/zypsie/',
    gmail: 'nabinshrtz1@gmail.com',
    yearsOfExperience: '2+',
    projectsCompleted: '10+',
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
    <div className="flex flex-col h-full bg-white text-gray-900 overflow-hidden">

      {/* Tab navigation */}
      <div className="flex bg-gray-100 border-b border-gray-200">
        {[
          { id: 'about', label: 'About', icon: Briefcase },
          { id: 'projects', label: 'Projects', icon: Code },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto">
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
              <div className="p-6 space-y-8">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  <div className="flex-shrink-0">
                    <Image
                      alt="Profile"
                      className="w-32 h-32 rounded-2xl shadow-lg object-cover border-2 border-gray-200"
                      src="/me.JPG"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-3xl font-bold text-gray-900">
                        {About.name}
                      </h2>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Available for hire
                      </span>
                    </div>
                    <p className="text-xl text-blue-600 font-medium mb-3">
                      {About.role}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{About.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{About.yearsOfExperience} years experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award size={16} />
                        <span>
                          {About.projectsCompleted} projects completed
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {About.description}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    href={About.github}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    href={About.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </motion.a>
                  <motion.a
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    href={`mailto:${About.gmail}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </motion.a>
                </div>
                {/* Education & Experience Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Education */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                      <GraduationCap className="mr-2 text-blue-600" size={20} />
                      Education
                    </h3>
                    <div className="space-y-4">
                      {education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-500 pl-4"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                      <Briefcase className="mr-2 text-green-600" size={20} />
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-green-500 pl-4"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {exp.position}
                          </h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Tech Stack */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
                    <Code className="mr-2 text-purple-600" size={20} />
                    Tech Stack
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {techStack.map((tech, index) => (
                      <TechIcon key={index} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'projects' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-500"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Project Image with Enhanced Overlay */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={project.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                        {/* Floating Action Button */}
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-blue-600 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        )}

                        {/* Project Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Modern Tags with Icons */}
                        <div className="flex flex-wrap gap-2.5">
                          {project.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tagIndex}
                              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 rounded-xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Image
                                alt={tag}
                                className="w-4 h-4 object-cover rounded"
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tag}/${tag}-${tag === 'tailwindcss' || tag === 'graphql' ? 'plain' : 'original'}.svg`}
                              />
                              <span className="text-xs font-semibold text-gray-700 hover:text-blue-700 capitalize transition-colors duration-200">
                                {tag}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom Accent Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                      </div>
                    </motion.div>
                  ))}
                </div>
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
    <motion.div
      className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        alt={name}
        className={`w-8 h-8 object-cover ${icon === 'express' || icon === 'socketio' ? 'bg-gray-400 rounded' : ''}`}
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-${icon === 'tailwindcss' || icon === 'graphql' ? 'plain' : 'original'}.svg`}
      />
      <span className="text-xs mt-2 text-gray-700 font-medium text-center">
        {name}
      </span>
    </motion.div>
  );
}

