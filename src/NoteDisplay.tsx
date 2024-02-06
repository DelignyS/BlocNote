
import Showdown from 'showdown';

const NoteDisplay = ({ markdown }) => {
  const converter = new Showdown.Converter();
  const html = converter.makeHtml(markdown);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default NoteDisplay;