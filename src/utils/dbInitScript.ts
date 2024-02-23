import { Database } from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, '../db/database.tmdb');

// Check if the database directory exists, if not create it
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize a new database
const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Could not open database', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// SQL statements to create tables
const createCompanyTable = `
CREATE TABLE IF NOT EXISTS Company (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state_province TEXT NOT NULL,
  country TEXT NOT NULL,
  zip_postal_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL
);`;

const createPlantTable = `
CREATE TABLE IF NOT EXISTS Plant (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state_province TEXT NOT NULL,
  country TEXT NOT NULL,
  zip_postal_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES Company (id)
);`;

const createAssetTable = `
CREATE TABLE IF NOT EXISTS Asset (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  plant_id INTEGER NOT NULL,
  capacity REAL NOT NULL,
  rating TEXT NOT NULL,
  temperature_threshold REAL NOT NULL,
  FOREIGN KEY (plant_id) REFERENCES Plant (id)
);`;

const createSensorTable = `
CREATE TABLE IF NOT EXISTS Sensor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sensor_family TEXT NOT NULL,
  sensor_type TEXT NOT NULL,
  sensor_variant TEXT NOT NULL,
  asset_id INTEGER NOT NULL,
  position INTEGER NOT NULL,
  FOREIGN KEY (asset_id) REFERENCES Asset (id)
);`;

// Function to initialize the database with tables
export const initializeDatabase = () => {
  db.serialize(() => {
    db.run(createCompanyTable, (err) => {
      if (err) {
        console.error('Error creating Company table', err);
      } else {
        console.log('Company table created or already exists.');
      }
    });

    db.run(createPlantTable, (err) => {
      if (err) {
        console.error('Error creating Plant table', err);
      } else {
        console.log('Plant table created or already exists.');
      }
    });

    db.run(createAssetTable, (err) => {
      if (err) {
        console.error('Error creating Asset table', err);
      } else {
        console.log('Asset table created or already exists.');
      }
    });

    db.run(createSensorTable, (err) => {
      if (err) {
        console.error('Error creating Sensor table', err);
      } else {
        console.log('Sensor table created or already exists.');
      }
    });
  });
};

// Export the database connection for use in other modules
export const dbConnection = db;

// Close the database connection when the Node.js process ends
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection', err);
    } else {
      console.log('Database connection closed.');
    }
  });
});