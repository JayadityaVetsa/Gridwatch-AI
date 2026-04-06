import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { getColorForRisk } from '../utils/riskColors';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function GridMap({ regionsData, selectedRegionId, onSelectRegion }) {
  return (
    <div className="w-full h-full relative bg-[#0d0d14] overflow-hidden border-b border-[#1e1e2e]" style={{
      backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}>
      <ComposableMap projection="geoAlbersUsa" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e1e2e"
                  stroke="#2a2a3e"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#242436" },
                    pressed: { outline: "none" }
                  }}
                />
              ))}
            </>
          )}
        </Geographies>

        {regionsData.map(region => {
          const isSelected = selectedRegionId === region.region;
          const riskColor = getColorForRisk(region.risk_level);
          const outagePct = (region.outage_probability * 100).toFixed(1);
          const showPulse = region.risk_level === 'High' || region.risk_level === 'Critical';

          return (
            <Marker 
              key={region.region} 
              coordinates={[region.center_lon, region.center_lat]}
              onClick={() => onSelectRegion(region)}
              onMouseEnter={(e) => {
                const tooltip = document.getElementById('map-tooltip');
                if (tooltip) {
                  tooltip.style.display = 'block';
                  tooltip.style.left = `${e.pageX + 10}px`;
                  tooltip.style.top = `${e.pageY + 10}px`;
                  tooltip.innerHTML = `<strong>${region.full_state_name}</strong><br/><span style="color:${riskColor}">${region.risk_level} Risk</span>`;
                }
              }}
              onMouseLeave={() => {
                const tooltip = document.getElementById('map-tooltip');
                if (tooltip) tooltip.style.display = 'none';
              }}
              style={{
                default: { outline: "none", cursor: 'pointer' },
                hover: { outline: "none", cursor: 'pointer' },
                pressed: { outline: "none" }
              }}
            >
              {showPulse && (
                <circle 
                  r={36} 
                  fill={riskColor} 
                  opacity={0.3} 
                  className="animate-ping"
                  style={{ transformOrigin: 'center' }}
                />
              )}
              
              <circle
                r={28}
                fill={riskColor}
                opacity={0.9}
                stroke={isSelected ? "#ffffff" : "transparent"}
                strokeWidth={isSelected ? 2 : 0}
                className="transition-all duration-300 hover:opacity-100"
              />
              
              <text
                textAnchor="middle"
                y={-2}
                style={{ fontFamily: 'Inter', fill: '#fff', fontSize: '9px', fontWeight: 'bold' }}
                pointerEvents="none"
              >
                {region.region}
              </text>
              <text
                textAnchor="middle"
                y={10}
                style={{ fontFamily: 'Inter', fill: '#fff', fontSize: '8px' }}
                pointerEvents="none"
              >
                {outagePct}%
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      <div 
        id="map-tooltip" 
        className="fixed z-50 pointer-events-none bg-[#111118] border border-[#1e1e2e] py-1 px-2 rounded shadow-lg text-xs hidden text-white"
      ></div>
    </div>
  );
}

export default memo(GridMap);
