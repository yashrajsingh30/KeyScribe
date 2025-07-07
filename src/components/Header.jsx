import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';
export default function Header() {
  const [dark, setDark] = useDarkMode();
  return (
    <header className="flex justify-between items-center p-6 mb-8">
      <h1 className="text-3xl font-semibold text-primary">KeyScribe</h1>
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700"
      >
        {dark ? <Sun size={20}/> : <Moon size={20}/>}
      </button>
    </header>
  );
}