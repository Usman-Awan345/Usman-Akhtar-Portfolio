import express from 'express';
import About from '../models/About.js';
import { protect } from '../middleware/auth.js';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir });

const defaultAbout = {
  bio: 'I am a passionate developer...',
  experience: '5+ years of experience',
  heroSubtitle: 'Get to know the developer behind the code - my journey, skills, and passion for creating innovative digital solutions.',
  stats: [
    { label: 'Started Coding', value: '2015' },
    { label: 'Certifications', value: '12+' },
    { label: 'Projects', value: '50+' },
    { label: 'Clients', value: '30+' },
  ],
  skills: {
    frontend: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'TypeScript', level: 85 },
    ],
    backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 92 },
      { name: 'Python', level: 80 },
      { name: 'GraphQL', level: 75 },
    ],
    database: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 82 },
      { name: 'Redis', level: 75 },
    ],
    ai: [
      { name: 'OpenAI GPT', level: 85 },
      { name: 'LangChain', level: 80 },
      { name: 'Vector DB', level: 78 },
      { name: 'Hugging Face', level: 75 },
    ],
  },
  experiences: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications and AI-powered solutions.',
      achievements: [
        'Built scalable MERN applications serving 100k+ users',
        'Implemented AI chatbots reducing customer support tickets by 40%',
        'Mentored junior developers and conducted code reviews',
      ],
    },
  ],
  education: [
    {
      degree: 'BS Computer Science',
      institution: 'National University',
      year: '2015 - 2019',
      achievements: 'CGPA: 3.8/4.0',
    },
  ],
  certifications: [
    { name: 'MERN Stack Professional', issuer: 'Coursera', year: '2023' },
  ],
};

const localUploadExists = (url) => {
  if (!url || typeof url !== 'string' || !url.startsWith('/uploads/')) return true;

  return fs.existsSync(path.join(uploadDir, path.basename(url)));
};

const parseJsonField = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(defaultAbout);
      await about.save();
    }

    if (!localUploadExists(about.profileImage)) {
      about.profileImage = defaultAbout.profileImage;
    }

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', protect, upload.single('profileImage'), async (req, res) => {
  try {
    let about = await About.findOne();
    const updateData = { ...req.body };

    updateData.stats = parseJsonField(req.body.stats, about?.stats || defaultAbout.stats);
    updateData.skills = parseJsonField(req.body.skills, about?.skills || defaultAbout.skills);
    updateData.experiences = parseJsonField(req.body.experiences, about?.experiences || defaultAbout.experiences);
    updateData.education = parseJsonField(req.body.education, about?.education || defaultAbout.education);
    updateData.certifications = parseJsonField(req.body.certifications, about?.certifications || defaultAbout.certifications);
    
    if (req.file) {
      updateData.profileImage = await uploadToCloudinary(req.file.path);
    }
    
    if (about) {
      about = await About.findOneAndUpdate({}, updateData, { new: true });
    } else {
      about = new About(updateData);
      await about.save();
    }
    
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
