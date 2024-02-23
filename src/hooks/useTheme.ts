import { useState, useEffect } from 'react';

// Custom hook to manage theme state
export const useTheme = () => {
  // State to hold the current theme ('light' or 'dark')
  const [theme, setTheme] = useState('light');

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Function to apply the theme to the document body
  const applyTheme = (themeValue: string) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeValue);
  };

  // Effect to load the theme from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  return {
    theme,
    toggleTheme,
  };
};