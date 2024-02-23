import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSensorData } from '../hooks/useSensorData';

interface HistoricTrendPlotProps {
  sensorId: string;
}

const HistoricTrendPlot: React.FC<HistoricTrendPlotProps> = ({ sensorId }) => {
  const [historicData, setHistoricData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const { getHistoricSensorData } = useSensorData();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoricSensorData(sensorId);
      setHistoricData({
        labels: data.map(d => d.date),
        datasets: [
          {
            ...historicData.datasets[0],
            data: data.map(d => d.temperature),
          },
        ],
      });
    };

    fetchData();
  }, [sensorId]);

  return (
    <div className="historic-trend-plot">
      <h3>Historic Temperature Data</h3>
      <Line data={historicData} />
    </div>
  );
};

export default HistoricTrendPlot;