import React from 'react';
import { X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111118] border border-[#1e1e2e] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#1e1e2e] bg-[#0d0d14]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-blue-500">?</span> About Gridwatch AI
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5 text-sm text-gray-300 overflow-y-auto max-h-[70vh]">
          <p>
            <strong className="text-white">Gridwatch AI</strong> is a real-time monitoring dashboard designed to predict and visualize power grid cascade failures across the United States. By analyzing live grid data, we aim to prevent massive blackouts before they ripple across interconnected regions.
          </p>
          
          <p>
            Our core AI model uses a <span className="text-[#14b8a6] font-mono bg-[#14b8a6]/10 px-1 py-0.5 rounded">GradientBoostingRegressor</span> tuned on historical EIA (Energy Information Administration) load anomalies and NOAA climate data. The model computes a raw risk coefficient by evaluating demand spikes and temperature deviations. In backtesting, the current model achieves an <strong className="text-white">R² of 0.67</strong> in correlating features to historical localized voltage collapses.
          </p>

          <p>
            Grid failures are rarely localized. We calculate the <strong className="text-red-400">Cascade Risk Score</strong> by applying a propagation graph across transmission interconnects. For example, severe capacity stress in California limits its ability to support the Pacific Northwest during peak loads, elevating the overall regional cascade probability.
          </p>
        </div>
        
        <div className="p-4 bg-[#0d0d14] border-t border-[#1e1e2e] flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
