import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Send, Mail, Phone, MapPin, Clock, CheckCircle,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
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
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = mapSocials(socialItems, [
    { platform: 'github', url: 'https://github.com/usmanakhtar' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/usmanakhtar' },
    { platform: 'twitter', url: 'https://twitter.com/usmanakhtar' },
    { platform: 'facebook', url: 'https://facebook.com/usmanakhtar' },
    { platform: 'instagram', url: 'https://instagram.com/usmanakhtar' },
  ]);
  const email = socialLinks.find((item) => item.platform === 'email');
  const phone = socialLinks.find((item) => item.platform === 'phone');

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: email?.rawValue || 'usman@akhtar.dev', 
      href: email?.href || 'mailto:usman@akhtar.dev',
      description: 'Send me an email anytime'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: phone?.rawValue || '+92 300 1234567', 
      href: phone?.href || 'tel:+923001234567',
      description: 'Mon-Fri, 9 AM to 6 PM'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Pakistan', 
      href: null,
      description: 'Available for remote work worldwide'
    },
    { 
      icon: Clock, 
      label: 'Timezone', 
      value: 'PKT (UTC+5)', 
      href: null,
      description: 'Flexible for international clients'
    },
  ];

  const faqs = [
    {
      question: 'What is your typical response time?',
      answer: 'I usually respond within 24 hours during business days.',
    },
    {
      question: 'Do you take on freelance projects?',
      answer: 'Yes, I\'m available for freelance work. Let\'s discuss your project!',
    },
    {
      question: 'What is your development process?',
      answer: 'I follow agile methodology with regular updates and client feedback.',
    },
    {
      question: 'Do you offer maintenance services?',
      answer: 'Yes, I provide ongoing maintenance and support for all projects.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-gray-400 mb-8">
                I'm always excited to discuss new projects, collaboration opportunities, 
                or just to chat about technology. Feel free to reach out through any of 
                these channels.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl glass-effect hover:shadow-lg transition-all">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-white font-medium hover:text-blue-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{info.value}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className={`p-3 rounded-xl glass-effect transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="pt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-3 rounded-lg glass-effect hover:bg-white/5 transition-colors">
                      <span className="text-gray-200">{faq.question}</span>
                      <span className="text-blue-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-gray-400 text-sm p-3 pl-6">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-2xl glass-effect">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Your Name *</label>
                  <input
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email Address *</label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message *</label>
                  <textarea
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' }
                    })}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.message.message}
                    </p>
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
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  * Required fields. I'll get back to you within 24-48 hours.
                </p>
              </form>
            </div>

            {/* Map or Location */}
            <div className="mt-8 p-6 rounded-2xl glass-effect">
              <h3 className="text-lg font-semibold text-white mb-4">Work Availability</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <p className="text-sm text-gray-400">Email Support</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">Flexible</div>
                  <p className="text-sm text-gray-400">Working Hours</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">100%</div>
                  <p className="text-sm text-gray-400">Client Satisfaction</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Global</div>
                  <p className="text-sm text-gray-400">Remote Work</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
