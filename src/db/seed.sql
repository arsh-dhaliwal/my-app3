-- Seed data for ThermWatch database

-- Insert Company Profile
INSERT INTO Company (CompanyName, Address, City, StateProvince, Country, ZipPostalCode, PhoneNumber, Email) VALUES
('Example Company', '1234 Industrial Way', 'Anytown', 'State', 'Country', '12345', '123-456-7890', 'contact@example.com');

-- Insert Plant Profile
INSERT INTO Plant (PlantName, Address, City, StateProvince, Country, ZipPostalCode, PhoneNumber, Email) VALUES
('Main Plant', '4567 Manufacturing Rd', 'Anytown', 'State', 'Country', '12345', '123-456-7891', 'plantcontact@example.com');

-- Assuming Plant ID is auto-incremented and the first plant has ID 1
-- Insert Asset Profile
INSERT INTO Asset (AssetName, PlantID, Capacity, Rating, TemperatureThreshold) VALUES
('Reactor 1', 1, '2000', 'A', 100),
('Storage Tank A', 1, '5000', 'B', 50);

-- Assuming Asset ID is auto-incremented and the first asset has ID 1
-- Insert Sensor Profile
INSERT INTO Sensor (SensorName, SensorFamily, SensorType, SensorVariant, AssetID, Position) VALUES
('TempSensor1', 'ThermoPro', 'Thermocouple', 'K', 1, 'Top'),
('TempSensor2', 'ThermoPro', 'Thermocouple', 'K', 1, 'Bottom'),
('TempSensor3', 'ThermoPro', 'Thermocouple', 'K', 2, 'Side');

-- Note: The actual values for Company, Plant, Asset, and Sensor profiles should be replaced with real data.
-- The above statements are placeholders for demonstration purposes.