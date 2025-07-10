// src/components/MobileAIDrawer.jsx
import React from 'react';
import AISidebar from './AISidebar';

export default function MobileAIDrawer({
  open,
  onClose,
  note,
  summary,
  tags,
  onSummarize
}) {
  return (
    // Wrapper covers full screen but only intercepts clicks when open,
    // and is hidden on md+.
    <div
      className={`
        fixed inset-0 z-50 md:hidden
        pointer-events-${open ? 'auto' : 'none'}
      `}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black bg-opacity-50
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-3/4
          bg-neutral-50 dark:bg-neutral-900
          rounded-t-3xl shadow-xl
          transform transition-transform duration-300
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* Drag handle */}
        <div className="mx-auto mt-2 mb-4 h-1 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />

        {/* Full-width AI sidebar */}
        <AISidebar
          note={note}
          summary={summary}
          tags={tags}
          onSummarize={onSummarize}
        />
      </div>
    </div>
  );
}
