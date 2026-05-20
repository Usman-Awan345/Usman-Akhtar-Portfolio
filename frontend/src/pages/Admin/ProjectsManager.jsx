import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: 'Web',
    techStack: [],
    features: [],
    githubLink: '',
    liveLink: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'techStack' || key === 'features') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, formDataToSend);
        toast.success('Project updated successfully');
      } else {
        await axios.post('/api/projects', formDataToSend);
        toast.success('Project created successfully');
      }
      fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      category: 'Web',
      techStack: [],
      features: [],
      githubLink: '',
      liveLink: '',
      featured: false,
    });
    setImageFile(null);
  };

  const categories = ['Web', 'AI', 'E-commerce'];

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project._id} className="p-6 rounded-xl glass-effect">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                      Featured
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs rounded-full glass-effect">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full glass-effect">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setFormData({
                      title: project.title,
                      description: project.description,
                      fullDescription: project.fullDescription,
                      category: project.category,
                      techStack: project.techStack,
                      features: project.features,
                      githubLink: project.githubLink || '',
                      liveLink: project.liveLink || '',
                      featured: project.featured,
                    });
                    setShowModal(true);
                  }}
                  className="p-2 rounded-lg hover:bg-blue-600/20 text-blue-400"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 rounded-lg hover:bg-red-600/20 text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl glass-effect p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                required
              />
              
              <textarea
                placeholder="Short Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                rows={2}
                required
              />
              
              <textarea
                placeholder="Full Description"
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                rows={4}
                required
              />
              
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                value={formData.techStack.join(', ')}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
              />
              
              <input
                type="text"
                placeholder="Features (comma separated)"
                value={formData.features.join(', ')}
                onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
              />
              
              <input
                type="url"
                placeholder="GitHub Link"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
              />
              
              <input
                type="url"
                placeholder="Live Demo Link"
                value={formData.liveLink}
                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
              />
              
              <input
                type="file"
                accept="image/*"
                required={!editingProject}
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
              />
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span className="text-gray-300">Featured Project</span>
              </label>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {editingProject ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg glass-effect text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsManager;
