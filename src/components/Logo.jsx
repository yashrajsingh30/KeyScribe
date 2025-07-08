// src/components/Logo.jsx
import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        p-0.5                 /* 16px padding */
        w-20 h-24           /* 112px × 96px container */
        rounded-2xl
        bg-white
        dark:bg-neutral-800
        shadow-lg
        ${className}
      `}
    >
      {/* Light mode: dark logo */}
      <img
        src="/logo-transparent-dark.png"
        alt="KeyScribe logo"
        className="block dark:hidden object-contain w-full h-full"
      />
      {/* Dark mode: light logo */}
      <img
        src="/logo-transparent-white.png"
        alt="KeyScribe logo"
        className="hidden dark:block object-contain w-full h-full"
      />
    </div>
  );
}
