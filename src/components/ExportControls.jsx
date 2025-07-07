import React, { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import Toast from './Toast';
export default function ExportControls({ summary, tags }) {
  const [showToast,setShowToast]=useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Summary:\n${summary.map(s=>'• '+s.bullet).join('\n')}\nTags: ${tags.join(', ')}`
    );
    setShowToast(true);
  };
  return (
    <>
      <div className="flex items-center space-x-4 mt-4">
        <button onClick={handleCopy} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg">
          <Copy className="mr-2" size={16}/>Copy
        </button>
        <button className="flex items-center px-4 py-2 bg-neutral-800 text-white rounded-lg">
          <Download className="mr-2" size={16}/>Download .txt
        </button>
      </div>
      <Toast show={showToast} onDone={()=>setShowToast(false)} />
    </>
  );
}
