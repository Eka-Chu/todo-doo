import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoContainer, Input, Button } from './AddTodo.styles';

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
    <AddTodoContainer>
      <Input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="New to do..."
      />
      <Button onClick={handleAddTodo}>Add</Button>
    </AddTodoContainer>
  );
};

export default AddTodo;


// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// interface AddTodoProps {
//   onAdd: (title: string) => void;
// }

// const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
//   const [title, setTitle] = useState('');

//   const handleAddTodo = () => {
//     if (title.trim() !== '') {
//       onAdd(title.trim());
//       setTitle('');
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={title} onChange={handleInputChange} />
//       <button onClick={handleAddTodo}>Add</button>
//     </div>
//   );
// };

// export default AddTodo;

