import React from 'react';
export default function SummarySkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {[...Array(5)].map((_,i)=>(<div key={i} className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"/>))}
    </div>
  );
}