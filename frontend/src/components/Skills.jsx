import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { getSkillIcon } from '../utils/skillIcons';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setLoading(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = ['Frontend', 'Backend', 'Database', 'AI', 'Tools'];

  if (loading) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            hidden: { opacity: 0, y: 50 },
          }}
        >
          <motion.h2
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
            className="text-4xl lg:text-5xl font-bold text-center mb-4"
          >
            <span className="gradient-text">Technical Skills</span>
          </motion.h2>
          <motion.p
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          >
            Technologies and tools I work with
          </motion.p>

          <div className="space-y-12">
            {categories.map((category) => (
              groupedSkills[category] && groupedSkills[category].length > 0 && (
                <motion.div
                  key={category}
                  variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">{category}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {groupedSkills[category].map((skill, index) => (
                      <motion.div
                        key={skill._id}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                      >
                        <div className="flex justify-between items-center mb-2 gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            {(() => {
                              const { icon: SkillIcon, color } = getSkillIcon(skill.name);
                              return (
                                <span className="p-2 rounded-lg glass-effect border border-white/10 flex-shrink-0">
                                  <SkillIcon size={22} style={{ color }} />
                                </span>
                              );
                            })()}
                            <span className="text-gray-200 font-medium truncate">{skill.name}</span>
                          </div>
                          <span className="text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
