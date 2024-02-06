import { useState } from 'react';

const MarkdownInput = ({ onMarkdownChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onMarkdownChange(e.target.value);
  };

  const handleSave = () => {
    console.log(value);
    localStorage.setItem('blocNote', value);
  };

  return (
    <div>
      <textarea value={value} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MarkdownInput;