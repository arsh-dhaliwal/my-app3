import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSensorData } from '../hooks/useSensorData';

interface ChartComponentProps {
  sensorId: string;
  toggleUnit: boolean; // true for Celsius, false for Fahrenheit
}

const ChartComponent: React.FC<ChartComponentProps> = ({ sensorId, toggleUnit }) => {
  const [chartData, setChartData] = useState({});
  const { getSensorData } = useSensorData();

  useEffect(() => {
    const fetchData = async () => {
      const sensorData = await getSensorData(sensorId);
      const data = {
        labels: sensorData.map((data) => data.time),
        datasets: [
          {
            label: 'Temperature',
            data: sensorData.map((data) => toggleUnit ? data.temperatureC : data.temperatureF),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };
      setChartData(data);
    };

    fetchData();
  }, [sensorId, toggleUnit, getSensorData]);

  return (
    <div>
      <h3>Real-Time Temperature Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;