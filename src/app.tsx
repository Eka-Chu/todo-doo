import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TaskCounter from './components/TaskCounter';
import TodoModel from './models/TodoModel';
import { mockData } from './mockData';
import AddTodo from './components/AddTodo';
import './styles.css';

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  // Метод для сохранения todos в локальное хранилище
  const saveTodosToLocalStorage = (todos: TodoModel[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Метод для чтения todos из локального хранилища
  const getTodosFromLocalStorage = (): TodoModel[] => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  };

  useEffect(() => {
    // Получаем todos из локального хранилища при загрузке приложения
    const storedTodos = getTodosFromLocalStorage();
    if (storedTodos.length === 0) {
      // Если в локальном хранилище нет сохраненных данных, используем моковые данные
      saveTodosToLocalStorage(mockData);
      setTodos(mockData);
    } else {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    // Сохраняем todos в локальное хранилище при каждом их изменении
    saveTodosToLocalStorage(todos);
  }, [todos]);

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

  const handleToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.Active) {
      return !todo.completed;
    } else if (filter === Filter.Completed) {
      return todo.completed;
    }
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <Header />
      <AddTodo onAdd={handleAddTodo} />
      <div>
        <button
          onClick={() => handleFilterChange(Filter.All)}
          className={filter === Filter.All ? 'active-filter' : ''}
        >
          Show All Tasks
        </button>
        <button
          onClick={() => handleFilterChange(Filter.Active)}
          className={filter === Filter.Active ? 'active-filter' : ''}
        >
          Show Active Tasks
        </button>
        <button
          onClick={() => handleFilterChange(Filter.Completed)}
          className={filter === Filter.Completed ? 'active-filter' : ''}
        >
          Show Completed Tasks
        </button>
      </div>
      <TodoList
        todos={filteredTodos}
        onDelete={handleDeleteTodo}
        onSave={handleSave}
        onToggle={handleToggle}
      />
      <TaskCounter todos={todos} completedCount={completedCount} />
    </div>
  );
};

export default App;
