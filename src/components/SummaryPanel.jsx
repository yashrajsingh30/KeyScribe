// import React from 'react';
// import SummarySkeleton from './SummarySkeleton';
// export default function SummaryPanel({ summary, loading, onBulletClick }) {
//   if (loading) return <SummarySkeleton />;

//   return (
//     <div>
//       <h2 className="
//         text-lg font-semibold mb-2
//         text-neutral-900 dark:text-neutral-100
//       ">Summary</h2>

//       {summary.length === 0 ? (
//         <p className="text-neutral-600 dark:text-neutral-400">
//           No summary yet.
//         </p>
//       ) : (
//         <ul className="list-disc pl-5 space-y-1">
//           {summary.map((item, i) => (
//             <li
//               key={i}
//               onClick={() => onBulletClick(item.context)}
//               className="
//                 cursor-pointer hover:text-primary
//                 text-neutral-800 dark:text-neutral-200
//               "
//             >
//               {item.bullet}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// src/components/SummaryPanel.jsx
import React from 'react';

export default function SummaryPanel({ summary, loading, onBulletClick }) {
  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1,2,3].map(i => (
          <div key={i} className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        ))}
      </div>
    );
  }

  if (!summary.length) {
    return <p className="text-neutral-500">No summary yet.</p>;
  }

  return (
    <ul className="list-disc list-inside space-y-2">
      {summary.map((bullet, i) => (
        <li
          key={i}
          onClick={() => onBulletClick(i)}
          className="cursor-pointer hover:text-primary transition"
        >
          {bullet}
        </li>
      ))}
    </ul>
  );
}
