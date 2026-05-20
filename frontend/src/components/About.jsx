import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Cloud, Shield, Zap, Server, Layout, Brain } from 'lucide-react';
import axios from 'axios';
import { resolveApiUrl, resolveAssetUrl } from '../utils/assets';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [about, setAbout] = useState(null);

  const defaultAbout = {
    bio: `A passionate MERN Stack and Generative AI Developer with over 5 years of experience 
                in building robust web applications and AI-powered solutions. I specialize in creating 
                scalable, performant, and user-friendly applications that solve real-world problems.`,
    experience: `My journey in tech started with a fascination for how things work on the internet. 
                Since then, I've worked with startups and established companies, delivering 
                high-quality projects across various industries including e-commerce, education, 
                and healthcare technology.`,
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop',
    resumeLink: '',
    stats: [
      { label: 'Years Experience', value: '5+' },
      { label: 'Projects Completed', value: '50+' },
      { label: 'Happy Clients', value: '30+' },
      { label: 'Technologies', value: '10+' },
    ],
    skills: {
      frontend: [
        { name: 'React.js', level: 95 },
        { name: 'Tailwind CSS', level: 92 },
      ],
      backend: [
        { name: 'Node.js', level: 90 },
        { name: 'MongoDB', level: 88 },
      ],
      ai: [
        { name: 'Generative AI', level: 85 },
        { name: 'OpenAI GPT', level: 85 },
      ],
    },
  };

  const aboutData = about || defaultAbout;

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get('/api/about');
        setAbout(response.data);
      } catch (error) {
        console.error('Error fetching about:', error);
      }
    };

    fetchAbout();
  }, []);

  const skillColors = [
    'from-cyan-400 to-blue-500',
    'from-green-400 to-emerald-500',
    'from-green-500 to-teal-500',
    'from-blue-400 to-indigo-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-rose-500',
    'from-indigo-400 to-purple-500',
  ];
  const skillIcons = [Code, Server, Database, Layout, Brain, Globe, Shield, Zap];
  const skills = Object.values(aboutData.skills || {})
    .flatMap((list) => Array.isArray(list) ? list : [])
    .slice(0, 8)
    .map((skill, index) => ({
      ...skill,
      icon: skillIcons[index % skillIcons.length],
      color: skillColors[index % skillColors.length],
    }));

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            hidden: { opacity: 0, y: 50 }
          }}
        >
          <motion.h2
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
            className="text-4xl lg:text-5xl font-bold text-center mb-4"
          >
            <span className="gradient-text">About Me</span>
          </motion.h2>
          <motion.p
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          >
            Get to know me better and discover my journey in tech
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -50 } }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden glass-effect">
                  <img
                    src={resolveAssetUrl(aboutData.profileImage) || defaultAbout.profileImage}
                    alt="Usman Akhtar"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(aboutData.stats || defaultAbout.stats).slice(0, 4).map((stat, index) => (
                  <div key={stat.label} className="p-4 rounded-xl glass-effect text-center">
                    <h4 className={['text-2xl font-bold text-blue-400', 'text-2xl font-bold text-purple-400', 'text-2xl font-bold text-pink-400', 'text-2xl font-bold text-cyan-400'][index]}>
                      {stat.value}
                    </h4>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 50 } }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">
                I'm Usman Akhtar
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.bio}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.experience}
              </p>
              
              <div className="pt-4">
                <h4 className="text-lg font-semibold text-white mb-4">Core Competencies</h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg glass-effect hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-r ${skill.color} group-hover:scale-110 transition-transform`}>
                        <skill.icon size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-200">{skill.name}</span>
                          <span className="text-xs text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={aboutData.resumeLink || resolveApiUrl('/api/resume')}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
                >
                  Download Resume
                </a>
                <button className="px-6 py-2 rounded-lg glass-effect text-gray-300 hover:text-white transition-all">
                  Contact Me
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
