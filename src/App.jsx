import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import GridMap from './components/GridMap';
import DetailPanel from './components/DetailPanel';
import InfoModal from './components/InfoModal';
import { useGridData } from './hooks/useGridData';
import { Zap } from 'lucide-react';

function App() {
  const { data, loading, error, lastUpdated, refetch } = useGridData();
  const [selectedRegionId, setSelectedRegionId] = useState('CALI');
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Derive active selected region object from data
  const selectedRegion = useMemo(() => {
    if (!data?.current) return null;
    return data.current.find(r => r.region === selectedRegionId) || data.current[0] || null;
  }, [data, selectedRegionId]);

  if (loading && (!data.current || data.current.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-gray-400 gap-4">
        <div className="flex items-center gap-3">
          <Zap className="text-blue-500 w-8 h-8 animate-pulse" />
          <h1 className="text-3xl font-bold text-white tracking-wider">Gridwatch AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <p className="animate-pulse">Connecting to grid data...</p>
        </div>
      </div>
    );
  }

  if (error && (!data.current || data.current.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-gray-400 gap-4">
        <div className="bg-[#111118] border border-red-900/50 p-8 rounded-xl max-w-md text-center shadow-red-900/10 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Unable to reach grid API</h2>
          <p className="text-sm text-gray-400 mb-6">{error}</p>
          <button 
            onClick={refetch}
            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded font-medium transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0a0a0f] text-white">
      <Navbar lastUpdated={lastUpdated} onOpenInfo={() => setIsInfoOpen(true)} />
      
      <div className="flex-grow flex flex-col w-full">
        {/* Map Section */}
        <div className="h-[40vh] md:h-[55vh] w-full shrink-0">
          <GridMap 
            regionsData={data.current || []}
            selectedRegionId={selectedRegion?.region}
            onSelectRegion={(region) => setSelectedRegionId(region.region)}
          />
        </div>

        {/* Detail Panel */}
        <div className="flex-grow w-full bg-[#0a0a0f]">
          <DetailPanel 
            selectedRegion={selectedRegion}
            forecastData={data.forecast || []}
            lastUpdated={lastUpdated}
          />
        </div>
      </div>

      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}

export default App;
