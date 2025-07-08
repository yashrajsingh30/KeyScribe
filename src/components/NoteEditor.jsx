// src/components/NoteEditor.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function NoteEditor({ note, onUpdate, onDelete }) {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const isFirstLoad = useRef(true);

  // Reset local inputs when a different note is selected
  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    isFirstLoad.current = true;
  }, [note]);

  // Autosave after typing pauses
  useEffect(() => {
    if (!note) return;
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const handle = setTimeout(() => {
      onUpdate({ ...note, title, content });
    }, 800);
    return () => clearTimeout(handle);
  }, [title, content, note, onUpdate]);

  if (!note) {
    return (
      <div className="p-6 text-center text-neutral-500">
        Select or create a note to begin.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 rounded"
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={12}
        placeholder="Write your note here…"
        className="w-full p-4 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 rounded resize-none"
      />

      <button
        onClick={() => onDelete(note)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Delete Note
      </button>
    </div>
  );
}
