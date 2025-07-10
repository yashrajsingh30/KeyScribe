// src/App.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import AuthPage      from './components/AuthPage';
import Header        from './components/Header';
import NotesList     from './components/NotesList';
import NoteEditor    from './components/NoteEditor';
import AISidebar     from './components/AISidebar';
import MobileAIDrawer from './components/MobileAIDrawer';
import { fetchNotes, saveNote, deleteNote } from './lib/appwrite';

export default function App() {
  const { user, loading } = useAuth();
  const [notes, setNotes]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [summary, setSummary]   = useState([]);
  const [tags, setTags]         = useState([]);
  const [showAIDrawer, setShowAIDrawer] = useState(false);

  // Load notes after login
  useEffect(() => {
    if (!loading && user) {
      fetchNotes(user.$id).then(docs => {
        setNotes(docs);
        if (docs.length) setSelected(docs[0]);
      });
    }
  }, [loading, user]);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }
  if (!user) {
    return <AuthPage />;
  }

  const handleNew = async () => {
    const now = Date.now();
    const doc = await saveNote({ title:'', content:'', updatedAt: now, userId: user.$id });
    setNotes(prev => [doc, ...prev]);
    setSelected(doc);
  };

  const handleUpdate = async updated => {
    updated.userId = user.$id;
    setNotes(prev => prev.map(n => (n.$id===updated.$id?updated:n)));
    setSelected(updated);
    const saved = await saveNote(updated);
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
      <Header onOpenAIMobile={() => setShowAIDrawer(true)} />

      <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr_28rem] gap-6 max-w-7xl mx-auto p-6">
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

        <div className="hidden md:block">
          <AISidebar
            note={selected}
            summary={summary}
            tags={tags}
            onSummarize={handleSummarize}
          />
        </div>
      </div>

      {showAIDrawer && (
    <MobileAIDrawer
      open={true}
      onClose={() => setShowAIDrawer(false)}
      note={selected}
      summary={summary}
      tags={tags}
     onSummarize={handleSummarize}
    />
  )}
    </div>
  );
}
