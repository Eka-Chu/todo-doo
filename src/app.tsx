import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
  text-align: center;
  background-color: rgb(51, 51, 51);
  height: 100vh;
  padding: 20px;
`;


const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
  color: #000;
  cursor: pointer;

  &.active {
    background-color: #555;
    color: #fff;
  }
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const saveTodosToLocalStorage = (todos: TodoModel[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getTodosFromLocalStorage = (): TodoModel[] => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  };

  useEffect(() => {
    const storedTodos = getTodosFromLocalStorage();
    if (storedTodos.length === 0) {
      saveTodosToLocalStorage(mockData);
      setTodos(mockData);
    } else {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
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

  const handleFilterChange = (selectedFilter: Filter) => {
    setFilter(selectedFilter);
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
    <Container>
      <Header />
      <AddTodo onAdd={handleAddTodo} />
      <FilterContainer>
        <FilterButton
          onClick={() => handleFilterChange(Filter.All)}
          className={filter === Filter.All ? 'active' : ''}
        >
          Show All Tasks
        </FilterButton>
        <FilterButton
          onClick={() => handleFilterChange(Filter.Active)}
          className={filter === Filter.Active ? 'active' : ''}
        >
          Show Active Tasks
        </FilterButton>
        <FilterButton
          onClick={() => handleFilterChange(Filter.Completed)}
          className={filter === Filter.Completed ? 'active' : ''}
        >
          Show Completed Tasks
        </FilterButton>
      </FilterContainer>
      <TodoList
        todos={filteredTodos}
        onDelete={handleDeleteTodo}
        onSave={handleSave}
        onToggle={handleToggle}
      />
      <TaskCounter todos={todos} completedCount={completedCount} />
    </Container>
  );
};

export default App;
