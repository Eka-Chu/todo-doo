import React from 'react';
import TodoModel from '../models/TodoModel';
import Todo from './Todo';

interface TodoListProps {
  todos: TodoModel[];
  onDelete: (id: string) => void;
  onSave: (id: string, title: string) => void;
  onToggle: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onSave, onToggle }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onSave={onSave}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;

// import React from 'react';
// import TodoModel from '../models/TodoModel';
// import Todo from './Todo';

// interface TodoListProps {
//   todos: TodoModel[];
//   onDelete: (id: string) => void;
//   onSave: (id: string, title: string) => void;
//   onToggle: (id: string) => void; // Добавлено свойство onToggle
// }

// const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onSave, onToggle }) => {
//   return (
//     <div>
//       {todos.map((todo) => (
//         <Todo key={todo.id} todo={todo} onDelete={onDelete} onSave={onSave} onToggle={onToggle} /> // Передано свойство onToggle
//       ))}
//     </div>
//   );
// };

// export default TodoList;
