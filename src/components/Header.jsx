// src/components/Header.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import Logo      from './Logo';
import DarkToggle from './DarkToggle';
import { useAuth } from './AuthContext';

export default function Header({ onOpenAIMobile }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 transition-colors duration-500 ease-in-out">
      <Logo className="h-12 w-26" />

      <div className="flex items-center space-x-2">
        <span className="hidden sm:block text-sm text-neutral-700 dark:text-neutral-300">
          {user.email}
        </span>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button
          className="md:hidden p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          onClick={onOpenAIMobile}
          aria-label="Open AI panel"
        >
          <Menu className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
        </button>
        <DarkToggle />
      </div>
    </header>
  );
}
