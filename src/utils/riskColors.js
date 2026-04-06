export const RISK_COLORS = {
  Low: '#22c55e',
  Moderate: '#f59e0b',
  High: '#f97316',
  Critical: '#ef4444',
  Default: '#6b7280'
};

export const getColorForRisk = (risk) => {
  return RISK_COLORS[risk] || RISK_COLORS.Default;
};
