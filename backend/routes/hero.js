import express from 'express';
import Hero from '../models/Hero.js';
import { protect } from '../middleware/auth.js';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const defaultHero = {
  badgeText: 'Welcome to my portfolio',
  name: 'Usman Akhtar',
  titlePrefix: 'MERN Stack & ',
  highlightedTitle: 'Generative AI',
  titleSuffix: ' Developer',
  description: 'Building modern web applications and AI-powered platforms with cutting-edge technologies. Specialized in creating scalable, performant, and user-centric digital solutions.',
  primaryButtonText: 'View Projects',
  primaryButtonLink: '/projects',
  secondaryButtonText: 'Hire Me',
  secondaryButtonLink: '/contact',
  techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'OpenAI', 'LangChain'],
  heroImage: 'https://ui-avatars.com/api/?name=Usman+Akhtar&background=3B82F6&color=fff&size=400&bold=true&length=2&font-size=0.33&rounded=true',
  experienceValue: '5+',
  experienceLabel: 'Years Exp',
  projectsValue: '50+',
  projectsLabel: 'Projects',
  scrollText: 'Scroll to explore',
};

const parseList = (value) => {
  if (!value) return [];

  try {
    return JSON.parse(value);
  } catch (error) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
};

router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = new Hero(defaultHero);
      await hero.save();
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', protect, upload.single('heroImage'), async (req, res) => {
  try {
    let hero = await Hero.findOne();
    const updateData = { ...req.body };
    const requiredFields = [
      'badgeText',
      'name',
      'titlePrefix',
      'highlightedTitle',
      'titleSuffix',
      'description',
      'primaryButtonText',
      'primaryButtonLink',
      'secondaryButtonText',
      'secondaryButtonLink',
      'experienceValue',
      'experienceLabel',
      'projectsValue',
      'projectsLabel',
      'scrollText',
    ];

    requiredFields.forEach((field) => {
      if (updateData[field] === '' && hero?.[field]) {
        updateData[field] = hero[field];
      }
    });

    if (req.file) {
      updateData.heroImage = await uploadToCloudinary(req.file.path);
    }

    if (req.body.techStack) {
      updateData.techStack = parseList(req.body.techStack);
    }

    if (hero) {
      hero = await Hero.findOneAndUpdate({}, updateData, { new: true, runValidators: true });
    } else {
      hero = new Hero({ ...defaultHero, ...updateData });
      await hero.save();
    }

    res.json(hero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
