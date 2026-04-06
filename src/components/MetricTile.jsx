import React, { useEffect, useState } from 'react';

export default function MetricTile({ title, value, subtitle, icon, highlightColor, lastUpdated }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (lastUpdated) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 800);
      return () => clearTimeout(timer);
    }
  }, [lastUpdated]);

  return (
    <div 
      className={`relative p-5 rounded-2xl bg-gradient-to-br from-[#111118] to-[#0a0a0f] border transition-all duration-300 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${
        flash ? 'border-gray-400 bg-[#1e1e2e]' : 'border-[#1e1e2e] hover:border-opacity-50'
      }`}
      style={{
        boxShadow: flash ? `0 0 15px ${highlightColor}40` : '',
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at top right, ${highlightColor}, transparent 70%)` }}
      />
      <div className="relative z-10 flex justify-between items-start mb-3">
        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</h3>
        {icon && (
          <div 
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" 
            style={{ color: flash ? highlightColor : '#6b7280' }}
          >
            {icon}
          </div>
        )}
      </div>
      
      <div className="relative z-10 flex flex-col items-start mt-1">
        <span 
          className="text-3xl font-extrabold tracking-tight drop-shadow-sm"
          style={{ color: highlightColor || '#ffffff' }}
        >
          {value}
        </span>
        {subtitle && (
          <span className="text-gray-500 text-xs mt-1">{subtitle}</span>
        )}
      </div>

      {flash && (
        <div className="absolute inset-0 border-2 rounded-xl pointer-events-none transition-all duration-700 opacity-0" 
             style={{ borderColor: highlightColor || '#ffffff', animation: 'flash-ring 0.8s ease-out' }} 
        />
      )}
      <style>{`
        @keyframes flash-ring {
          0% { opacity: 0.8; transform: scale(0.98); }
          100% { opacity: 0; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
