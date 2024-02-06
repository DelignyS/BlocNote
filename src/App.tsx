import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import MarkdownInput from './components/MarkdownInput';
import NoteDisplay from './components/NoteDisplay';
import NoteList from './components/NoteList';

Modal.setAppElement('#root'); // replace '#root' with the id of your app's root element

const App = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [activeNote, setActiveNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setNotes(JSON.parse(localStorage.getItem('notes')) || []);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNewNote = () => {
    const newNote = { id: Date.now(), title: '', content: '' };
    setActiveNote(newNote);
    setIsModalOpen(true);
  };

  const handleNoteSelect = (note) => {
    setActiveNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (note) => {
    setNotes((prevNotes) => {
      const existingNote = prevNotes.find((n) => n.id === note.id);
      if (existingNote) {
        return prevNotes.map((n) => (n.id === note.id ? note : n));
      } else {
        return [...prevNotes, note];
      }
    });
    setIsModalOpen(false);
  };

  const handleDeleteNote = (noteToDelete) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteToDelete.id));
    if (activeNote && activeNote.id === noteToDelete.id) {
      setActiveNote(null);
    }
  };

  return (
    <div>
      <button onClick={handleNewNote}>New Note</button>
      <NoteList
        notes={notes}
        activeNote={activeNote}
        onNoteSelect={handleNoteSelect}
        onDeleteNote={handleDeleteNote}
        className="space-y-2"
      />
      <NoteDisplay note={activeNote} />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <MarkdownInput note={activeNote} onNoteChange={setActiveNote} onSaveNote={handleSaveNote} />
      </Modal>
    </div>
  );
};

export default App;