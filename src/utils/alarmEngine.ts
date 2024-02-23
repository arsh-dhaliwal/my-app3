```typescript
import { Sensor } from '../types/index';
import { sendNotification, sendEmailAlert } from './helpers';

interface AlarmConfig {
  yellowAlertPercentage: number;
  yellowAlertDays: number;
  redAlertThreshold: number;
}

export class AlarmEngine {
  private config: AlarmConfig;

  constructor(config: AlarmConfig) {
    this.config = config;
  }

  public updateConfig(newConfig: AlarmConfig): void {
    this.config = newConfig;
  }

  public checkTemperatureAlerts(sensor: Sensor, temperatureData: number[]): void {
    const { yellowAlertPercentage, yellowAlertDays, redAlertThreshold } = this.config;
    const currentTemperature = temperatureData[temperatureData.length - 1];
    const averageTemperature = this.calculateAverage(temperatureData);

    if (currentTemperature >= redAlertThreshold) {
      this.triggerAlarm(sensor, 'red');
    } else if (this.isTrendIncreasing(temperatureData, yellowAlertPercentage, yellowAlertDays)) {
      this.triggerAlarm(sensor, 'yellow');
    } else {
      this.triggerAlarm(sensor, 'green');
    }
  }

  private triggerAlarm(sensor: Sensor, status: 'green' | 'yellow' | 'red'): void {
    switch (status) {
      case 'red':
        sendNotification(`Red Alert: Temperature for ${sensor.name} exceeds the threshold.`);
        sendEmailAlert(`Red Alert: Temperature for ${sensor.name} exceeds the threshold.`);
        break;
      case 'yellow':
        sendNotification(`Yellow Alert: Temperature for ${sensor.name} is trending upwards.`);
        break;
      case 'green':
        // No action needed if everything is good
        break;
    }
  }

  private calculateAverage(temperatures: number[]): number {
    return temperatures.reduce((acc, val) => acc + val, 0) / temperatures.length;
  }

  private isTrendIncreasing(temperatures: number[], percentage: number, days: number): boolean {
    if (temperatures.length < days) {
      return false;
    }

    const recentTemperatures = temperatures.slice(-days);
    const oldAverage = this.calculateAverage(temperatures.slice(0, -days));
    const newAverage = this.calculateAverage(recentTemperatures);
    const increase = (newAverage - oldAverage) / oldAverage;

    return increase >= percentage / 100;
  }
}
```