import express from 'express';
import Social from '../models/Social.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const socials = await Social.find();
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const social = new Social(req.body);
    await social.save();
    res.status(201).json(social);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:platform', protect, async (req, res) => {
  try {
    const platform = req.params.platform.toLowerCase();
    const url = req.body.url?.trim();

    if (!url) {
      await Social.findOneAndDelete({ platform });
      return res.json({ platform, url: '' });
    }

    const social = await Social.findOneAndUpdate(
      { platform },
      { platform, url },
      { new: true, upsert: true }
    );
    res.json(social);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
