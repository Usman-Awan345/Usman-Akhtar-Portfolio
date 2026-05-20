import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, Layout, Brain, ShoppingCart, Server, 
  CloudCog, Database, Shield, Smartphone 
} from 'lucide-react';

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const services = [
    {
      icon: Code2,
      title: 'Full Stack Development',
      description: 'End-to-end web application development using MERN stack with modern best practices.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Layout,
      title: 'Frontend Development',
      description: 'Responsive and interactive UIs with React, Next.js, and modern CSS frameworks.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Brain,
      title: 'AI Applications',
      description: 'Intelligent applications powered by GPT, LangChain, and vector databases.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Development',
      description: 'Feature-rich online stores with payment integration and inventory management.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Server,
      title: 'Backend APIs',
      description: 'Scalable RESTful APIs and microservices with Node.js and Express.',
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2
            variants={cardVariants}
            className="text-4xl lg:text-5xl font-bold text-center mb-4"
          >
            <span className="gradient-text">Services I Offer</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          >
            Comprehensive development solutions tailored to your business needs
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 rounded-2xl glass-effect hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;