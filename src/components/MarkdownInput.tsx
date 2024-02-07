import React, { ChangeEvent } from 'react';

type Note = {
  id: number;
  title: string;
  content: string;
};

type MarkdownInputProps = {
  note: Note | null;
  onNoteChange: (note: Note) => void;
  onSaveNote: (note: Note) => void;
};

const MarkdownInput: React.FC<MarkdownInputProps> = ({ note, onNoteChange, onSaveNote }) => {
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (note) {
      onNoteChange({ ...note, title: event.target.value });
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (note) {
      onNoteChange({ ...note, content: event.target.value });
    }
  };

  const handleSaveClick = () => {
    if (note) {
      onSaveNote(note);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={note ? note.title : ""}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <textarea
        value={note ? note.content : ""}
        onChange={handleContentChange}
      />
      <button
        onClick={handleSaveClick}
        className="px-4 py-2 mr-2 bg-purple-500 text-white rounded hover:bg-purple-700"
      >
        Save
      </button>
    </div>
  );
};

export default MarkdownInput;