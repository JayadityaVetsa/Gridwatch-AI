import React from 'react';
import MetricTile from './MetricTile';
import ForecastChart from './ForecastChart';
import { getColorForRisk } from '../utils/riskColors';
import { Activity, AlertTriangle, Thermometer, TrendingUp } from 'lucide-react';

export default function DetailPanel({ selectedRegion, forecastData, lastUpdated }) {
  if (!selectedRegion) {
    return (
      <div className="w-full flex-grow flex items-center justify-center text-gray-500">
        Select a region on the map to view details.
      </div>
    );
  }

  const riskColor = getColorForRisk(selectedRegion.risk_level);
  
  const generateAIReason = (region) => {
    if (region.human_readable_reason) return region.human_readable_reason;
    if (region.risk_level === 'Critical') return `Systemic instability flagged. Severe demand anomaly (${region.demand_anomaly_zscore > 0 ? '+' : ''}${region.demand_anomaly_zscore.toFixed(1)}σ) compounding with temperature volatility (${region.temperature_vs_normal > 0 ? '+' : ''}${region.temperature_vs_normal.toFixed(1)}°F). Cascade probability is severely elevated to ${region.cascade_risk_score.toFixed(0)}/100.`;
    if (region.risk_level === 'High') return `Transmission bottlenecks detected. Demand is deviating from seasonal baseline by ${Math.abs(region.demand_anomaly_zscore).toFixed(1)} standard deviations. Elevated operational stress.`;
    if (region.risk_level === 'Moderate') return `System operates near limits but remains stable. Isolated constraints observed. Temperature delta at ${region.temperature_vs_normal > 0 ? '+' : ''}${region.temperature_vs_normal.toFixed(1)}°F.`;
    return `Grid stable. Ample capacity margins and optimal interchange. Nominal environmental baseline.`;
  };

  return (
    <div className="w-full flex flex-col lg:flex-row p-6 gap-6 relative">
      {/* Background ambient glow tied to risk level */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[100px] opacity-20 pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: riskColor }}
      />

      {/* Left Column - Region Info and Metrics */}
      <div className="w-full lg:w-[40%] flex flex-col gap-6 relative z-10">
        {/* Premium Region Card */}
        <div className="bg-[#111118]/80 backdrop-blur-lg rounded-2xl border border-[#1e1e2e] p-6 flex items-start justify-between shadow-xl">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{selectedRegion.full_state_name}</h2>
            <p className="text-gray-500 text-sm">{selectedRegion.region}</p>
          </div>
          <div 
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border"
            style={{ 
              color: riskColor, 
              backgroundColor: `${riskColor}15`,
              borderColor: `${riskColor}30`
            }}
          >
            {selectedRegion.risk_level}
          </div>
        </div>

        {/* 2x2 Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricTile 
            title="Outage Probability" 
            value={`${(selectedRegion.outage_probability * 100).toFixed(1)}%`}
            icon={<AlertTriangle />}
            highlightColor={riskColor}
            lastUpdated={lastUpdated}
          />
          <MetricTile 
            title="Cascade Risk" 
            value={`${selectedRegion.cascade_risk_score.toFixed(1)}`}
            subtitle="/ 100"
            icon={<Activity />}
            highlightColor={riskColor}
            lastUpdated={lastUpdated}
          />
          <MetricTile 
            title="Demand Anomaly" 
            value={`${selectedRegion.demand_anomaly_zscore > 0 ? '+' : ''}${selectedRegion.demand_anomaly_zscore.toFixed(2)}`}
            subtitle="σ above seasonal"
            icon={<TrendingUp />}
            lastUpdated={lastUpdated}
          />
          <MetricTile 
            title="Temp vs Normal" 
            value={`${selectedRegion.temperature_vs_normal > 0 ? '+' : ''}${selectedRegion.temperature_vs_normal.toFixed(1)}°F`}
            icon={<Thermometer />}
            lastUpdated={lastUpdated}
          />
        </div>

        {/* AI Analysis Card with subtle gradient */}
        <div 
          className="bg-gradient-to-br from-[#0d0d14] to-[#111118] shadow-lg rounded-2xl border border-[#1e1e2e] p-5 relative overflow-hidden flex-grow transition-all duration-300"
          style={{ borderLeftWidth: '3px', borderLeftColor: riskColor }}
        >
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-2">AI Analysis</span>
          <p className="text-gray-300 text-sm leading-relaxed">
            {generateAIReason(selectedRegion)}
          </p>
        </div>
      </div>

      {/* Right Column - Chart Presentation */}
      <div className="w-full lg:w-[60%] bg-[#111118]/80 backdrop-blur-lg rounded-2xl border border-[#1e1e2e] p-5 flex flex-col min-h-[350px] shadow-xl relative z-10">
        <ForecastChart 
          forecastData={forecastData} 
          selectedRegion={selectedRegion}
          riskLevel={selectedRegion.risk_level}
        />
      </div>
    </div>
  );
}
