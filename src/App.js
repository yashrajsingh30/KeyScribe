import React, { useState, useEffect } from 'react';
import { fetchNotes, saveNote, deleteNote } from './lib/appwrite';
import Header           from './components/Header';
import NotesList        from './components/NotesList';
import NoteEditor       from './components/NoteEditor';
import AISidebar        from './components/AISidebar';
import MobileAIDrawer   from './components/MobileAIDrawer';

export default function App() {
  const userId = 'anonymous';

  // Notes state
  const [notes, setNotes]       = useState([]);
  const [selected, setSelected] = useState(null);

  // AI state
  const [summary, setSummary] = useState([]);
  const [tags,    setTags]    = useState([]);

  // Mobile drawer
  const [showAIDrawer, setShowAIDrawer] = useState(false);

  useEffect(() => {
    fetchNotes(userId).then(docs => {
      setNotes(docs);
      if (docs.length) setSelected(docs[0]);
    });
  }, []);

  const handleNew = async () => {
    const now = Date.now();
    const doc = await saveNote({ title: '', content: '', updatedAt: now, userId });
    setNotes(prev => [doc, ...prev]);
    setSelected(doc);
  };

  const handleUpdate = async updated => {
    setNotes(prev => prev.map(n => (n.$id===updated.$id?updated:n)));
    setSelected(updated);
    const saved = await saveNote({ ...updated, updatedAt: Date.now(), userId });
    setNotes(prev => prev.map(n => (n.$id===saved.$id?saved:n)));
    setSelected(saved);
  };

  const handleDelete = async note => {
    await deleteNote(note.$id);
    setNotes(prev => prev.filter(n=>n.$id!==note.$id));
    setSelected(null);
  };

  const handleSummarize = (bullets, extractedTags) => {
    setSummary(bullets);
    setTags(extractedTags);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-500 ease-in-out">
      {/* Pass drawer-opener into Header */}
      <Header onOpenAIMobile={() => setShowAIDrawer(true)} />

      {/* On mobile: single column; on md+: 14rem | 1fr | 28rem */}
      <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr_28rem] gap-6 max-w-7xl mx-auto p-6">
        {/* always visible */}
        <NotesList
          notes={notes}
          selectedId={selected?.$id}
          onSelect={id => setSelected(notes.find(n=>n.$id===id))}
          onNew={handleNew}
        />

        <NoteEditor
          note={selected}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        {/* desktop-only AI sidebar */}
        <div className="hidden md:block">
          <AISidebar
            note={selected}
            summary={summary}
            tags={tags}
            onSummarize={handleSummarize}
          />
        </div>
      </div>

      {/* Mobile AI drawer */}
      <MobileAIDrawer
        open={showAIDrawer}
        onClose={() => setShowAIDrawer(false)}
        note={selected}
        summary={summary}
        tags={tags}
        onSummarize={handleSummarize}
      />
    </div>
  );
}
