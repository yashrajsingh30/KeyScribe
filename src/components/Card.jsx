import React from 'react';
export default function Card({ children, glass=false }) {
  const base = 'rounded-2xl shadow-lg p-6 mb-6 transition-colors duration-500 ease-in-out';
  return (
    <div className={glass ? `${base} card-glass` : `${base} bg-white dark:bg-neutral-800`}> {children} </div>
  );
}