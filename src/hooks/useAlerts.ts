import { useState, useEffect } from 'react';
import { Sensor } from '../types/index';
import { sendNotification, sendEmailAlert } from '../utils/helpers';

interface AlertConfig {
  yellowAlertPercentage: number;
  yellowAlertDays: number;
  redAlertThreshold: number;
}

const useAlerts = (sensors: Sensor[], alertConfig: AlertConfig) => {
  const [alerts, setAlerts] = useState<{ [sensorId: string]: string }>({});

  useEffect(() => {
    const checkAlerts = () => {
      const newAlerts: { [sensorId: string]: string } = {};

      sensors.forEach(sensor => {
        const { temperatureData, temperatureThreshold } = sensor;
        const latestTemperature = temperatureData[temperatureData.length - 1].value;
        const averageTemperature = temperatureData.reduce((acc, data) => acc + data.value, 0) / temperatureData.length;

        // Calculate the percentage increase in average temperature over the last Y days
        const pastTemperatureData = temperatureData.slice(-alertConfig.yellowAlertDays);
        const pastAverageTemperature = pastTemperatureData.reduce((acc, data) => acc + data.value, 0) / pastTemperatureData.length;
        const percentageIncrease = ((averageTemperature - pastAverageTemperature) / pastAverageTemperature) * 100;

        // Check for yellow alert
        if (percentageIncrease >= alertConfig.yellowAlertPercentage) {
          newAlerts[sensor.id] = 'yellow';
          sendNotification(`Temperature trend alert for ${sensor.name}: Increase by ${percentageIncrease.toFixed(2)}% over the last ${alertConfig.yellowAlertDays} days.`);
        }

        // Check for red alert
        if (latestTemperature >= alertConfig.redAlertThreshold || latestTemperature >= temperatureThreshold) {
          newAlerts[sensor.id] = 'red';
          sendNotification(`High temperature alert for ${sensor.name}: Current temperature is ${latestTemperature}°, exceeding the threshold of ${temperatureThreshold}°.`);
          sendEmailAlert(`High temperature alert for ${sensor.name}`, `Current temperature is ${latestTemperature}°, exceeding the threshold of ${temperatureThreshold}°.`);
        }

        // If no alert, set to green
        if (!newAlerts[sensor.id]) {
          newAlerts[sensor.id] = 'green';
        }
      });

      setAlerts(newAlerts);
    };

    checkAlerts();
    // Set an interval to check for alerts periodically
    const intervalId = setInterval(checkAlerts, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [sensors, alertConfig]);

  return alerts;
};

export default useAlerts;