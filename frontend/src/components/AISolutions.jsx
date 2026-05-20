import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Bot, FileSearch, Mic, Volume2, Network, 
  Cpu, BrainCircuit, Sparkles 
} from 'lucide-react';

const AISolutions = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const aiSolutions = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Intelligent conversational agents for customer support and engagement.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileSearch,
      title: 'Resume Analyzer',
      description: 'AI-powered resume parsing and candidate matching system.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Mic,
      title: 'Interview Assistant',
      description: 'Real-time interview coaching and feedback using AI.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Volume2,
      title: 'Voice AI Apps',
      description: 'Speech recognition and voice-controlled applications.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Network,
      title: 'RAG Systems',
      description: 'Retrieval-augmented generation for enhanced AI responses.',
      gradient: 'from-yellow-500 to-amber-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            hidden: { opacity: 0, y: 50 },
          }}
        >
          <motion.div
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
              <Sparkles size={20} className="text-purple-400" />
              <span className="text-sm font-medium text-purple-400">AI-Powered Solutions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Intelligent AI Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leveraging cutting-edge AI technologies to build intelligent applications that transform businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 group-hover:border-transparent transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <solution.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{solution.description}</p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISolutions;