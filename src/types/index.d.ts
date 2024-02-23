// Types for ThermWatch application

export interface Company {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
}

export interface Plant {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  companyId: number;
}

export interface Asset {
  id: number;
  name: string;
  plantId: number;
  capacity: number;
  rating: number;
  temperatureThreshold: number;
}

export interface Sensor {
  id: number;
  name: string;
  family: string;
  type: string;
  variant: string;
  assetId: number;
  position: number;
}

export interface TemperatureData {
  sensorId: number;
  timestamp: Date;
  value: number;
}

export interface AlarmStatus {
  sensorId: number;
  status: 'green' | 'yellow' | 'red';
  message?: string;
}

export interface SensorSettings {
  modbusEnabled: boolean;
  mqttEnabled: boolean;
  modbusConfig?: ModbusConfig;
  mqttConfig?: MQTTConfig;
}

export interface ModbusConfig {
  host: string;
  port: number;
  unitId: number;
}

export interface MQTTConfig {
  brokerUrl: string;
  topic: string;
  clientId: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  primaryColor: string;
  secondaryColor: string;
}

export interface AlertConfig {
  yellowAlertPercentage: number;
  yellowAlertDays: number;
  redAlertThreshold: number;
}