import { useState, useEffect } from 'react';

const DEFAULT_API_URL = '/api/grid-risk';
const REFRESH_INTERVAL_MS = 60000;

export function useGridData() {
  const [data, setData] = useState({ current: [], forecast: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_ZERVE_API_URL || DEFAULT_API_URL;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const json = await response.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch grid data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}
