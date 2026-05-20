import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Save } from 'lucide-react';
import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter,
  FaFacebook as Facebook,
  FaInstagram as Instagram
} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const SocialManager = () => {
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    email: '',
    phone: '',
    twitter: '',
    facebook: '',
    instagram: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await axios.get('/api/social');
      const links = {};
      response.data.forEach(link => {
        links[link.platform.toLowerCase()] = link.url;
      });
      setSocialLinks(prev => ({ ...prev, ...links }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching social links:', error);
      toast.error('Failed to fetch social links');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      for (const [platform, url] of Object.entries(socialLinks)) {
        await axios.put(`/api/social/${platform}`, { platform, url: url.trim() });
      }
      toast.success('Social links updated successfully');
      fetchSocialLinks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update social links');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (platform, value) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const socialFields = [
    { platform: 'github', icon: Github, label: 'GitHub URL', placeholder: 'https://github.com/username' },
    { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/username' },
    { platform: 'email', icon: Mail, label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
    { platform: 'phone', icon: Phone, label: 'Phone Number', placeholder: '+92 300 1234567', type: 'tel' },
    { platform: 'twitter', icon: Twitter, label: 'Twitter URL', placeholder: 'https://twitter.com/username' },
    { platform: 'facebook', icon: Facebook, label: 'Facebook URL', placeholder: 'https://facebook.com/username' },
    { platform: 'instagram', icon: Instagram, label: 'Instagram URL', placeholder: 'https://instagram.com/username' },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Social Links</h2>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {socialFields.map((field) => (
          <div key={field.platform} className="p-6 rounded-xl glass-effect">
            <label className="flex items-center gap-3 text-white font-medium mb-3">
              <field.icon size={20} className="text-blue-400" />
              {field.label}
            </label>
            <input
              value={socialLinks[field.platform] || ''}
              onChange={(e) => handleChange(field.platform, e.target.value)}
              placeholder={field.placeholder}
              type={field.type || 'url'}
              className="w-full px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </motion.form>
  );
};

export default SocialManager;
