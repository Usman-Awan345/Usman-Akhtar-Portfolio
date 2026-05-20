import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['All', 'AI', 'Web', 'E-commerce'],
    required: true,
  },
  techStack: [String],
  features: [String],
  image: {
    type: String,
    required: true,
  },
  images: [String],
  githubLink: String,
  liveLink: String,
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);