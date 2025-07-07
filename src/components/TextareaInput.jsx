import React from 'react';

export default function TextareaInput({ value, onChange, className = '' }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Paste notes here…"
      className={`
        w-full h-32 p-4
        bg-neutral-100 text-neutral-900           /* light */
        dark:bg-neutral-700 dark:text-neutral-100 /* dark */
        border border-neutral-300 dark:border-neutral-600
        rounded-lg
        placeholder-neutral-500 dark:placeholder-neutral-400
        focus:outline-none focus:ring-2 focus:ring-primary
        ${className}
      `}
    />
  );
}