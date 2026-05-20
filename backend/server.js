import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import serviceRoutes from './routes/services.js';
import skillRoutes from './routes/skills.js';
import messageRoutes from './routes/messages.js';
import resumeRoutes from './routes/resume.js';
import aboutRoutes from './routes/about.js';
import socialRoutes from './routes/social.js';
import heroRoutes from './routes/hero.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Usman Akhtar Portfolio API is running',
    endpoints: {
      hero: '/api/hero',
      about: '/api/about',
      projects: '/api/projects',
      services: '/api/services',
      skills: '/api/skills',
      social: '/api/social',
      adminLogin: '/api/admin/login',
    },
  });
});

// Routes
app.use('/api/admin', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/hero', heroRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
