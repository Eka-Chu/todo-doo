import React, { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TaskCounter from './components/TaskCounter';
import TodoModel from './models/TodoModel';
import { mockData } from './mockData';
import AddTodo from './components/AddTodo';
import './style.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>(mockData);
  const [filter, setFilter] = useState('all'); // State for the filter option

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

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    } else {
      return true;
    }
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <Header />
      <AddTodo onAdd={handleAddTodo} />
      <div>
        <button
          onClick={() => handleFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          Show All Tasks
        </button>
        <button
          onClick={() => handleFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Show Active Tasks
        </button>
        <button
          onClick={() => handleFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Show Completed Tasks
        </button>
      </div>
      <TodoList todos={filteredTodos} onDelete={handleDeleteTodo} onSave={handleSave} />
      <TaskCounter todos={todos} completedCount={completedCount} />
    </div>
  );
};

export default App;
