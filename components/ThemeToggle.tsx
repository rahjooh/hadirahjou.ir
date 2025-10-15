'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'hadirahjou-theme';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemPreference: Theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = stored ?? systemPreference;
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
    </button>
  );
}
