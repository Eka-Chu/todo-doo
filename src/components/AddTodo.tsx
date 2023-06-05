import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleAddTodo = () => {
    if (title.trim() !== '') {
      onAdd(title.trim());
      setTitle('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <input type="text" value={title} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
