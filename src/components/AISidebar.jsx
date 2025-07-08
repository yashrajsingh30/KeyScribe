import React from 'react';

export default function AISidebar({ note }) {
  return (
    <aside className="p-4 border-l space-y-4">
      {/* Your AI panels go here */}
      <p>AI Tools will show up for note: {note?.title || 'None'}</p>
    </aside>
  );
}