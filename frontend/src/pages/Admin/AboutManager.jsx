import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, Upload } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { resolveAssetUrl } from '../../utils/assets';
import { applyImageFallback, defaultProfileImage } from '../../utils/imageFallbacks';

const emptyAbout = {
  bio: '',
  experience: '',
  profileImage: '',
  resumeLink: '',
  heroSubtitle: '',
  stats: [],
  skills: {},
  experiences: [],
  education: [],
  certifications: [],
};

const AboutManager = () => {
  const [about, setAbout] = useState(emptyAbout);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('/api/about');
      setAbout({ ...emptyAbout, ...response.data });
    } catch (error) {
      console.error('Error fetching about:', error);
      toast.error('Failed to fetch about information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('bio', about.bio || '');
    formData.append('experience', about.experience || '');
    formData.append('resumeLink', about.resumeLink || '');
    formData.append('heroSubtitle', about.heroSubtitle || '');
    formData.append('stats', JSON.stringify(about.stats || []));
    formData.append('skills', JSON.stringify(about.skills || {}));
    formData.append('experiences', JSON.stringify(about.experiences || []));
    formData.append('education', JSON.stringify(about.education || []));
    formData.append('certifications', JSON.stringify(about.certifications || []));

    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    try {
      await axios.put('/api/about', formData);
      toast.success('About section updated successfully');
      setImageFile(null);
      fetchAbout();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update about section');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setAbout((current) => ({ ...current, [field]: value }));
  };

  const updateArrayItem = (field, index, key, value) => {
    setAbout((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) => (
        itemIndex === index ? { ...item, [key]: value } : item
      )),
    }));
  };

  const addArrayItem = (field, item) => {
    setAbout((current) => ({ ...current, [field]: [...(current[field] || []), item] }));
  };

  const removeArrayItem = (field, index) => {
    setAbout((current) => ({
      ...current,
      [field]: current[field].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateSkill = (category, index, key, value) => {
    setAbout((current) => ({
      ...current,
      skills: {
        ...(current.skills || {}),
        [category]: (current.skills?.[category] || []).map((skill, skillIndex) => (
          skillIndex === index ? { ...skill, [key]: key === 'level' ? Number(value) : value } : skill
        )),
      },
    }));
  };

  const addSkill = (category) => {
    setAbout((current) => ({
      ...current,
      skills: {
        ...(current.skills || {}),
        [category]: [...(current.skills?.[category] || []), { name: '', level: 80 }],
      },
    }));
  };

  const removeSkill = (category, index) => {
    setAbout((current) => ({
      ...current,
      skills: {
        ...(current.skills || {}),
        [category]: (current.skills?.[category] || []).filter((_, skillIndex) => skillIndex !== index),
      },
    }));
  };

  const addSkillCategory = () => {
    const name = window.prompt('Skill category name, e.g. frontend, backend, tools');
    if (!name) return;
    const key = name.trim().toLowerCase().replace(/\s+/g, '-');
    if (!key) return;

    setAbout((current) => ({
      ...current,
      skills: { ...(current.skills || {}), [key]: current.skills?.[key] || [] },
    }));
  };

  const removeSkillCategory = (category) => {
    setAbout((current) => {
      const nextSkills = { ...(current.skills || {}) };
      delete nextSkills[category];
      return { ...current, skills: nextSkills };
    });
  };

  const updateAchievement = (experienceIndex, achievementIndex, value) => {
    setAbout((current) => ({
      ...current,
      experiences: current.experiences.map((experience, index) => {
        if (index !== experienceIndex) return experience;
        return {
          ...experience,
          achievements: (experience.achievements || []).map((achievement, itemIndex) => (
            itemIndex === achievementIndex ? value : achievement
          )),
        };
      }),
    }));
  };

  const addAchievement = (experienceIndex) => {
    setAbout((current) => ({
      ...current,
      experiences: current.experiences.map((experience, index) => (
        index === experienceIndex
          ? { ...experience, achievements: [...(experience.achievements || []), ''] }
          : experience
      )),
    }));
  };

  const removeAchievement = (experienceIndex, achievementIndex) => {
    setAbout((current) => ({
      ...current,
      experiences: current.experiences.map((experience, index) => (
        index === experienceIndex
          ? {
              ...experience,
              achievements: (experience.achievements || []).filter((_, itemIndex) => itemIndex !== achievementIndex),
            }
          : experience
      )),
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage About Section</h2>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Profile">
          <label className="block text-white font-medium mb-2">Profile Image</label>
          {about.profileImage && (
            <img
              src={resolveAssetUrl(about.profileImage)}
              alt="Profile"
              onError={(event) => {
                applyImageFallback(event, defaultProfileImage);
              }}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          )}
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors">
            <Upload size={18} />
            Upload New Image
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" />
          </label>
          {imageFile && <p className="text-sm text-green-400 mt-2">New image selected</p>}
          <TextInput label="Resume Link" value={about.resumeLink} onChange={(value) => updateField('resumeLink', value)} />
        </Panel>

        <Panel title="Intro Text">
          <TextArea label="About Page Hero Subtitle" value={about.heroSubtitle} onChange={(value) => updateField('heroSubtitle', value)} rows={4} />
          <TextArea label="Bio" value={about.bio} onChange={(value) => updateField('bio', value)} rows={6} />
          <TextArea label="Experience Summary" value={about.experience} onChange={(value) => updateField('experience', value)} rows={4} />
        </Panel>
      </div>

      <Panel title="Stats" actionLabel="Add Stat" onAction={() => addArrayItem('stats', { label: '', value: '' })}>
        <div className="grid md:grid-cols-2 gap-4">
          {(about.stats || []).map((stat, index) => (
            <div key={index} className="p-4 rounded-lg glass-effect space-y-3">
              <TextInput label="Label" value={stat.label} onChange={(value) => updateArrayItem('stats', index, 'label', value)} />
              <TextInput label="Value" value={stat.value} onChange={(value) => updateArrayItem('stats', index, 'value', value)} />
              <RemoveButton onClick={() => removeArrayItem('stats', index)} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Skills" actionLabel="Add Category" onAction={addSkillCategory}>
        <div className="space-y-6">
          {Object.entries(about.skills || {}).map(([category, skills]) => (
            <div key={category} className="p-4 rounded-lg glass-effect space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-semibold text-white capitalize">{category}</h4>
                <div className="flex gap-2">
                  <SmallButton onClick={() => addSkill(category)}>Add Skill</SmallButton>
                  <RemoveButton onClick={() => removeSkillCategory(category)} compact />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(Array.isArray(skills) ? skills : []).map((skill, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 space-y-3">
                    <TextInput label="Skill Name" value={skill.name} onChange={(value) => updateSkill(category, index, 'name', value)} />
                    <TextInput label="Level" type="number" value={skill.level} onChange={(value) => updateSkill(category, index, 'level', value)} />
                    <RemoveButton onClick={() => removeSkill(category, index)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Work Experience" actionLabel="Add Experience" onAction={() => addArrayItem('experiences', { company: '', position: '', period: '', description: '', achievements: [] })}>
        <div className="space-y-4">
          {(about.experiences || []).map((experience, index) => (
            <div key={index} className="p-4 rounded-lg glass-effect space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <TextInput label="Position" value={experience.position} onChange={(value) => updateArrayItem('experiences', index, 'position', value)} />
                <TextInput label="Company" value={experience.company} onChange={(value) => updateArrayItem('experiences', index, 'company', value)} />
                <TextInput label="Period" value={experience.period} onChange={(value) => updateArrayItem('experiences', index, 'period', value)} />
              </div>
              <TextArea label="Description" value={experience.description} onChange={(value) => updateArrayItem('experiences', index, 'description', value)} rows={3} />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Achievements</span>
                  <SmallButton onClick={() => addAchievement(index)}>Add Achievement</SmallButton>
                </div>
                {(experience.achievements || []).map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400"
                    />
                    <IconButton onClick={() => removeAchievement(index, achievementIndex)} />
                  </div>
                ))}
              </div>
              <RemoveButton onClick={() => removeArrayItem('experiences', index)} />
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Education" actionLabel="Add Education" onAction={() => addArrayItem('education', { degree: '', institution: '', year: '', achievements: '' })}>
          <div className="space-y-4">
            {(about.education || []).map((education, index) => (
              <div key={index} className="p-4 rounded-lg glass-effect space-y-3">
                <TextInput label="Degree" value={education.degree} onChange={(value) => updateArrayItem('education', index, 'degree', value)} />
                <TextInput label="Institution" value={education.institution} onChange={(value) => updateArrayItem('education', index, 'institution', value)} />
                <TextInput label="Year" value={education.year} onChange={(value) => updateArrayItem('education', index, 'year', value)} />
                <TextArea label="Achievements" value={education.achievements} onChange={(value) => updateArrayItem('education', index, 'achievements', value)} rows={2} />
                <RemoveButton onClick={() => removeArrayItem('education', index)} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Certifications" actionLabel="Add Certification" onAction={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })}>
          <div className="space-y-4">
            {(about.certifications || []).map((certification, index) => (
              <div key={index} className="p-4 rounded-lg glass-effect space-y-3">
                <TextInput label="Name" value={certification.name} onChange={(value) => updateArrayItem('certifications', index, 'name', value)} />
                <TextInput label="Issuer" value={certification.issuer} onChange={(value) => updateArrayItem('certifications', index, 'issuer', value)} />
                <TextInput label="Year" value={certification.year} onChange={(value) => updateArrayItem('certifications', index, 'year', value)} />
                <RemoveButton onClick={() => removeArrayItem('certifications', index)} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </motion.form>
  );
};

const Panel = ({ title, children, actionLabel, onAction }) => (
  <section className="p-6 rounded-xl glass-effect space-y-4">
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {actionLabel && (
        <SmallButton onClick={onAction}>
          <Plus size={16} />
          {actionLabel}
        </SmallButton>
      )}
    </div>
    {children}
  </section>
);

const TextInput = ({ label, value, onChange, type = 'text' }) => (
  <label className="block">
    <span className="block text-white font-medium mb-2">{label}</span>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400"
    />
  </label>
);

const TextArea = ({ label, value, onChange, rows }) => (
  <label className="block">
    <span className="block text-white font-medium mb-2">{label}</span>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-4 py-2 rounded-lg glass-effect text-white placeholder-gray-400 resize-none"
    />
  </label>
);

const SmallButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/80 text-white text-sm hover:bg-blue-600 transition-colors"
  >
    {children}
  </button>
);

const IconButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="p-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors"
  >
    <Trash2 size={16} />
  </button>
);

const RemoveButton = ({ onClick, compact = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors ${compact ? 'px-3 py-2' : 'px-4 py-2'}`}
  >
    <Trash2 size={16} />
    {!compact && 'Remove'}
  </button>
);

export default AboutManager;
