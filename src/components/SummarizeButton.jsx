// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from './Button';

// export default function SummarizeButton({ text, length, onSummarize }) {
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     try {
//       const { data } = await axios.post('/api/summarize', { text, length });
//       const summaryData = data.bullets.map(b => ({ bullet: b, context: '' }));
//       onSummarize(summaryData, data.tags);
//     } catch (err) {
//       console.error(err);
//       alert('Summarization failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button onClick={handleClick} variant="primary" disabled={loading}>
//       {loading ? 'Summarizing…' : 'Summarize'}
//     </Button>
//   );
// }


// src/components/SummarizeButton.jsx
import React from 'react';
import axios from 'axios';

export default function SummarizeButton({
  text,
  length,
  onSummarize,
  setLoading
}) {
  const handleClick = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post('/api/summarize', { text, length });
      onSummarize(data.bullets, data.tags);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Summarization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
    >
      Summarize
    </button>
  );
}
