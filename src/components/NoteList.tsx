const NoteList = ({ notes, activeNote, onNoteSelect, onDeleteNote, className }) => {
  return (
    <div className={className}>
      {notes.map((note) => (
        <div key={note.id}>
          <button
            onClick={() => onNoteSelect(note)}
            style={{
              fontWeight:
                activeNote && activeNote.id === note.id ? "bold" : "normal",
            }}
          >
            {note.title || "Untitled"}
          </button>
          <button
            onClick={() => onDeleteNote(note)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
