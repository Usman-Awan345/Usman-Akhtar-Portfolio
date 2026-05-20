import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Calendar, Code, Zap } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { resolveAssetUrl } from '../utils/assets';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl text-white mb-4">Project not found</h2>
        <button
          onClick={() => navigate('/projects')}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={resolveAssetUrl(project.image)}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-4"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {project.techStack?.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full glass-effect text-sm text-gray-200"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.fullDescription}</p>
            </motion.section>

            {project.features && project.features.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <Zap size={16} className="text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {project.images && project.images.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.images.map((img, index) => (
                    <img
                      key={index}
                      src={resolveAssetUrl(img)}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl glass-effect"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
                  >
                    <span className="text-blue-400">Live Demo</span>
                    <ExternalLink size={18} className="text-blue-400" />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                  >
                    <span className="text-gray-300">GitHub Repository</span>
                    <Github size={18} className="text-gray-300" />
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl glass-effect"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full glass-effect text-sm text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-xl glass-effect"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Category</h3>
              <span className="px-3 py-1 rounded-full glass-effect text-sm text-gray-200">
                {project.category}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
