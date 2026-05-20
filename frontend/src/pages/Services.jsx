import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Layout, Brain, ShoppingCart, Server, 
  CloudCog, Database, Shield, Smartphone, Rocket,
  CheckCircle, ArrowRight, Zap, Globe, Lock, BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
      setLoading(false);
    }
  };

  const defaultServices = [
    {
      title: 'Full Stack Development',
      description: 'End-to-end web application development using MERN stack with modern best practices, scalability, and performance optimization.',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      features: ['Responsive Design', 'RESTful APIs', 'Database Design', 'Authentication'],
      price: 'Custom',
    },
    {
      title: 'Frontend Development',
      description: 'Responsive and interactive UIs with React, Next.js, and modern CSS frameworks like Tailwind CSS.',
      icon: Layout,
      color: 'from-purple-500 to-pink-500',
      features: ['Component Library', 'State Management', 'Performance Optimization', 'SEO Friendly'],
      price: 'Custom',
    },
    {
      title: 'AI Applications',
      description: 'Intelligent applications powered by GPT, LangChain, vector databases, and custom AI models.',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      features: ['Chatbots', 'Content Generation', 'Data Analysis', 'Image Recognition'],
      price: 'Custom',
    },
    {
      title: 'E-commerce Development',
      description: 'Feature-rich online stores with payment integration, inventory management, and analytics.',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-500',
      features: ['Payment Gateway', 'Product Management', 'Order Tracking', 'Analytics Dashboard'],
      price: 'Custom',
    },
    {
      title: 'Backend APIs',
      description: 'Scalable RESTful APIs and microservices with Node.js, Express, and GraphQL.',
      icon: Server,
      color: 'from-yellow-500 to-amber-500',
      features: ['API Documentation', 'Rate Limiting', 'Caching', 'WebSocket Support'],
      price: 'Custom',
    },
    {
      title: 'Cloud Solutions',
      description: 'Cloud deployment, infrastructure management, and DevOps practices for optimal performance.',
      icon: CloudCog,
      color: 'from-indigo-500 to-blue-500',
      features: ['AWS/Azure', 'CI/CD Pipeline', 'Containerization', 'Monitoring'],
      price: 'Custom',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understanding your requirements and goals',
      icon: Globe,
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Creating detailed project roadmap and architecture',
      icon: BarChart,
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with regular updates',
      icon: Code2,
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Comprehensive QA and performance testing',
      icon: Shield,
    },
    {
      step: '05',
      title: 'Deployment',
      description: 'Smooth deployment and migration',
      icon: Rocket,
    },
    {
      step: '06',
      title: 'Maintenance',
      description: 'Ongoing support and updates',
      icon: Zap,
    },
  ];

  const technologies = [
    { name: 'React.js', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 92, category: 'Backend' },
    { name: 'MongoDB', level: 90, category: 'Database' },
    { name: 'Python', level: 85, category: 'AI' },
    { name: 'AWS', level: 80, category: 'Cloud' },
    { name: 'Docker', level: 75, category: 'DevOps' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const displayServices = services.length > 0 ? services : defaultServices;

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
              My <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 rounded-2xl glass-effect hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-1">{service.description}</p>
                  
                  {service.features && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs rounded-full glass-effect text-gray-300 flex items-center gap-1">
                            <CheckCircle size={10} /> {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <span className="text-2xl font-bold gradient-text">{service.price}</span>
                    <Link to="/contact">
                      <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/btn">
                        <span>Get Started</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              How I <span className="gradient-text">Work</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A streamlined process to deliver quality results efficiently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-xl glass-effect text-center group"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="mt-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-full h-full text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
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
              Technology <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Modern tools and technologies I specialize in
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl glass-effect"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{tech.name}</span>
                  <span className="text-blue-400">{tech.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and turn them into reality with cutting-edge technology solutions.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Get In Touch
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;