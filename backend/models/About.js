import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  profileImage: String,
  resumeLink: String,
  heroSubtitle: String,
  stats: [{
    label: String,
    value: String,
  }],
  skills: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  experiences: [{
    company: String,
    position: String,
    period: String,
    description: String,
    achievements: [String],
  }],
  education: [{
    degree: String,
    institution: String,
    year: String,
    achievements: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: String,
  }],
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
