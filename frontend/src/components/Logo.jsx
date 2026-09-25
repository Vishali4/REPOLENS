import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'default', clickable = true }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const content = (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Custom Lens + Code Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-primary to-purple-bright p-0.5 shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300 ${
        isSmall ? 'w-7 h-7' : isLarge ? 'w-11 h-11' : 'w-9 h-9'
      }`}>
        <div className="w-full h-full bg-background-main rounded-[10px] flex items-center justify-center">
          <div className="flex items-center justify-center text-purple-light font-mono font-bold text-xs tracking-tighter">
            <span className="text-purple-bright font-black text-sm mr-0.5">◉</span>
            <span className="text-[11px] opacity-90">&lt;/&gt;</span>
          </div>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-text-main flex items-center gap-1 ${
          isSmall ? 'text-lg' : isLarge ? 'text-2xl' : 'text-xl'
        }`}>
          Repo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-bright to-purple-light">Lens</span>
        </span>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
