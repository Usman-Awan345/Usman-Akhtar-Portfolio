import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'AI', 'Tools'],
    required: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  icon: String,
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);