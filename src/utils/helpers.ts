```typescript
import { Company, Plant, Asset, Sensor } from '../types/index';

export const formatTemperature = (temperature: number, unit: 'F' | 'C'): string => {
  return `${temperature.toFixed(2)}°${unit}`;
};

export const convertToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const convertToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const getTemperatureColor = (status: 'green' | 'yellow' | 'red'): string => {
  switch (status) {
    case 'green':
      return '#00C853'; // Green for normal
    case 'yellow':
      return '#FFD600'; // Yellow for attention
    case 'red':
      return '#D50000'; // Red for immediate action
    default:
      return '#FFFFFF'; // Default color
  }
};

export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return newValue * 100;
  return ((newValue - oldValue) / oldValue) * 100;
};

export const shouldTriggerYellowAlert = (averageTemperatureTrend: number, thresholdPercentage: number, days: number): boolean => {
  return averageTemperatureTrend >= thresholdPercentage && days >= 1;
};

export const shouldTriggerRedAlert = (temperature: number, threshold: number): boolean => {
  return temperature >= threshold;
};

export const createCompanyProfile = (data: Company): Company => {
  // Implementation to create a new company profile
  // This is a placeholder for actual database interaction code
  return data;
};

export const createPlantProfile = (data: Plant): Plant => {
  // Implementation to create a new plant profile
  // This is a placeholder for actual database interaction code
  return data;
};

export const createAssetProfile = (data: Asset): Asset => {
  // Implementation to create a new asset profile
  // This is a placeholder for actual database interaction code
  return data;
};

export const createSensorProfile = (data: Sensor): Sensor => {
  // Implementation to create a new sensor profile
  // This is a placeholder for actual database interaction code
  return data;
};

export const saveDatabaseState = (): void => {
  // Implementation to save the current state of the database to a local machine
  // This is a placeholder for actual database interaction code
};

export const openDatabase = (filePath: string): void => {
  // Implementation to open a database from the user's machine
  // This is a placeholder for actual database interaction code
};
```