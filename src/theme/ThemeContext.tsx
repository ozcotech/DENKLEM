import React, { createContext, useContext } from 'react';
import { DefaultTheme } from './DefaultTheme';
import type { ThemeType } from './types';

const ThemeContext = createContext<ThemeType>(DefaultTheme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={DefaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);