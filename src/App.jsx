import React, { useState } from 'react';
import TextareaInput from './components/TextareaInput';
import LengthSelector from './components/LengthSelector';
import SummarizeButton from './components/SummarizeButton';
import SummaryPanel from './components/SummaryPanel';
import TagChips from './components/TagChips';
import OriginalTextPane from './components/OriginalTextPane';
import ExportControls from './components/ExportControls';
import MindMapView from './components/MindMapView';



export default function App() {
  // State hooks for text, length, results, tags, context...
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [summaryData, setSummaryData] = useState([]);  // array of {bullet, context}
  const [tags, setTags] = useState([]);
  const [showMindMap, setShowMindMap] = useState(false);
  const [mindMapTree, setMindMapTree] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">KeyScribe</h1>
      <TextareaInput value={text} onChange={setText} />
      <LengthSelector value={length} onChange={setLength} />
      <SummarizeButton
        text={text}
        length={length}
        onSummarize={(data, extractedTags) => {
          setSummaryData(data);
          setTags(extractedTags);
        }}
      />
      <TagChips tags={tags} onClickTag={(tag) => {/* TODO: filter/highlight summaryData */}} />
      <SummaryPanel summary={summaryData} onBulletClick={(context) => {/* TODO: scroll/highlight in OriginalTextPane */}} />
      <OriginalTextPane text={text} highlights={summaryData.map(item => item.context)} />
      <ExportControls summary={summaryData} tags={tags} />
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={() => setShowMindMap(!showMindMap)}
      >
        {showMindMap ? 'Hide Mind Map' : 'View Mind Map'}
      </button>
      {showMindMap && mindMapTree && (
        <MindMapView tree={mindMapTree} />
      )}
    </div>
  );
}