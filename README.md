# ThermWatch

ThermWatch is a temperature monitoring solution designed for high-value assets located inside plants. This React application serves plant operators by providing temperature data insights on assets, enabling better planning and operation of plant facilities.

## Getting Started

To get started with ThermWatch, ensure you have the latest version of Node.js installed on your system. This application uses SQLite for the database and Chart.js for rendering charts.

### Prerequisites

- Node.js (latest version)
- npm (comes with Node.js)

### Installation

1. Clone the repository to your local machine.
   ```
   git clone https://github.com/your-repository/ThermWatch.git
   ```
2. Navigate to the cloned directory.
   ```
   cd ThermWatch
   ```
3. Install the necessary npm packages.
   ```
   npm install
   ```
4. Initialize the SQLite database by running the database initialization script.
   ```
   npm run init-db
   ```

### Running the Application

To start the application, run the following command:
```
npm start
```

The application will be available at `http://localhost:3000` in your web browser.

### Features

- Single page dashboard application with real-time temperature monitoring.
- Ability to toggle between dark and light themes.
- Configurable company, plant, asset, and sensor profiles.
- Data acquisition (DAQ) configuration for integrating with PLC or PFC systems using Modbus and/or MQTT protocols.
- Alerts and alarms for temperature thresholds and trends.
- Demo mode with mock data generation for showcasing application features.

### Configuration

- **App Configurations**: Accessible via the settings icon in the navigation bar, allowing you to configure company, plant, asset, and sensor profiles.
- **DAQ Configuration**: Configure your data acquisition settings through the 'DAQ configuration page'.
- **Alerts and Alarms**: Set up alert rules and alarm thresholds through the alerts configuration.

### Usage

- The main dashboard displays real-time temperature data and alarm statuses.
- Use the selection bar to switch between different plants and assets.
- The settings page allows you to manage application configurations and profiles.

### Contributing

To contribute to ThermWatch, please follow the standard fork and pull request workflow.

### License

This application is intended for commercial use. Please refer to the `LICENSE.txt` file for the full license agreement. The End-User License Agreement (EULA) can be found in the `EULA.txt` file.

### Support

For support, please open an issue in the GitHub repository or contact the maintainers directly.

## Development

This project is built using the following technologies:

- React.js with TypeScript
- SQLite for the database
- Chart.js for charting
- Node.js for the backend

### Directory Structure

- `src/`: Source files for the application.
- `src/components/`: React components for various features.
- `src/hooks/`: Custom React hooks for state management and logic.
- `src/utils/`: Utility scripts for database initialization, mock data generation, and integration with DAQ systems.
- `src/db/`: Database files including schema and seed data.
- `src/styles/`: CSS files for styling the application.

### Adding a Logo

To add your company logo to the application, place the logo image in the `src/assets/` directory and reference it in the `src/components/Navigation.tsx` file.

### Extensive Commenting

The codebase includes extensive commenting to facilitate understanding and modifications. Feel free to explore and adapt the code to your needs.

## Testing

To run the test suite, execute the following command:
```
npm test
```

## Deployment

For deployment instructions, please refer to the deployment section in the documentation.

## Further Help

For more information on how to use or customize ThermWatch, please refer to the inline comments within the codebase and the documentation provided.

---

We hope ThermWatch enhances your plant operations by providing a comprehensive temperature monitoring solution.