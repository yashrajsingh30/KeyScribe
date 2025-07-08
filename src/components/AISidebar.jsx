// src/components/AISidebar.jsx
import React, { useState } from 'react';
import SummaryTab from './SummaryTab';
import TagsTab    from './TagsTab';
import ContextTab from './ContextTab';
import MindMapTab from './MindMapTab';
import ExportTab  from './ExportTab';

const TABS = [
  { key: 'summary', label: 'Summary'  },
  { key: 'tags',    label: 'Tags'     },
  { key: 'context', label: 'Context'  },
  { key: 'mindmap', label: 'Mind Map' },
  { key: 'export',  label: 'Export'   },
];

export default function AISidebar({ note, summary, tags, onSummarize }) {
  const [tab, setTab] = useState('summary');

  return (
    <aside className="p-4 border-l max-h-screen overflow-y-auto">
      {/* Tab Navigation */}
      <nav className="flex space-x-2 mb-4">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`
              px-3 py-1 rounded 
              ${tab === t.key
                ? 'bg-primary text-white'
                : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'}
            `}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Tab Panels */}
      <div>
        {tab === 'summary'  && (
          <SummaryTab 
            note={note} 
            summary={summary} 
            tags={tags} 
            onSummarize={onSummarize} 
          />
        )}
        {tab === 'tags' && (
  <TagsTab 
    note={note} 
    summary={summary} 
    tags={tags} 
  />
)}

        {tab === 'context'  && (
          <ContextTab 
            note={note} 
            summary={summary} 
            tags={tags} 
          />
        )}
        {tab === 'mindmap'  && (
          <MindMapTab 
            note={note} 
            summary={summary} 
            tags={tags} 
          />
        )}
        {tab === 'export'   && (
          <ExportTab 
            note={note} 
            summary={summary} 
            tags={tags} 
          />
        )}
      </div>
    </aside>
  );
}
