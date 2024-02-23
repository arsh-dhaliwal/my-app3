// src/setupTests.ts

import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';

// Extend the expect functionality for testing-library
configure({ testIdAttribute: 'data-testid' });

// Add custom matchers for jest-dom
import 'jest-canvas-mock';

// This setup file can be used to configure or set up the testing environment before each test.
// Jest will automatically execute this file once before each test file in your project.

// If you need to add global setup for all tests, such as mocking APIs or other global configurations,
// you can do it here.