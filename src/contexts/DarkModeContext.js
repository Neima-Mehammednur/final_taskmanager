


import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadDarkMode();
  }, []);

  const loadDarkMode = async () => {
    try {
      const mode = await AsyncStorage.getItem('darkMode');
      if (mode !== null) {
        setIsDarkMode(mode === 'true');
      }
    } catch (error) {
      console.error('Error loading dark mode:', error);
    }
  };

  const saveDarkMode = async (mode) => {
    try {
      await AsyncStorage.setItem('darkMode', mode.toString());
    } catch (error) {
      console.error('Error saving dark mode:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      saveDarkMode(!prevMode);
      return !prevMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};