-- Schema for ThermWatch Database
-- This SQL script initializes the database for the ThermWatch application
-- It creates tables for company, plant, asset, and sensor profiles

-- Drop tables if they already exist to start fresh
DROP TABLE IF EXISTS Company;
DROP TABLE IF EXISTS Plant;
DROP TABLE IF EXISTS Asset;
DROP TABLE IF EXISTS Sensor;

-- Create Company table
CREATE TABLE Company (
    CompanyID INTEGER PRIMARY KEY AUTOINCREMENT,
    CompanyName TEXT NOT NULL,
    Address TEXT NOT NULL,
    City TEXT NOT NULL,
    StateProvince TEXT NOT NULL,
    Country TEXT NOT NULL,
    ZipPostalCode TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    Email TEXT NOT NULL
);

-- Create Plant table
CREATE TABLE Plant (
    PlantID INTEGER PRIMARY KEY AUTOINCREMENT,
    PlantName TEXT NOT NULL,
    Address TEXT NOT NULL,
    City TEXT NOT NULL,
    StateProvince TEXT NOT NULL,
    Country TEXT NOT NULL,
    ZipPostalCode TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    Email TEXT NOT NULL,
    CompanyID INTEGER,
    FOREIGN KEY (CompanyID) REFERENCES Company (CompanyID) ON DELETE SET NULL
);

-- Create Asset table
CREATE TABLE Asset (
    AssetID INTEGER PRIMARY KEY AUTOINCREMENT,
    AssetName TEXT NOT NULL,
    PlantID INTEGER NOT NULL,
    Capacity REAL,
    Rating TEXT,
    TemperatureThreshold REAL NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plant (PlantID) ON DELETE CASCADE
);

-- Create Sensor table
CREATE TABLE Sensor (
    SensorID INTEGER PRIMARY KEY AUTOINCREMENT,
    SensorName TEXT NOT NULL,
    SensorFamily TEXT NOT NULL,
    SensorType TEXT NOT NULL,
    SensorVariant TEXT,
    AssetID INTEGER NOT NULL,
    Position INTEGER NOT NULL,
    FOREIGN KEY (AssetID) REFERENCES Asset (AssetID) ON DELETE CASCADE
);

-- Indexes for faster search
CREATE INDEX idx_company_name ON Company (CompanyName);
CREATE INDEX idx_plant_name ON Plant (PlantName);
CREATE INDEX idx_asset_name ON Asset (AssetName);
CREATE INDEX idx_sensor_name ON Sensor (SensorName);