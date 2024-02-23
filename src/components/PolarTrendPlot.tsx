import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PolarTrendPlot = ({ sensorData, temperatureUnit }) => {
  const [polarData, setPolarData] = useState({
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      backgroundColor: [],
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    if (sensorData) {
      const labels = sensorData.map(sensor => sensor.name);
      const data = sensorData.map(sensor => {
        return temperatureUnit === 'Fahrenheit' ? (sensor.temperature * 9/5) + 32 : sensor.temperature;
      });
      const backgroundColor = sensorData.map(sensor => {
        if (sensor.status === 'green') return 'rgba(75, 192, 192, 0.2)';
        if (sensor.status === 'yellow') return 'rgba(255, 206, 86, 0.2)';
        if (sensor.status === 'red') return 'rgba(255, 99, 132, 0.2)';
        return 'rgba(201, 203, 207, 0.2)'; // default color
      });

      setPolarData({
        labels,
        datasets: [{
          label: 'Temperature',
          data,
          backgroundColor,
          borderWidth: 1,
        }],
      });
    }
  }, [sensorData, temperatureUnit]);

  return (
    <div>
      <h2>Polar Trend Plot</h2>
      <PolarArea data={polarData} />
    </div>
  );
};

export default PolarTrendPlot;