// src/components/TagsTab.jsx
import React, { useState } from 'react';

export default function TagsTab({ summary = [], tags = [] }) {
  const [selectedTag, setSelectedTag] = useState(null);

  if (!tags.length) {
    return (
      <p className="text-center text-neutral-500">
        No tags available. Run a summary first.
      </p>
    );
  }

  // Filter bullets by the selected tag (case-insensitive)
  const filtered = selectedTag
    ? summary.filter(b =>
        b.toLowerCase().includes(selectedTag.toLowerCase())
      )
    : summary;

  return (
    <div className="space-y-4">
      {/* Tag picker */}
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm transition
              ${tag === selectedTag
                ? 'bg-primary text-white'
                : 'bg-secondary/20 text-secondary hover:bg-secondary/30'}
            `}
          >
            {tag}
          </button>
        ))}
        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            className="px-3 py-1 rounded-full text-sm bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Filtered bullets */}
      {filtered.length ? (
        <ul className="list-disc list-inside space-y-2">
          {filtered.map((bullet, i) => (
            <li key={i} className="hover:text-primary transition">
              {bullet}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-neutral-500">
          No bullets match “{selectedTag}.”
        </p>
      )}
    </div>
  );
}
