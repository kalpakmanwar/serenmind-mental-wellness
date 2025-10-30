import { useState, useEffect } from 'react';
import type { Theme } from '@/types';
import { storage } from '@/utils/helpers';

// =========================================
// useTheme Hook
// =========================================

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get theme from localStorage or default to 'light'
    const storedTheme = storage.get<Theme>('theme');
    return storedTheme || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme class
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    storage.set('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };
};

