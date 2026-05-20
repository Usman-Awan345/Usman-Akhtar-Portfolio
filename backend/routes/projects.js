import express from 'express';
import Project from '../models/Project.js';
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

// Public routes
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin routes
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path);
    }
    
    const project = new Project({
      ...req.body,
      image: imageUrl,
      techStack: JSON.parse(req.body.techStack || '[]'),
      features: JSON.parse(req.body.features || '[]'),
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.path);
    }
    if (req.body.techStack) updateData.techStack = JSON.parse(req.body.techStack);
    if (req.body.features) updateData.features = JSON.parse(req.body.features);
    
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
