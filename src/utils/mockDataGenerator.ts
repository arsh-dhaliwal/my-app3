import { Company, Plant, Asset, Sensor } from '../types/index';
import { openDatabase, saveDatabaseState } from '../hooks/useDatabase';
import { getRandomInt, getRandomFloat, formatDate } from './helpers';

const generateMockCompanyData = (): Company => {
  return {
    companyName: 'Demo Company',
    address: '123 Demo Street',
    city: 'Demoville',
    stateProvince: 'DemoState',
    country: 'DemoLand',
    zipPostalCode: '12345',
    phoneNumber: '123-456-7890',
    email: 'info@democompany.com',
  };
};

const generateMockPlantData = (): Plant[] => {
  return [
    {
      plantName: 'Demo Plant 1',
      address: '456 Demo Lane',
      city: 'Demoville',
      stateProvince: 'DemoState',
      country: 'DemoLand',
      zipPostalCode: '12345',
      phoneNumber: '123-456-7891',
      email: 'plant1@democompany.com',
    },
    {
      plantName: 'Demo Plant 2',
      address: '789 Demo Road',
      city: 'Demoville',
      stateProvince: 'DemoState',
      country: 'DemoLand',
      zipPostalCode: '12345',
      phoneNumber: '123-456-7892',
      email: 'plant2@democompany.com',
    },
  ];
};

const generateMockAssetData = (plants: Plant[]): Asset[] => {
  return plants.map((plant, index) => ({
    assetName: `Demo Asset ${index + 1}`,
    plantId: index + 1,
    capacity: getRandomInt(100, 1000),
    rating: getRandomInt(1, 5),
    temperatureThreshold: getRandomInt(50, 100),
  }));
};

const generateMockSensorData = (assets: Asset[]): Sensor[] => {
  return assets.flatMap((asset, index) =>
    new Array(5).fill(null).map((_, sensorIndex) => ({
      sensorName: `Sensor ${sensorIndex + 1}`,
      sensorFamily: 'DemoFamily',
      sensorType: 'DemoType',
      sensorVariant: 'DemoVariant',
      assetId: index + 1,
      position: sensorIndex + 1,
    }))
  );
};

const generateHistoricSensorData = (sensors: Sensor[], startDate: Date, endDate: Date) => {
  const historicData = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    sensors.forEach(sensor => {
      const temperature = getRandomFloat(20, 100);
      historicData.push({
        sensorId: sensor.sensorName,
        date: formatDate(date),
        temperature,
      });
    });
  }
  return historicData;
};

const generateRealTimeSensorData = (sensors: Sensor[]) => {
  return sensors.map(sensor => ({
    sensorId: sensor.sensorName,
    timestamp: new Date().toISOString(),
    temperature: getRandomFloat(20, 100),
  }));
};

export const generateMockData = () => {
  const db = openDatabase('src/db/database.tmdb');

  const companyData = generateMockCompanyData();
  const plantData = generateMockPlantData();
  const assetData = generateMockAssetData(plantData);
  const sensorData = generateMockSensorData(assetData);

  // Insert mock data into the database
  db.transaction(tx => {
    tx.executeSql('INSERT INTO Company (...) VALUES (...)', Object.values(companyData));
    plantData.forEach(plant => tx.executeSql('INSERT INTO Plant (...) VALUES (...)', Object.values(plant)));
    assetData.forEach(asset => tx.executeSql('INSERT INTO Asset (...) VALUES (...)', Object.values(asset)));
    sensorData.forEach(sensor => tx.executeSql('INSERT INTO Sensor (...) VALUES (...)', Object.values(sensor)));
  });

  // Generate historic sensor data
  const startDate = new Date('2018-01-01');
  const endDate = new Date();
  const historicSensorData = generateHistoricSensorData(sensorData, startDate, endDate);

  // Insert historic sensor data into the database
  historicSensorData.forEach(data => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO SensorData (...) VALUES (...)', Object.values(data));
    });
  });

  // Generate real-time sensor data
  const realTimeSensorData = generateRealTimeSensorData(sensorData);

  // Insert real-time sensor data into the database
  realTimeSensorData.forEach(data => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO SensorData (...) VALUES (...)', Object.values(data));
    });
  });

  // Save the current state of the database
  saveDatabaseState(db);

  return {
    companyData,
    plantData,
    assetData,
    sensorData,
    historicSensorData,
    realTimeSensorData,
  };
};