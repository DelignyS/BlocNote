import { useState } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';

const App = () => {
  const [markdown, setMarkdown] = useState(() => localStorage.getItem('blocNote') || '');

  return (
    <div>
      <NoteDisplay markdown={markdown} />
      <MarkdownInput onMarkdownChange={setMarkdown} />
    </div>
  );
};

export default App;