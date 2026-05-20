import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { mapSocials } from '../utils/socialLinks';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialItems, setSocialItems] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/messages', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = mapSocials(socialItems, [
    { platform: 'github', url: 'https://github.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
  ]);
  const email = socialLinks.find((item) => item.platform === 'email');
  const phone = socialLinks.find((item) => item.platform === 'phone');

  const contactInfo = [
    { icon: Mail, label: 'Email', value: email?.rawValue || 'usman@akhtar.dev', href: email?.href || 'mailto:usman@akhtar.dev' },
    { icon: Phone, label: 'Phone', value: phone?.rawValue || '+92 300 1234567', href: phone?.href || 'tel:+923001234567' },
    { icon: MapPin, label: 'Location', value: 'Pakistan', href: null },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl glass-effect">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-white hover:text-blue-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="p-3 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300"
                    >
                      <social.icon size={24} className="text-gray-400 hover:text-blue-400" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
