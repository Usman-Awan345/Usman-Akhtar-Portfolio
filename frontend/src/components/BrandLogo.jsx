import React from 'react';

const BrandLogo = ({ className = '' }) => {
  return (
    <h1
      className={`text-2xl md:text-3xl font-black tracking-[0.15em] 
      bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 
      bg-clip-text text-transparent 
      drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] 
      hover:scale-105 transition-all duration-300 ${className}`}
    >
      Usman Akhtar
    </h1>
  );
};

export default BrandLogo;