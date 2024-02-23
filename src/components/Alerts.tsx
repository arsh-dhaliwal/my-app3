import React, { useState, useEffect } from 'react';
import { useAlerts } from '../hooks/useAlerts';

interface AlertProps {
  temperatureThreshold: number;
  averageTemperatureTrend: number;
  temperatureTrendDays: number;
}

const Alerts: React.FC<AlertProps> = ({ temperatureThreshold, averageTemperatureTrend, temperatureTrendDays }) => {
  const { alarmStatus, updateAlarmStatus } = useAlerts();
  const [statusColor, setStatusColor] = useState('green');

  useEffect(() => {
    // Logic to determine the color of the status indicator based on the alarm status
    if (alarmStatus === 'red') {
      setStatusColor('red');
    } else if (alarmStatus === 'yellow') {
      setStatusColor('yellow');
    } else {
      setStatusColor('green');
    }
  }, [alarmStatus]);

  useEffect(() => {
    // Logic to check temperature trends and update alarm status accordingly
    if (averageTemperatureTrend >= temperatureThreshold) {
      updateAlarmStatus('red');
    } else if (averageTemperatureTrend >= (temperatureThreshold * temperatureTrendDays) / 100) {
      updateAlarmStatus('yellow');
    } else {
      updateAlarmStatus('green');
    }
  }, [averageTemperatureTrend, temperatureThreshold, temperatureTrendDays, updateAlarmStatus]);

  return (
    <div className={`alert-container status-${statusColor}`}>
      <div className="alert-header">
        <h2>Alerts and Alarms</h2>
      </div>
      <div className="alert-status">
        <span>Status:</span>
        <div className={`status-indicator ${statusColor}`}></div>
      </div>
      <div className="alert-details">
        {alarmStatus === 'red' && <p>Immediate intervention required. Temperature exceeds the threshold.</p>}
        {alarmStatus === 'yellow' && <p>Review required. Significant increase in temperature trend detected.</p>}
        {alarmStatus === 'green' && <p>Everything is good. No immediate action required.</p>}
      </div>
    </div>
  );
};

export default Alerts;