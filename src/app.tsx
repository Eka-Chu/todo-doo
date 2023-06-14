// import React, { useState } from 'react';
// import Header from './components/Header';
// import TodoList from './components/TodoList';
// import TaskCounter from './components/TaskCounter';
// import TodoModel from './models/TodoModel';
// import { mockData } from './mockData';
// import AddTodo from './components/AddTodo';

// const App: React.FC = () => {
//   const [todos, setTodos] = useState<TodoModel[]>(mockData);

//   const handleDeleteTodo = (id: string) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const handleAddTodo = (title: string) => {
//     const newTodo: TodoModel = {
//       id: Math.random().toString(),
//       title: title,
//       completed: false,
//     };

//     setTodos((prevTodos) => [...prevTodos, newTodo]);
//   };

//   const handleSave = (id: string, title: string) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, title: title } : todo
//       )
//     );
//   };

//   const completedCount = todos.filter((todo) => todo.completed).length;

//   return (
//     <div>
//       <Header />
//       <AddTodo onAdd={handleAddTodo} />
//       <TodoList todos={todos} onDelete={handleDeleteTodo} onSave={handleSave} />
//       <TaskCounter todos={todos} completedCount={completedCount} />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TaskCounter from './components/TaskCounter';
import TodoModel from './models/TodoModel';
import { mockData } from './mockData';
import AddTodo from './components/AddTodo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>(mockData);
  const [filter, setFilter] = useState<string>('all');

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (title: string) => {
    const newTodo: TodoModel = {
      id: Math.random().toString(),
      title: title,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleSave = (id: string, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: title } : todo
      )
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <Header />
      <AddTodo onAdd={handleAddTodo} />
      <div>
        <button
          onClick={() => handleFilterChange('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          Show All Tasks
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
        >
          Show Active Tasks
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
        >
          Show Completed Tasks
        </button>
      </div>
      <TodoList todos={filteredTodos} onDelete={handleDeleteTodo} onSave={handleSave} onToggle={handleToggle} />
      <TaskCounter todos={todos} completedCount={completedCount} />
    </div>
  );
};

export default App;
