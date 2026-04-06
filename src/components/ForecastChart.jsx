import React, { useMemo } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getColorForRisk } from '../utils/riskColors';

export default function ForecastChart({ forecastData, selectedRegion, riskLevel }) {
  const chartData = useMemo(() => {
    if (!forecastData || forecastData.length === 0) return [];
    // Filter and sort
    const regionData = forecastData
      .filter(item => item.region === selectedRegion?.region)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return regionData.map(d => ({
      ...d,
      timeLabel: new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', hour12: true }).format(new Date(d.timestamp)),
      outagePct: parseFloat((d.outage_probability * 100).toFixed(1))
    }));
  }, [forecastData, selectedRegion]);

  const riskColor = getColorForRisk(riskLevel);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111118] border border-[#1e1e2e] p-3 rounded shadow-lg text-sm">
          <p className="text-gray-300 font-medium mb-2">{label}</p>
          <div className="flex flex-col gap-1">
            <p style={{ color: payload[0].stroke }}>
              <span className="font-semibold">Outage Prob:</span> {payload[0].value}%
            </p>
            {payload[1] && (
              <p style={{ color: payload[1].stroke }}>
                <span className="font-semibold">Cascade Score:</span> {payload[1].value}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (!chartData.length) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500">
        No forecast data available
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col pt-2">
      <h3 className="text-white text-sm font-semibold mb-4 px-2">
        72-Hour Forecast — {selectedRegion?.full_state_name || 'Region'}
      </h3>
      <div className="flex-grow min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOutage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={riskColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={riskColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis 
              dataKey="timeLabel" 
              stroke="#6b7280" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={11} // Show roughly every 12th label
              dy={10}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'High Risk Threshold', fill: '#ef4444', fontSize: 10 }} />
            
            <Area 
              type="monotone" 
              dataKey="outagePct" 
              stroke={riskColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorOutage)" 
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="cascade_risk_score" 
              stroke="#14b8a6" 
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
