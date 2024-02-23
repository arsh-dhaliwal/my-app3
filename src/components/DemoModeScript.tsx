import React from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { mockDataGenerator } from '../utils/mockDataGenerator';

const DemoModeScript: React.FC = () => {
  const { initializeDatabase, saveDatabaseState } = useDatabase();

  const handleDemoMode = async () => {
    // Initialize the database with mock data
    await initializeDatabase();
    
    // Generate mock data for company, plant, asset, and sensor profiles
    const mockData = mockDataGenerator();
    
    // Save the generated mock data to the database
    await saveDatabaseState(mockData);

    // Notify the user that the demo mode has been activated and the mock data is ready
    alert('Demo mode activated. Mock data has been generated and saved to the database.');
  };

  return (
    <button id="demo-mode-button" onClick={handleDemoMode}>
      Demo Mode
    </button>
  );
};

export default DemoModeScript;