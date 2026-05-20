import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { resolveAssetUrl } from '../../utils/assets';
import { applyImageFallback, defaultHeroImage } from '../../utils/imageFallbacks';

const HeroManager = () => {
  const [hero, setHero] = useState({
    badgeText: '',
    name: '',
    titlePrefix: '',
    highlightedTitle: '',
    titleSuffix: '',
    description: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    techStack: [],
    heroImage: '',
    experienceValue: '',
    experienceLabel: '',
    projectsValue: '',
    projectsLabel: '',
    scrollText: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const response = await axios.get('/api/hero');
      setHero(response.data);
    } catch (error) {
      console.error('Error fetching hero:', error);
      toast.error('Failed to fetch hero section');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setHero((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    Object.entries(hero).forEach(([key, value]) => {
      if (key === '_id' || key === '__v' || key === 'createdAt' || key === 'updatedAt') return;
      if (key === 'techStack') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value || '');
      }
    });

    if (imageFile) {
      formData.append('heroImage', imageFile);
    }

    try {
      await axios.put('/api/hero', formData);
      toast.success('Hero section updated successfully');
      setImageFile(null);
      fetchHero();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update hero section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Hero Section</h2>
        <button
          type="submit"
          form="hero-form"
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form id="hero-form" onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section className="p-6 rounded-xl glass-effect space-y-4">
            <h3 className="text-lg font-semibold text-white">Main Content</h3>
            <TextInput label="Badge Text" value={hero.badgeText} onChange={(value) => updateField('badgeText', value)} />
            <TextInput label="Name" value={hero.name} onChange={(value) => updateField('name', value)} />
            <TextInput label="Title Prefix" value={hero.titlePrefix} onChange={(value) => updateField('titlePrefix', value)} />
            <TextInput label="Highlighted Title" value={hero.highlightedTitle} onChange={(value) => updateField('highlightedTitle', value)} />
            <TextInput label="Title Suffix" value={hero.titleSuffix} onChange={(value) => updateField('titleSuffix', value)} />
            <label className="block">
              <span className="block text-white font-medium mb-2">Description</span>
              <textarea
                value={hero.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                rows={5}
                required
                className="w-full px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400 resize-none"
              />
            </label>
          </section>

          <section className="p-6 rounded-xl glass-effect space-y-4">
            <h3 className="text-lg font-semibold text-white">Buttons</h3>
            <TextInput label="Primary Button Text" value={hero.primaryButtonText} onChange={(value) => updateField('primaryButtonText', value)} />
            <TextInput label="Primary Button Link" value={hero.primaryButtonLink} onChange={(value) => updateField('primaryButtonLink', value)} />
            <TextInput label="Secondary Button Text" value={hero.secondaryButtonText} onChange={(value) => updateField('secondaryButtonText', value)} />
            <TextInput label="Secondary Button Link" value={hero.secondaryButtonLink} onChange={(value) => updateField('secondaryButtonLink', value)} />
          </section>
        </div>

        <div className="space-y-6">
          <section className="p-6 rounded-xl glass-effect space-y-4">
            <h3 className="text-lg font-semibold text-white">Hero Image</h3>
            {hero.heroImage && (
              <img
                src={resolveAssetUrl(hero.heroImage)}
                alt="Hero preview"
                onError={(event) => {
                  applyImageFallback(event, defaultHeroImage);
                }}
                className="w-40 h-40 rounded-full object-cover border border-white/20"
              />
            )}
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors">
              <Upload size={18} />
              Upload New Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            {imageFile && <p className="text-sm text-green-400">New image selected</p>}
          </section>

          <section className="p-6 rounded-xl glass-effect space-y-4">
            <h3 className="text-lg font-semibold text-white">Badges & Tech</h3>
            <TextInput label="Experience Value" value={hero.experienceValue} onChange={(value) => updateField('experienceValue', value)} />
            <TextInput label="Experience Label" value={hero.experienceLabel} onChange={(value) => updateField('experienceLabel', value)} />
            <TextInput label="Projects Value" value={hero.projectsValue} onChange={(value) => updateField('projectsValue', value)} />
            <TextInput label="Projects Label" value={hero.projectsLabel} onChange={(value) => updateField('projectsLabel', value)} />
            <TextInput label="Scroll Text" value={hero.scrollText} onChange={(value) => updateField('scrollText', value)} />
            <label className="block">
              <span className="block text-white font-medium mb-2">Tech Stack (comma separated)</span>
              <input
                type="text"
                value={(hero.techStack || []).join(', ')}
                onChange={(e) => updateField('techStack', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
                className="w-full px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400"
              />
            </label>
          </section>
        </div>
      </form>
    </motion.div>
  );
};

const TextInput = ({ label, value, onChange }) => (
  <label className="block">
    <span className="block text-white font-medium mb-2">{label}</span>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400"
    />
  </label>
);

export default HeroManager;
