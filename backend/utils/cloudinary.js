import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const getLocalUploadUrl = (filePath) => {
  const uploadPath = `/uploads/${path.basename(filePath)}`;
  const publicApiUrl = (process.env.PUBLIC_API_URL || '').replace(/\/$/, '');

  return publicApiUrl ? `${publicApiUrl}${uploadPath}` : uploadPath;
};

export const uploadToCloudinary = async (filePath, folder = 'portfolio') => {
  const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  if (!hasCloudinaryConfig) {
    console.warn('Cloudinary is not configured. Using local upload path.');
    return getLocalUploadUrl(filePath);
  }

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return getLocalUploadUrl(filePath);
  }
};
