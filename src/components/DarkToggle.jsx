import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkToggle() {
  // On mount, read from localStorage (or default to media query)
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    // fallback to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Whenever isDark changes, update <html> and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else        root.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(d => !d)}
      aria-label="Toggle dark mode"
      className="
        p-2 rounded-full
        bg-neutral-200 dark:bg-neutral-700
        hover:bg-neutral-300 dark:hover:bg-neutral-600
        transition-colors duration-200
      "
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 transform rotate-0 dark:rotate-180" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800 transition-transform duration-300 transform rotate-0 dark:rotate-180" />
      )}
    </button>
  );
}
