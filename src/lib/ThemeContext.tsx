// Defining the ThemeProvider component that provides the theme state and toggle function to its children
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State hook to manage the 'isDark' theme. Checks localStorage for the saved theme on initial render.
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Function to toggle the 'isDark' state between true and false
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Side-effect to apply the theme to the body and html elements whenever 'isDark' changes
  useEffect(() => {
    const themeClass = isDark ? 'dark' : '';
    document.body.className = themeClass;
    document.documentElement.className = themeClass;

    localStorage.setItem('theme', isDark ? 'dark' : '');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access theme context, ensuring it is used within a ThemeProvider
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
