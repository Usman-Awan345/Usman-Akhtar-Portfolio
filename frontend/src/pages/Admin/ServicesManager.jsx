import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`/api/services/${editingService._id}`, formData);
        toast.success('Service updated successfully');
      } else {
        await axios.post('/api/services', formData);
        toast.success('Service created successfully');
      }
      fetchServices();
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/${id}`);
        toast.success('Service deleted successfully');
        fetchServices();
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: '',
    });
  };

  const iconOptions = [
    'Code2', 'Layout', 'Brain', 'ShoppingCart', 'Server',
    'CloudCog', 'Database', 'Shield', 'Smartphone'
  ];

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
        <h2 className="text-2xl font-bold text-white">Manage Services</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="p-6 rounded-xl glass-effect">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                {/* Icon placeholder - you can map string to actual icon component */}
                <div className="w-6 h-6 bg-white/20 rounded"></div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingService(service);
                    setFormData({
                      title: service.title,
                      description: service.description,
                      icon: service.icon,
                    });
                    setShowModal(true);
                  }}
                  className="p-2 rounded-lg hover:bg-blue-600/20 text-blue-400"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="p-2 rounded-lg hover:bg-red-600/20 text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative w-full max-w-md rounded-xl glass-effect p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Service Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                required
              />
              
              <textarea
                placeholder="Service Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                rows={3}
                required
              />
              
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                required
              >
                <option value="">Select Icon</option>
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {editingService ? 'Update' : 'Create'}
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

export default ServicesManager;