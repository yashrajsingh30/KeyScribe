// src/components/SummaryTab.jsx
import React, { useState } from 'react';
import SummarizeButton from './SummarizeButton';
import SummaryPanel    from './SummaryPanel';
import TagChips        from './TagChips';

export default function SummaryTab({
  note,
  summary,
  tags,
  onSummarize
}) {
  const [loading, setLoading] = useState(false);

  if (!note) return <p>Select a note…</p>;

  return (
    <div className="space-y-4">
      <SummarizeButton
        text={note.content}
        length="medium"
        setLoading={setLoading}
        onSummarize={(bullets, extractedTags) => {
          console.log('SummaryTab onSummarize:', extractedTags); // <—
          onSummarize(bullets, extractedTags);
        }}
      />

      <SummaryPanel summary={summary} loading={loading} />

      <TagChips tags={tags} onClickTag={()=>{}} />
    </div>
  );
}
