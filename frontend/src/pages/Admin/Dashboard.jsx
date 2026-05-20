import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FolderGit2, Server, Code, MessageSquare, 
  Link as LinkIcon, FileText, Settings, LogOut, Menu, X,
  Plus, Edit, Trash2, Eye, Home
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectsManager from './ProjectsManager';
import ServicesManager from './ServicesManager';
import SkillsManager from './SkillsManager';
import MessagesManager from './MessagesManager';
import SocialManager from './SocialManager';
import ResumeManager from './ResumeManager';
import AboutManager from './AboutManager';
import HeroManager from './HeroManager';
import BrandLogo from '../../components/BrandLogo';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, services, messages] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/services'),
        axios.get('/api/messages'),
      ]);
      
      setStats({
        projects: projects.data.length,
        services: services.data.length,
        messages: messages.data.length,
        unreadMessages: messages.data.filter(m => !m.read).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '', icon: LayoutDashboard, label: 'Dashboard' },
    { path: 'hero', icon: Home, label: 'Hero' },
    { path: 'projects', icon: FolderGit2, label: 'Projects' },
    { path: 'services', icon: Server, label: 'Services' },
    { path: 'skills', icon: Code, label: 'Skills' },
    { path: 'messages', icon: MessageSquare, label: 'Messages' },
    { path: 'social', icon: LinkIcon, label: 'Social Links' },
    { path: 'resume', icon: FileText, label: 'Resume' },
    { path: 'about', icon: Settings, label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } glass-effect border-r border-gray-700`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {sidebarOpen && <BrandLogo compact={false} />}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors group"
              >
                <item.icon size={20} className="text-gray-400 group-hover:text-blue-400" />
                {sidebarOpen && (
                  <span className="text-gray-300 group-hover:text-white">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-500/20 transition-colors group"
            >
              <LogOut size={20} className="text-red-400" />
              {sidebarOpen && <span className="text-red-400">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome stats={stats} />} />
            <Route path="hero/*" element={<HeroManager />} />
            <Route path="projects/*" element={<ProjectsManager />} />
            <Route path="services/*" element={<ServicesManager />} />
            <Route path="skills/*" element={<SkillsManager />} />
            <Route path="messages/*" element={<MessagesManager />} />
            <Route path="social/*" element={<SocialManager />} />
            <Route path="resume/*" element={<ResumeManager />} />
            <Route path="about/*" element={<AboutManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl glass-effect">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-white">{stats.projects}</p>
            </div>
            <FolderGit2 size={40} className="text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="p-6 rounded-xl glass-effect">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Services</p>
              <p className="text-3xl font-bold text-white">{stats.services}</p>
            </div>
            <Server size={40} className="text-purple-400 opacity-50" />
          </div>
        </div>

        <div className="p-6 rounded-xl glass-effect">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Messages</p>
              <p className="text-3xl font-bold text-white">{stats.messages}</p>
            </div>
            <MessageSquare size={40} className="text-green-400 opacity-50" />
          </div>
        </div>

        <div className="p-6 rounded-xl glass-effect">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unread Messages</p>
              <p className="text-3xl font-bold text-white">{stats.unreadMessages}</p>
            </div>
            <Eye size={40} className="text-yellow-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl glass-effect">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="projects"
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
            >
              <Plus size={20} className="text-blue-400" />
              <span className="text-blue-400">Add New Project</span>
            </Link>
            <Link
              to="services"
              className="flex items-center gap-3 p-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors"
            >
              <Plus size={20} className="text-purple-400" />
              <span className="text-purple-400">Add New Service</span>
            </Link>
            <Link
              to="skills"
              className="flex items-center gap-3 p-3 rounded-lg bg-green-600/20 hover:bg-green-600/30 transition-colors"
            >
              <Plus size={20} className="text-green-400" />
              <span className="text-green-400">Add New Skill</span>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-xl glass-effect">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <p className="text-gray-400">Recent messages and updates will appear here</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
