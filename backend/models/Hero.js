import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  badgeText: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  titlePrefix: {
    type: String,
    required: true,
  },
  highlightedTitle: {
    type: String,
    required: true,
  },
  titleSuffix: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryButtonText: {
    type: String,
    required: true,
  },
  primaryButtonLink: {
    type: String,
    required: true,
  },
  secondaryButtonText: {
    type: String,
    required: true,
  },
  secondaryButtonLink: {
    type: String,
    required: true,
  },
  techStack: [String],
  heroImage: String,
  experienceValue: {
    type: String,
    required: true,
  },
  experienceLabel: {
    type: String,
    required: true,
  },
  projectsValue: {
    type: String,
    required: true,
  },
  projectsLabel: {
    type: String,
    required: true,
  },
  scrollText: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Hero', heroSchema);
