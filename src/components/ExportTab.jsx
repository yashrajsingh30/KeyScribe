// src/components/ExportTab.jsx
import React from 'react';

export default function ExportTab({ note, summary, tags }) {
  if (!note) {
    return (
      <p className="text-center text-neutral-500">
        Select a note to export.
      </p>
    );
  }

  // Build a Markdown payload
  const buildMarkdown = () => {
    const lines = [];
    lines.push(`# ${note.title || 'Untitled Note'}`);
    lines.push(`_Last updated: ${new Date(note.updatedAt).toLocaleString()}_\n`);
    lines.push('---\n');
    lines.push('## Content');
    lines.push(note.content + '\n');
    if (summary.length) {
      lines.push('## Summary');
      summary.forEach(b => lines.push(`- ${b}`));
      lines.push('');
    }
    if (tags.length) {
      lines.push('## Tags');
      lines.push(tags.map(t => `\`#${t}\``).join(' ') + '\n');
    }
    return lines.join('\n');
  };

  const handleCopy = async () => {
    const md = buildMarkdown();
    try {
      await navigator.clipboard.writeText(md);
      alert('Export copied to clipboard!');
    } catch {
      alert('Failed to copy.');
    }
  };

  const handleDownload = () => {
    const md = buildMarkdown();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${note.title || 'note'}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Export</h3>
      <button
        onClick={handleCopy}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
      >
        Copy as Markdown
      </button>
      <button
        onClick={handleDownload}
        className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
      >
        Download as .md
      </button>
    </div>
  );
}
