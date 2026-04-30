import React, { createContext, useContext } from 'react';

export const Theme = {
  colors: {
    background: '#f6f8fb',
    surface: '#ffffff',
    primary: '#E2802F', // Orange (Buttons, selection)
    secondary: '#28A745', // Green (Save, Add, Success)
    error: '#FF1717',     // Red (Delete, Danger)
    warning: '#FF6347',   // Tomato (Close, Warning)
    textPrimary: '#333333',
    textSecondary: '#666666',
    textTertiary: '#888888',
    textHeader: '#676f7b',
    textMuted: '#bec3cc',
    border: '#b0b0b0',
    borderLight: '#bec3cc',
    overlay: 'rgba(0, 0, 0, 0.5)',
  }
};

const ThemeContext = createContext(Theme);

export const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={Theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);