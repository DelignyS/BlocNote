const MarkdownInput = ({ note, onNoteChange, onSaveNote }) => {
  const handleTitleChange = (event) => {
    onNoteChange({ ...note, title: event.target.value });
  };

  const handleContentChange = (event) => {
    onNoteChange({ ...note, content: event.target.value });
  };

  const handleSaveClick = () => {
    onSaveNote(note);
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
