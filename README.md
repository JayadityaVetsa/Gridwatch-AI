# Gridwatch AI

Gridwatch AI is a real-time US power grid risk monitoring dashboard designed to predict and visualize power grid cascade failures. It provides live updates and a 72-hour forecast based on a Machine Learning pipeline processing grid load anomalies and climate data.

## ML Architecture
The ML backend generates predictions using a `GradientBoostingRegressor`. 
It processes historically backtested Energy Information Administration (EIA) load data and NOAA climate features. For more details, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Local Development
1. Clone this repository
2. `npm install`
3. Create a `.env` file based on `.env.example`
4. `npm run dev`

## Deployment
This project is Vite-based and ready to be deployed to Vercel:
1. Push to GitHub
2. Import project into Vercel
3. Ensure the framework preset is "Vite"
4. Add the `VITE_ZERVE_API_URL` environment variable if desired (though it falls back to the default API URL automatically).
