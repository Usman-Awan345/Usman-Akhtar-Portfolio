import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Database, Server, Layout, Brain, Cloud, 
  Shield, Zap, Award, Users, Briefcase, Calendar,
  CheckCircle, ExternalLink, Download
} from 'lucide-react';
import axios from 'axios';
import Footer from '../components/Footer';
import { resolveAssetUrl } from '../utils/assets';
import { getSkillIcon } from '../utils/skillIcons';
import { applyImageFallback, defaultProfileImage } from '../utils/imageFallbacks';

const About = () => {
  const [about, setAbout] = useState(null);

  const defaultAbout = {
    bio: `I'm Usman Akhtar, a dedicated software developer with a passion for creating 
                innovative web solutions. With over 5 years of experience in full-stack development 
                and AI integration, I've helped businesses transform their ideas into successful 
                digital products.`,
    experience: `My approach combines technical excellence with creative problem-solving. I believe 
                in writing clean, maintainable code and staying up-to-date with the latest industry 
                trends. When I'm not coding, I enjoy contributing to open-source projects and 
                mentoring aspiring developers.`,
    profileImage: defaultProfileImage,
    heroSubtitle: 'Get to know the developer behind the code - my journey, skills, and passion for creating innovative digital solutions.',
    stats: [
      { label: 'Started Coding', value: '2015' },
      { label: 'Certifications', value: '12+' },
      { label: 'Projects', value: '50+' },
      { label: 'Clients', value: '30+' },
    ],
  };

  const aboutData = about || defaultAbout;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const defaultSkills = {
    frontend: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'TypeScript', level: 85 },
    ],
    backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 92 },
      { name: 'Python', level: 80 },
      { name: 'GraphQL', level: 75 },
    ],
    database: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 82 },
      { name: 'Redis', level: 75 },
    ],
    ai: [
      { name: 'OpenAI GPT', level: 85 },
      { name: 'LangChain', level: 80 },
      { name: 'Vector DB', level: 78 },
      { name: 'Hugging Face', level: 75 },
    ],
  };

  const skills = Object.fromEntries(
    Object.entries(aboutData.skills || defaultSkills).map(([category, list]) => [
      category,
      (Array.isArray(list) ? list : []).map((skill) => ({
        ...skill,
        icon: getSkillIcon(skill.name).icon,
        iconColor: getSkillIcon(skill.name).color,
      })),
    ])
  );

  const defaultExperiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications and AI-powered solutions.',
      achievements: [
        'Built scalable MERN applications serving 100k+ users',
        'Implemented AI chatbots reducing customer support tickets by 40%',
        'Mentored junior developers and conducted code reviews',
      ],
    },
    {
      company: 'Digital Innovations Ltd.',
      position: 'MERN Stack Developer',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects.',
      achievements: [
        'Created 15+ custom web applications for clients',
        'Optimized database queries improving performance by 60%',
        'Integrated payment gateways and third-party APIs',
      ],
    },
    {
      company: 'Freelance',
      position: 'Web Developer',
      period: '2018 - 2020',
      description: 'Worked with various clients on web development projects.',
      achievements: [
        'Delivered 30+ successful projects to satisfied clients',
        'Built responsive websites with modern technologies',
        'Provided ongoing maintenance and support',
      ],
    },
  ];
  const experiences = aboutData.experiences?.length ? aboutData.experiences : defaultExperiences;

  const defaultEducation = [
    {
      degree: 'MS Computer Science',
      institution: 'University of Technology',
      year: '2020 - 2022',
      achievements: 'Specialized in Artificial Intelligence',
    },
    {
      degree: 'BS Computer Science',
      institution: 'National University',
      year: '2015 - 2019',
      achievements: 'CGPA: 3.8/4.0',
    },
  ];
  const education = aboutData.education?.length ? aboutData.education : defaultEducation;

  const defaultCertifications = [
    { name: 'MERN Stack Professional', issuer: 'Coursera', year: 2023 },
    { name: 'Generative AI with LLMs', issuer: 'DeepLearning.AI', year: 2023 },
    { name: 'Advanced React Patterns', issuer: 'Frontend Masters', year: 2022 },
  ];
  const certifications = aboutData.certifications?.length ? aboutData.certifications : defaultCertifications;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {aboutData.heroSubtitle || defaultAbout.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={resolveAssetUrl(aboutData.profileImage) || defaultAbout.profileImage}
                    alt="Usman Akhtar"
                    onError={(event) => {
                      applyImageFallback(event, defaultAbout.profileImage);
                    }}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Who Am I?</h2>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.bio}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.experience}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {(aboutData.stats || defaultAbout.stats).slice(0, 4).map((stat, index) => {
                  const icons = [Calendar, Award, Briefcase, Users];
                  const colors = ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-green-400'];
                  const StatIcon = icons[index % icons.length];

                  return (
                    <div key={stat.label} className="flex items-center gap-3">
                      <StatIcon className={colors[index % colors.length]} size={20} />
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-white font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I specialize in
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl glass-effect"
              >
                <h3 className="text-xl font-semibold text-white mb-6 capitalize">
                  {category}
                </h3>
                <div className="space-y-4">
                  {skillList.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon size={16} style={{ color: skill.iconColor }} />
                          <span className="text-gray-200">{skill.name}</span>
                        </div>
                        <span className="text-blue-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey and achievements
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl glass-effect hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full glass-effect text-sm text-gray-300">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="p-4 rounded-xl glass-effect">
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                    <p className="text-blue-400 text-sm mb-2">{edu.institution}</p>
                    <p className="text-gray-400 text-sm">{edu.year}</p>
                    <p className="text-gray-300 text-sm mt-2">{edu.achievements}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 rounded-xl glass-effect flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">{cert.name}</h3>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                    <span className="text-sm text-blue-400">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
