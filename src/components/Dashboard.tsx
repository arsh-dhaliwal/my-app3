import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';
import PolarTrendPlot from './PolarTrendPlot';
import HistoricTrendPlot from './HistoricTrendPlot';
import TemperatureCard from './TemperatureCard';
import { useSensorData } from '../hooks/useSensorData';
import { useTheme } from '../hooks/useTheme';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<number | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const { temperatureData, alarmStatus } = useSensorData(selectedPlant, selectedAsset);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Fetch initial data or set up subscriptions here
  }, []);

  const handlePlantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(parseInt(event.target.value));
  };

  const handleAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAsset(parseInt(event.target.value));
  };

  return (
    <div className={`dashboard ${theme}`}>
      <div className="dashboard-header">
        <div className="dashboard-selection">
          <select onChange={handlePlantChange}>
            {/* Options should be populated with plant data */}
          </select>
          <select onChange={handleAssetChange}>
            {/* Options should be populated with asset data */}
          </select>
        </div>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="dashboard-content">
        <div className="temperature-cards-container">
          {temperatureData.map(sensor => (
            <TemperatureCard
              key={sensor.id}
              sensorId={sensor.id}
              temperature={sensor.temperature}
              alarmStatus={alarmStatus[sensor.id]}
            />
          ))}
        </div>
        <div className="charts-container">
          <ChartComponent data={temperatureData} />
          <PolarTrendPlot data={temperatureData} />
        </div>
        <div className="historic-data-container">
          <HistoricTrendPlot data={temperatureData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;