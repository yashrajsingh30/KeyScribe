import React from 'react';
import SummarySkeleton from './SummarySkeleton';
export default function SummaryPanel({ summary, loading, onBulletClick }) {
  if (loading) return <SummarySkeleton />;

  return (
    <div>
      <h2 className="
        text-lg font-semibold mb-2
        text-neutral-900 dark:text-neutral-100
      ">Summary</h2>

      {summary.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          No summary yet.
        </p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {summary.map((item, i) => (
            <li
              key={i}
              onClick={() => onBulletClick(item.context)}
              className="
                cursor-pointer hover:text-primary
                text-neutral-800 dark:text-neutral-200
              "
            >
              {item.bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
