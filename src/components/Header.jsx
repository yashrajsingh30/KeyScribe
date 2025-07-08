// src/components/Header.jsx
import React from 'react';
import Logo from './Logo';
import DarkToggle from './DarkToggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo className="h-10" />
      <DarkToggle />
    </header>
  );
}
