import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sensor } from '../types/index.d';

interface TemperatureCardProps {
  sensor: Sensor;
  temperature: number;
  alarmStatus: string;
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ sensor, temperature, alarmStatus }) => {
  const { theme } = useTheme();

  const getCardColor = () => {
    switch (alarmStatus) {
      case 'green':
        return 'card--green';
      case 'yellow':
        return 'card--yellow';
      case 'red':
        return 'card--red';
      default:
        return '';
    }
  };

  return (
    <div className={`temperature-card ${getCardColor()} ${theme}`}>
      <div className="temperature-card__header">
        <h3>{sensor.name}</h3>
      </div>
      <div className="temperature-card__body">
        <p>Temperature: {temperature}°</p>
        <p>Status: {alarmStatus}</p>
      </div>
    </div>
  );
};

export default TemperatureCard;