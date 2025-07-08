// src/components/WordCloudTab.jsx
import React, { useMemo } from 'react';

export default function WordCloudTab({ summary = [], onWordClick }) {
  // Build frequency map
  const words = useMemo(() => {
    const freq = {};
    summary.forEach(sentence =>
      sentence
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .forEach(w => {
          if (w.length < 4) return;         // skip tiny words
          freq[w] = (freq[w] || 0) + 1;
        })
    );
    // [{ text, value }]
    return Object.entries(freq).map(([text, value]) => ({ text, value }));
  }, [summary]);

  if (!words.length) {
    return (
      <p className="text-center text-neutral-500">
        No data for word cloud. Run a summary first.
      </p>
    );
  }

  // Find min/max to scale font sizes
  const counts = words.map(w => w.value);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);
  const minSize = 1;    // rem
  const maxSize = 2.5;  // rem

  // Helper to compute size rem
  const sizeFor = count =>
    minSize +
    ((count - minCount) / (maxCount - minCount || 1)) * (maxSize - minSize);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {words.map(({ text, value }) => {
          // small random rotation ±15°
          const angle = Math.random() * 30 - 15;
          const size = sizeFor(value).toFixed(2) + 'rem';
          return (
            <button
              key={text}
              onClick={() => onWordClick?.(text)}
              style={{
                fontSize: size,
                transform: `rotate(${angle}deg)`,
              }}
              className="transition hover:text-primary"
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
