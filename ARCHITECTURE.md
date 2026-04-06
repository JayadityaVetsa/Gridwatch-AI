# Architecture - Gridwatch AI

This document provides a high-level overview of the Gridwatch AI data pipeline from raw source data to the frontend React application.

### 1. Data Ingestion
- **Energy Information Administration (EIA) API**: We continuously ingest regional grid load data.
- **NOAA & AirNow APIs**: Concurrent ingestion of temperature datasets and air quality indexes.

### 2. Feature Engineering
The raw data is processed into standardized features:
- `demand_anomaly_zscore`: Calculated from a 30-day rolling baseline to detect sudden demand spikes.
- `temperature_vs_normal`: Evaluating current temperature deviation from seasonal norms.

### 3. Machine Learning Inference
A Scikit-Learn `GradientBoostingRegressor` Model predicts an initial `raw_risk_coefficient`.
- The model is trained on historical blackout data.
- The coefficient is mapped to an outage probability between 0 and 1 via a sigmoid calibration function.

### 4. Cascade Propagation Graph
To capture the reality of an interconnected grid framework:
- A network graph characterizes the interconnected nature of the 9 regions.
- Adjacent regions exerting high stress apply a 'contagion penalty' to neighbors.
- This outputs a final `cascade_risk_score` (0-100) and discrete `risk_level` categorical mapping.

### 5. Backend Server API
- Deployed as a scalable FastAPI application, exposed at `gridwatch-api.hub.zerve.cloud`.
- Combines the real-time inference points and a 72-hour `forecast` array.

### 6. Frontend React Dashboard
- Built with React, Vite, and Tailwind.
- Utilizes `useGridData` polling the API every 60 seconds.
- Interactive geographic visualizations with `react-simple-maps` and analytical plotting with `recharts`.
