// src/components/AISidebar.jsx
import React, { useState } from 'react';
import SummaryTab    from './SummaryTab';
import TagsTab       from './TagsTab';
import ContextTab    from './ContextTab';
import WordCloudTab  from './WordCloudTab';
import ExportTab     from './ExportTab';

const TABS = [
  { key: 'summary',   label: 'Summary'    },
  { key: 'tags',      label: 'Tags'       },
  { key: 'context',   label: 'Context'    },
  { key: 'wordcloud', label: 'Word Cloud' },
  { key: 'export',    label: 'Export'     },
];

export default function AISidebar({ note, summary, tags, onSummarize }) {
  const [tab, setTab]                   = useState('summary');
  const [highlightIdx, setHighlightIdx] = useState(null);
  const [filterWord, setFilterWord]     = useState(null);

  return (
    <aside className="w-full flex flex-col border-l bg-neutral-50 dark:bg-neutral-900">
      {/* ——— Scrollable tab bar ——— */}
      <nav
        className="
          sticky top-0 z-10
          flex flex-nowrap overflow-x-auto
          space-x-2 p-4
          bg-neutral-50 dark:bg-neutral-900 border-b
        "
      >
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`
              flex-shrink-0            /* prevent buttons from shrinking */
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

      {/* ——— Panel content ——— */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'summary' && (
          <SummaryTab
            note={note}
            summary={summary}
            tags={tags}
            onSummarize={onSummarize}
            onBulletClick={idx => {
              setHighlightIdx(idx);
              setTab('context');
            }}
            filterWord={filterWord}
            onClearFilter={() => setFilterWord(null)}
          />
        )}
        {tab === 'tags' && <TagsTab note={note} summary={summary} tags={tags} />}
        {tab === 'context' && (
          <ContextTab
            note={note}
            summary={summary}
            highlightIdx={highlightIdx}
            onParagraphClick={idx => {
              setHighlightIdx(idx);
              setTab('summary');
            }}
          />
        )}
        {tab === 'wordcloud' && (
          <WordCloudTab
            summary={summary}
            onWordClick={word => {
              setFilterWord(word);
              setTab('summary');
            }}
          />
        )}
        {tab === 'export' && <ExportTab note={note} summary={summary} tags={tags} />}
      </div>
    </aside>
  );
}
