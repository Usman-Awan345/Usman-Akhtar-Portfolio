import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import { mapSocials } from '../utils/socialLinks';
import BrandLogo from './BrandLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialItems, setSocialItems] = useState([]);

  const fallbackSocials = [
    { platform: 'github', url: 'https://github.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
    { platform: 'email', url: 'usman@example.com' },
  ];
  const socialLinks = mapSocials(socialItems, fallbackSocials);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await axios.get('/api/social');
        setSocialItems(response.data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocials();
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-gray-900 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <BrandLogo className="mb-4" />
            <p className="text-gray-400 mb-4">
              MERN Stack & Generative AI Developer creating innovative digital solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-2 rounded-full glass-effect hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon size={20} className="text-gray-400 hover:text-blue-400" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Full Stack Development</li>
              <li className="text-gray-400">AI Applications</li>
              <li className="text-gray-400">E-commerce Solutions</li>
              <li className="text-gray-400">API Development</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>{socialLinks.find((item) => item.platform === 'email')?.rawValue || 'usman@akhtar.dev'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>{socialLinks.find((item) => item.platform === 'phone')?.rawValue || '+92 300 1234567'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Usman Akhtar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
