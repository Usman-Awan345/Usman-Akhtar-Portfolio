import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Preload fonts or any initialization
    document.title = "Usman Akhtar | MERN Stack & AI Developer";
  }, []);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/services" element={<><Navbar /><Services /></>} />
          <Route path="/projects" element={<><Navbar /><Projects /></>} />
          <Route path="/projects/:id" element={<><Navbar /><ProjectDetails /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;