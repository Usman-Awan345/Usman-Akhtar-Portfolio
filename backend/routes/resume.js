import express from 'express';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

let resumeUrl = null;

router.get('/', async (req, res) => {
  res.json({ url: resumeUrl });
});

router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    if (req.file) {
      resumeUrl = await uploadToCloudinary(req.file.path, 'resume');
      res.json({ url: resumeUrl });
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;