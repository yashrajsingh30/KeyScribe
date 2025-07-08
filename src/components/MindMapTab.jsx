// src/components/ContextTab.jsx
import React, { useState } from 'react';

export default function ContextTab({ note, summary }) {
  const [highlightIdx, setHighlightIdx] = useState(null);

  if (!note) {
    return (
      <p className="text-center text-neutral-500">
        Select a note to view its full content.
      </p>
    );
  }

  // Split text into paragraphs for highlighting
  const paragraphs = note.content.split(/\n{2,}/g);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Full Note</h3>
      <div className="space-y-2">
        {paragraphs.map((para, idx) => {
          const isHighlighted = highlightIdx === idx;
          return (
            <p
              key={idx}
              className={`whitespace-pre-wrap p-2 rounded ${
                isHighlighted
                  ? 'bg-yellow-100 dark:bg-yellow-900'
                  : ''
              }`}
            >
              {para}
            </p>
          );
        })}
      </div>

      {summary.length > 0 && (
        <>
          <h4 className="text-md font-semibold">Click a bullet to highlight:</h4>
          <ul className="list-disc list-inside space-y-1">
            {summary.map((b, i) => (
              <li
                key={i}
                onClick={() => setHighlightIdx(i)}
                className="cursor-pointer hover:text-primary transition"
              >
                {b}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
