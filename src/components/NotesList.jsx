// src/components/NotesList.jsx
import React from 'react';

export default function NotesList({ notes, selectedId, onSelect, onNew }) {
  return (
    <aside className="p-4 border-r space-y-4">
      <ul className="space-y-1">
        {notes.map(n => (
          <li key={n.$id}>
            <button
              onClick={() => onSelect(n.$id)}
              className={`
                block w-full text-left px-2 py-1 rounded
                ${n.$id === selectedId
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'}
              `}
            >
              {n.title || 'Untitled Note'}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onNew}
        className="mt-4 w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition"
      >
        + New Note
      </button>
    </aside>
  );
}
