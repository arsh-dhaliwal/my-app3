```typescript
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import Alerts from './components/Alerts';
import DAQConfiguration from './components/DAQConfiguration';
import AppConfiguration from './components/AppConfiguration';
import { ThemeProvider } from './hooks/useTheme';
import { DatabaseProvider } from './hooks/useDatabase';
import './styles/main.css';

const App: React.FC = () => {
  const [isAppConfigModalOpen, setAppConfigModalOpen] = useState(true);

  useEffect(() => {
    // TODO: Initialize the database using the initializeDatabase function
    // from the utils/dbInitScript.ts file
  }, []);

  const handleAppConfigModalClose = () => {
    setAppConfigModalOpen(false);
  };

  return (
    <ThemeProvider>
      <DatabaseProvider>
        <div className="App">
          <Navigation />
          <main>
            {isAppConfigModalOpen && (
              <AppConfiguration onClose={handleAppConfigModalClose} />
            )}
            <Dashboard />
          </main>
          <Settings />
          <DAQConfiguration />
          <Alerts />
        </div>
      </DatabaseProvider>
    </ThemeProvider>
  );
};

export default App;
```

This code snippet represents the `src/App.tsx` file for the ThermWatch application. It sets up the main React component structure, including state management for the App Configuration modal and the necessary providers for theme and database context. The `useEffect` hook is prepared for database initialization, which should be implemented with the actual database initialization logic. Components for the dashboard, settings, navigation, DAQ configuration, and alerts are imported and used within the main app component. The `ThemeProvider` and `DatabaseProvider` are used to wrap the application, providing theme and database context to the entire app.