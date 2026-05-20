import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResumeManager = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await axios.get('/api/resume');
      setResumeUrl(response.data.url);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resume:', error);
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    try {
      const response = await axios.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResumeUrl(response.data.url);
      toast.success('Resume uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Resume Management</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl glass-effect">
          <div className="text-center mb-6">
            <FileText size={48} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Upload Resume</h3>
            <p className="text-gray-400 text-sm mb-4">Upload your resume in PDF format</p>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Upload size={18} />
                {uploading ? 'Uploading...' : 'Upload Resume'}
              </div>
            </label>
          </div>
        </div>

        <div className="p-6 rounded-xl glass-effect">
          <div className="text-center mb-6">
            <Download size={48} className="mx-auto text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Download Resume</h3>
            <p className="text-gray-400 text-sm mb-4">
              {resumeUrl ? 'Your resume is ready for download' : 'No resume uploaded yet'}
            </p>
            
            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Download size={18} />
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeManager;