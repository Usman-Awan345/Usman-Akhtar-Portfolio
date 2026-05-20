import {
  FaFacebook as Facebook,
  FaGithub as Github,
  FaInstagram as Instagram,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter,
} from 'react-icons/fa';
import { Mail, Phone } from 'lucide-react';

export const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  email: Mail,
  phone: Phone,
};

export const socialLabelMap = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  facebook: 'Facebook',
  instagram: 'Instagram',
  email: 'Email',
  phone: 'Phone',
};

export const socialColorMap = {
  github: 'hover:text-gray-300',
  linkedin: 'hover:text-blue-400',
  twitter: 'hover:text-blue-300',
  facebook: 'hover:text-blue-500',
  instagram: 'hover:text-pink-400',
  email: 'hover:text-blue-400',
  phone: 'hover:text-green-400',
};

export const normalizeSocialHref = (platform, value) => {
  if (!value) return '';
  if (platform === 'email') return value.startsWith('mailto:') ? value : `mailto:${value}`;
  if (platform === 'phone') return value.startsWith('tel:') ? value : `tel:${value.replace(/\s+/g, '')}`;
  return value;
};

export const mapSocials = (items, fallbacks = []) => {
  const source = items?.length ? items : fallbacks;

  return source
    .map((item) => {
      const platform = item.platform?.toLowerCase();
      const Icon = socialIconMap[platform];

      if (!platform || !Icon || !item.url) return null;

      return {
        platform,
        icon: Icon,
        href: normalizeSocialHref(platform, item.url),
        rawValue: item.url,
        label: socialLabelMap[platform] || item.platform,
        color: socialColorMap[platform] || 'hover:text-blue-400',
      };
    })
    .filter(Boolean);
};
