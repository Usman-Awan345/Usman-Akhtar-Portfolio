import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Social', socialSchema);