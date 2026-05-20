import React from 'react';

const BrandLogo = ({ compact = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-950 border border-white/15 shadow-lg shadow-blue-500/10 overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-violet-500/20 to-pink-500/20" />
        <span className="relative text-xl font-black tracking-tight bg-gradient-to-br from-sky-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
          UA
        </span>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-lg font-black tracking-wide text-white">Usman Akhtar</span>
          <span className="block text-[11px] uppercase tracking-[0.28em] text-blue-300/80">MERN + AI</span>
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
