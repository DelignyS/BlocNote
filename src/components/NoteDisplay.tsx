import Showdown from 'showdown';

type Note = {
  id: number;
  title: string;
  content: string;
};

type NoteDisplayProps = {
  note: Note | null;
};

const NoteDisplay: React.FC<NoteDisplayProps> = ({ note }) => {
  if (!note) {
    return <div>No note selected</div>;
  }

  const converter = new Showdown.Converter();
  const htmlContent = converter.makeHtml(note.content);

  return (
    <div>
      <h1>{note.title || 'Untitled'}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default NoteDisplay;