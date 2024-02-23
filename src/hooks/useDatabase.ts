import { useState, useEffect } from 'react';
import { openDatabase, saveDatabaseState } from '../utils/helpers';
import { Company, Plant, Asset, Sensor } from '../types/index';

const useDatabase = () => {
  const [db, setDb] = useState(null);

  // Initialize the database when the hook is first used
  useEffect(() => {
    const initializeDb = async () => {
      try {
        const database = await openDatabase('src/db/database.tmdb');
        setDb(database);
        // Additional initialization logic can go here
      } catch (error) {
        console.error('Failed to open the database:', error);
      }
    };

    initializeDb();
  }, []);

  // Function to save the current state of the database to the local machine
  const saveDbState = async () => {
    if (db) {
      try {
        await saveDatabaseState(db, 'src/db/database.tmdb');
      } catch (error) {
        console.error('Failed to save the database state:', error);
      }
    }
  };

  // Function to add or update company profile in the database
  const upsertCompanyProfile = async (companyData: Company) => {
    if (db) {
      // Logic to insert or update company profile in the database
    }
  };

  // Function to add or update plant profile in the database
  const upsertPlantProfile = async (plantData: Plant) => {
    if (db) {
      // Logic to insert or update plant profile in the database
    }
  };

  // Function to add or update asset profile in the database
  const upsertAssetProfile = async (assetData: Asset) => {
    if (db) {
      // Logic to insert or update asset profile in the database
    }
  };

  // Function to add or update sensor profile in the database
  const upsertSensorProfile = async (sensorData: Sensor) => {
    if (db) {
      // Logic to insert or update sensor profile in the database
    }
  };

  return {
    db,
    saveDbState,
    upsertCompanyProfile,
    upsertPlantProfile,
    upsertAssetProfile,
    upsertSensorProfile,
  };
};

export default useDatabase;