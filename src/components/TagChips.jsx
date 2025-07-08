// import React from 'react';
// export default function TagChips({ tags, onClickTag }) {
//   return (
//     <div className="flex flex-wrap gap-2 mb-4">
//       {tags.map((tag, i) => (
//         <button
//           key={i}
//           onClick={() => onClickTag(tag)}
//           className="
//             px-3 py-1 rounded-full
//             bg-neutral-200 dark:bg-neutral-600
//             text-neutral-800 dark:text-neutral-100
//             hover:bg-neutral-300 dark:hover:bg-neutral-500
//             transition
//           "
//         >
//           {tag}
//         </button>
//       ))}
//     </div>
//   );
// }


// src/components/TagChips.jsx
import React from 'react';

export default function TagChips({ tags, onClickTag }) {
  if (!tags || !tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <button
          key={i}
          onClick={() => onClickTag(tag)}
          className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-sm hover:bg-secondary/30 transition"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
