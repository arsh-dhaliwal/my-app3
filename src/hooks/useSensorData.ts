import { useState, useEffect } from 'react';
import { Sensor, TemperatureData } from '../types';
import { db } from '../utils/dbInitScript';

interface UseSensorDataResult {
  loading: boolean;
  error: string | null;
  sensorData: TemperatureData[];
  fetchSensorData: (sensorId: number) => void;
}

export const useSensorData = (): UseSensorDataResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<TemperatureData[]>([]);

  const fetchSensorData = async (sensorId: number) => {
    try {
      setLoading(true);
      setError(null);
      // Replace with actual SQL query to fetch sensor data
      const data: TemperatureData[] = await db.all(
        'SELECT * FROM temperature_data WHERE sensor_id = ?',
        sensorId
      );
      setSensorData(data);
    } catch (e) {
      setError('Failed to fetch sensor data');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Example useEffect to fetch data on component mount
  // This can be customized based on when you want to trigger the data fetch
  useEffect(() => {
    // Assuming sensorId is available, replace 1 with actual sensorId
    fetchSensorData(1);
  }, []);

  return { loading, error, sensorData, fetchSensorData };
};