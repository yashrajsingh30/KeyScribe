// src/components/DarkToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export default function DarkToggle({ className = '' }) {
  const [dark, setDark] = useDarkMode();

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
      className={`${className}
        p-2 rounded-full
        bg-neutral-200 dark:bg-neutral-700
        hover:bg-neutral-300 dark:hover:bg-neutral-600
        transition-colors duration-200
      `}
    >
      {dark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800" />
      )}
    </button>
  );
}
