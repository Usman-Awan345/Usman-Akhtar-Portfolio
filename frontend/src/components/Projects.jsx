import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Filter, 
  Search, 
  Calendar, 
  Code, 
  Users, 
  Star, 
  ChevronRight,
  FolderGit2,
  Eye
} from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { resolveAssetUrl } from '../utils/assets';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', 'Web', 'AI', 'E-commerce'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'All' ? true : project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: projects.length,
    web: projects.filter(p => p.category === 'Web').length,
    ai: projects.filter(p => p.category === 'AI').length,
    ecommerce: projects.filter(p => p.category === 'E-commerce').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore my portfolio of web applications, AI solutions, and e-commerce platforms
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl glass-effect text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="p-4 rounded-xl glass-effect text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.web}</div>
            <div className="text-sm text-gray-400">Web Apps</div>
          </div>
          <div className="p-4 rounded-xl glass-effect text-center">
            <div className="text-2xl font-bold text-pink-400">{stats.ai}</div>
            <div className="text-sm text-gray-400">AI Solutions</div>
          </div>
          <div className="p-4 rounded-xl glass-effect text-center">
            <div className="text-2xl font-bold text-green-400">{stats.ecommerce}</div>
            <div className="text-sm text-gray-400">E-commerce</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'glass-effect text-gray-300 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600' : 'glass-effect'}`}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600' : 'glass-effect'}`}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="w-4 h-0.5 bg-current rounded"></div>
                  <div className="w-4 h-0.5 bg-current rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <FolderGit2 size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode + filter + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "space-y-6"
              }
            >
              {filteredProjects.map((project, index) => (
                viewMode === 'grid' ? (
                  <ProjectCard key={project._id} project={project} index={index} />
                ) : (
                  <ProjectListItem key={project._id} project={project} index={index} />
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative rounded-2xl overflow-hidden glass-effect h-full flex flex-col">
        <div className="relative overflow-hidden h-56">
          <img
            src={resolveAssetUrl(project.image) || 'https://via.placeholder.com/400x250?text=Project+Image'}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-gray-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <span className="px-2 py-1 text-xs rounded-full glass-effect">
              {project.category}
            </span>
          </div>
          
          <p className="text-gray-400 mb-4 line-clamp-2 flex-1">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-full glass-effect text-gray-300">
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full glass-effect text-gray-300">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
          
          <Link
            to={`/projects/${project._id}`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-auto group/link"
          >
            <span>View Details</span>
            <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectListItem = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-6 rounded-xl glass-effect hover:shadow-xl transition-all group"
    >
      <div className="flex flex-wrap gap-6 items-start">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <span className="px-2 py-1 text-xs rounded-full glass-effect">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                <Star size={12} /> Featured
              </span>
            )}
          </div>
          
          <p className="text-gray-400 mb-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.slice(0, 5).map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-full glass-effect text-gray-300 flex items-center gap-1">
                <Code size={10} /> {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm flex items-center gap-1"
              >
                <Github size={14} /> Source Code
              </a>
            )}
            <Link
              to={`/projects/${project._id}`}
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
            >
              Details <ChevronRight size={14} />
            </Link>
          </div>
        </div>
        
        <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={resolveAssetUrl(project.image) || 'https://via.placeholder.com/128?text=Project'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
