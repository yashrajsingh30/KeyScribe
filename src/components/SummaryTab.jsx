import React, { useState } from 'react';
import SummarizeButton from './SummarizeButton';
import SummaryPanel    from './SummaryPanel';
import TagChips        from './TagChips';

export default function SummaryTab({
  note,
  summary,
  tags,
  onSummarize,
  onBulletClick,
  filterWord,
  onClearFilter
}) {
  const [loading, setLoading] = useState(false);

  // If no note selected
  if (!note) {
    return <p className="text-center text-neutral-500">Select or create a note to summarize.</p>;
  }

  // Filter the bullets array if filterWord is set
  const displayed = filterWord
    ? summary.filter(b => b.toLowerCase().includes(filterWord.toLowerCase()))
    : summary;

  return (
    <div className="space-y-4">
      <SummarizeButton
        text={note.content}
        length="medium"
        setLoading={setLoading}
        onSummarize={onSummarize}
      />

      <SummaryPanel
        summary={displayed}
        loading={loading}
        onBulletClick={onBulletClick}
      />

      {/* Clear filter button */}
      {filterWord && (
        <div className="text-right">
          <button
            onClick={() => {
              console.log('🧹 SummaryTab calling onClearFilter');
              onClearFilter();
            }}
            className="text-sm text-neutral-500 hover:underline"
          >
            Clear filter “{filterWord}”
          </button>
        </div>
      )}

      <TagChips tags={tags} onClickTag={() => {}} />
    </div>
  );
}
