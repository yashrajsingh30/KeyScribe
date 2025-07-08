// src/components/ContextTab.jsx
import React from 'react';

export default function ContextTab({
  note,
  summary,
  highlightIdx,
  onParagraphClick
}) {
  if (!note) {
    return (
      <p className="text-center text-neutral-500">
        Select a note to view its full content.
      </p>
    );
  }

  // Split text on double‐newlines (paragraph breaks)
  const paragraphs = note.content.split(/\n{2,}/g);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Full Note</h3>

      <div className="space-y-2">
        {paragraphs.map((para, idx) => {
          const isHighlighted = idx === highlightIdx;
          return (
            <p
              key={idx}
              onClick={() => onParagraphClick(idx)}
              className={`
                whitespace-pre-wrap p-2 rounded cursor-pointer
                ${isHighlighted
                  ? 'bg-yellow-100 dark:bg-yellow-900 animate-pulse'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'}
              `}
            >
              {para}
            </p>
          );
        })}
      </div>

      {summary.length > 0 && (
        <>
          <h4 className="text-md font-semibold">
            Or click a bullet to highlight above
          </h4>
          <ul className="list-disc list-inside space-y-1">
            {summary.map((b, i) => (
              <li
                key={i}
                onClick={() => onParagraphClick(i)}
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
