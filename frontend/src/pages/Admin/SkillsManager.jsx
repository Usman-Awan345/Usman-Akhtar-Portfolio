import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 50,
  });

  const categories = ['Frontend', 'Backend', 'Database', 'AI', 'Tools'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to fetch skills');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await axios.put(`/api/skills/${editingSkill._id}`, formData);
        toast.success('Skill updated successfully');
      } else {
        await axios.post('/api/skills', formData);
        toast.success('Skill created successfully');
      }
      fetchSkills();
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`/api/skills/${id}`);
        toast.success('Skill deleted successfully');
        fetchSkills();
      } catch (error) {
        toast.error('Failed to delete skill');
      }
    }
  };

  const resetForm = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      level: 50,
    });
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

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
        <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {categories.map(category => (
        groupedSkills[category] && groupedSkills[category].length > 0 && (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
            <div className="grid gap-4">
              {groupedSkills[category].map((skill) => (
                <div key={skill._id} className="p-4 rounded-xl glass-effect">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setFormData({
                            name: skill.name,
                            category: skill.category,
                            level: skill.level,
                          });
                          setShowModal(true);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-600/20 text-blue-400"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-2 rounded-lg hover:bg-red-600/20 text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

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
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Skill Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                required
              />
              
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <div>
                <label className="text-gray-300 block mb-2">Skill Level: {formData.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {editingSkill ? 'Update' : 'Create'}
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

export default SkillsManager;