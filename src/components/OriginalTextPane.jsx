import React from 'react';
export default function OriginalTextPane({ text, highlights }) {
  return (
    <div>
      <h2 className="
        text-lg font-semibold mb-2
        text-neutral-900 dark:text-neutral-100
      ">Original Text</h2>
      <pre className="
        w-full max-h-48 overflow-y-auto p-4
        bg-neutral-50 text-neutral-900           /* light-mode paper */
        dark:bg-neutral-800 dark:text-neutral-100 /* dark-mode paper */
        rounded-lg border border-neutral-200 dark:border-neutral-700
        whitespace-pre-wrap
      ">
        {text || 'No text to show.'}
      </pre>
    </div>
  );
}