import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import AISolutions from '../components/AISolutions';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <AISolutions />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;