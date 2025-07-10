// src/components/Header.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import DarkToggle from './DarkToggle';

export default function Header({ onOpenAIMobile }) {
  return (
    <header className="
      flex items-center justify-between
      p-4 transition-colors duration-500 ease-in-out
    ">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Logo className="h-10 w-auto" />
      </div>

      {/* Controls on the right */}
      <div className="flex items-center space-x-2">
        {/* Mobile menu button (only below md) */}
        <button
          className="md:hidden p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          onClick={onOpenAIMobile}
          aria-label="Open AI panel"
        >
          <Menu className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
        </button>

        {/* Dark mode toggle */}
        <DarkToggle />
      </div>
    </header>
  );
}
