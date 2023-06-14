import React, { useState } from 'react';
import TodoModel from '../models/TodoModel';

interface TodoProps {
  todo: TodoModel;
  onDelete: (id: string) => void;
  onSave: (id: string, title: string) => void;
  onToggle: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete, onSave, onToggle }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggle = () => {
    setCompleted(!completed);
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    onSave(todo.id, editedTitle);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedTitle(todo.title);
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggle}
          />
          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Todo;

// import React, { useState } from 'react';
// import TodoModel from '../models/TodoModel';

// interface TodoProps {
//   todo: TodoModel;
//   onDelete: (id: string) => void;
//   onSave: (id: string, title: string) => void;
//   onToggle: (id: string) => void;
// }

// const Todo: React.FC<TodoProps> = ({ todo, onDelete, onSave, onToggle }) => {
//   const [completed, setCompleted] = useState(todo.completed);
//   const [editing, setEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(todo.title);

//   const handleToggle = () => {
//     setCompleted(!completed);
//     onToggle(todo.id);
//   };

//   const handleDelete = () => {
//     onDelete(todo.id);
//   };

//   const handleEdit = () => {
//     setEditing(!editing);
//   };

//   const handleSave = () => {
//     onSave(todo.id, editedTitle);
//     setEditing(false);
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     setEditedTitle(todo.title);
//   };

//   return (
//     <div>
//       {editing ? (
//         <div>
//           <input
//             type="text"
//             value={editedTitle}
//             onChange={(e) => setEditedTitle(e.target.value)}
//           />
//           <button onClick={handleSave}>Save</button>
//           <button onClick={handleCancel}>Cancel</button>
//         </div>
//       ) : (
//         <div>
//           <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
//             {todo.title}
//           </span>
//           <input
//             type="checkbox"
//             checked={completed}
//             onChange={handleToggle}
//           />
//           <button onClick={handleDelete}>Delete</button>
//           <button onClick={handleEdit}>Edit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Todo;
