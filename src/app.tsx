import React, { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TaskCounter from './components/TaskCounter';
import TodoModel from './models/TodoModel';
import { mockData } from './mockData';
import AddTodo from './components/AddTodo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>(mockData);

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

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <Header />
      <AddTodo onAdd={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} />
      <TaskCounter todos={todos} completedCount={completedCount} />
    </div>
  );
};

export default App;
