// src/components/Spinner.jsx
import React from 'react';

export default function Spinner({ size = 6 }) {
  // Tailwind: border-t-2, border-b-2 gives it a dual-colored spinner look
  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-t-2 border-b-2 border-primary
        h-${size} w-${size}
      `}
      role="status"
      aria-label="loading"
    />
  );
}
