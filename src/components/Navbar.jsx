import React from 'react';
import { Zap, HelpCircle } from 'lucide-react';
import { RISK_COLORS } from '../utils/riskColors';
import { formatDistanceToNow } from 'date-fns';

export default function Navbar({ lastUpdated, onOpenInfo }) {
  const timeAgo = lastUpdated ? formatDistanceToNow(lastUpdated, { addSuffix: true }) : 'connecting...';

  return (
    <nav className="bg-[#0a0a0f] border-b border-[#1e1e2e] h-16 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Zap className="text-blue-500 w-6 h-6" fill="currentColor" />
          <h1 className="text-white text-xl font-bold tracking-tight">Gridwatch AI</h1>
        </div>
        <div className="hidden md:block w-px h-6 bg-[#1e1e2e] mx-2"></div>
        <p className="hidden md:block text-[#6b7280] text-sm font-medium">
          Real-time US power grid cascade risk monitor
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_COLORS.Low }}></span> Low</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_COLORS.Moderate }}></span> Mod</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_COLORS.High }}></span> High</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full border border-red-500" style={{ backgroundColor: RISK_COLORS.Critical }}></span> Crit</span>
        </div>
        
        <div className="flex items-center gap-2 bg-[#111118] px-3 py-1.5 rounded-full border border-[#1e1e2e]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-gray-300">Live</span>
          <span className="text-xs text-gray-500 hidden sm:inline-block border-l border-gray-700 pl-2 ml-1">
            updated {timeAgo}
          </span>
        </div>

        <button 
          onClick={onOpenInfo}
          className="text-gray-400 hover:text-white transition-colors bg-[#111118] p-1.5 rounded-full border border-[#1e1e2e]"
          title="About Gridwatch AI"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </nav>
  );
}
