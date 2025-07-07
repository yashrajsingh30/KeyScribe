import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Card from './components/Card.jsx';
import TextareaInput from './components/TextareaInput.jsx';
import LengthSelector from './components/LengthSelector.jsx';
import SummarizeButton from './components/SummarizeButton.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TagChips from './components/TagChips.jsx';
import OriginalTextPane from './components/OriginalTextPane.jsx';
import ExportControls from './components/ExportControls.jsx';
import MindMapView from './components/MindMapView.jsx';

export default function App() {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [summaryData, setSummaryData] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const onSummarize = (data, exTags) => {
    setSummaryData(data);
    setTags(exTags);
  };
  const toggleMap = () => setShowMap((m) => !m);

  return (
    // 1) Make this fill the screen so your base dark/light bg shows
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-500 ease-in-out">
      <div className="max-w-4xl mx-auto p-6">
        <Header />

        {/* 2) This Card already knows to switch bg-white ⇄ neutral-800 */}
        <Card glass>
          <TextareaInput
            value={text}
            onChange={setText}
            // Make textarea itself dark-aware:
            className="bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          />
          <LengthSelector value={length} onChange={setLength} />
          <SummarizeButton text={text} length={length} onSummarize={onSummarize} />
        </Card>

        {/* All other Cards will auto-flip */}
        <Card>
          <TagChips tags={tags} onClickTag={()=>{}} />
          <SummaryPanel summary={summaryData} loading={loading} onBulletClick={()=>{}} />
        </Card>

        <Card>
          <OriginalTextPane text={text} highlights={[]} />
          <ExportControls summary={summaryData} tags={tags} />
        </Card>

        <div className="flex justify-center mb-8">
          <button
            onClick={toggleMap}
            className="
              px-8 py-3 
              bg-secondary text-white 
              font-medium rounded-xl shadow-lg 
              transition transform hover:scale-105
            "
          >
            {showMap ? 'Hide Mind Map' : 'View Mind Map'}
          </button>
        </div>

        {showMap && (
          <Card>
            <MindMapView tree={null} />
          </Card>
        )}
      </div>
    </div>
  );
}
