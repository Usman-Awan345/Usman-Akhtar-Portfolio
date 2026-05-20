import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, Server, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { resolveAssetUrl } from '../utils/assets';

const Hero = () => {
  const defaultHero = {
    badgeText: 'Welcome to my portfolio',
    name: 'Usman Akhtar',
    titlePrefix: 'MERN Stack & ',
    highlightedTitle: 'Generative AI',
    titleSuffix: ' Developer',
    description: 'Building modern web applications and AI-powered platforms with cutting-edge technologies. Specialized in creating scalable, performant, and user-centric digital solutions.',
    primaryButtonText: 'View Projects',
    primaryButtonLink: '/projects',
    secondaryButtonText: 'Hire Me',
    secondaryButtonLink: '/contact',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'OpenAI', 'LangChain'],
    heroImage: 'https://ui-avatars.com/api/?name=Usman+Akhtar&background=3B82F6&color=fff&size=400&bold=true&length=2&font-size=0.33&rounded=true',
    experienceValue: '5+',
    experienceLabel: 'Years Exp',
    projectsValue: '50+',
    projectsLabel: 'Projects',
    scrollText: 'Scroll to explore',
  };
  const [hero, setHero] = useState(defaultHero);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get('/api/hero');
        setHero({ ...defaultHero, ...response.data });
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };

    fetchHero();
  }, []);

  const floatingShapes = [
    { x: '10%', y: '20%', size: 64, delay: 0, icon: Code },
    { x: '85%', y: '15%', size: 48, delay: 2, icon: Server },
    { x: '15%', y: '70%', size: 32, delay: 4, icon: Cpu },
    { x: '75%', y: '75%', size: 56, delay: 1, icon: Code },
    { x: '50%', y: '50%', size: 40, delay: 3, icon: Server },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating Shapes with Icons */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full glass-effect backdrop-blur-sm border border-white/10 p-3"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: shape.delay,
            ease: "linear",
          }}
        >
          <shape.icon className="w-full h-full text-blue-400 opacity-50" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full glass-effect mb-6 border border-white/10"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {hero.badgeText}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                {hero.name}
              </span>
              <br />
              <span className="text-gray-200">{hero.titlePrefix}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {hero.highlightedTitle}
              </span>
              <span className="text-gray-200">{hero.titleSuffix}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-lg"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={hero.primaryButtonLink || '/projects'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  {hero.primaryButtonText}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </motion.button>
              </Link>
              <Link to={hero.secondaryButtonLink || '/contact'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-3 rounded-full glass-effect border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  {hero.secondaryButtonText}
                  <Download className="group-hover:translate-y-1 transition-transform" size={18} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {(hero.techStack || []).map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full glass-effect border border-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -inset-4 rounded-full border border-blue-500/30 animate-ping"></div>
              <div className="absolute -inset-8 rounded-full border border-purple-500/20 animate-pulse"></div>
              
              {/* Profile Image Container */}
              <div className="relative rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="rounded-full overflow-hidden bg-gray-800 aspect-square">
                  <img
                    src={resolveAssetUrl(hero.heroImage) || defaultHero.heroImage}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{hero.experienceValue}</div>
                  <div className="text-xs text-white/80">{hero.experienceLabel}</div>
                </div>
              </motion.div>

              {/* Projects Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{hero.projectsValue}</div>
                  <div className="text-xs text-white/80">{hero.projectsLabel}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">{hero.scrollText}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default Hero;
