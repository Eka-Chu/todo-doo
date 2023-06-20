import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TaskCounter from './components/TaskCounter';
import TodoModel from './models/TodoModel';
import { mockData } from './mockData';
import AddTodo from './components/AddTodo';
import './styles.css';

// Определение перечисления для фильтрации задач
enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

// Стилизованный контейнер для всего приложения
const Container = styled.div`
  text-align: center;
  background-color: rgb(51, 51, 51);
  height: 100vh;
  padding: 20px;
`;

// Стилизованный контейнер для фильтров
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

// Стилизованная кнопка фильтра
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
  // Состояние для хранения списка задач
  const [todos, setTodos] = useState<TodoModel[]>([]);
  // Состояние для хранения выбранного фильтра
  const [filter, setFilter] = useState<Filter>(Filter.All);

  // Функция для сохранения задач в локальное хранилище
  const saveTodosToLocalStorage = (todos: TodoModel[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Функция для получения задач из локального хранилища
  const getTodosFromLocalStorage = (): TodoModel[] => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  };

  // Загрузка задач из локального хранилища при монтировании компонента
  useEffect(() => {
    const storedTodos = getTodosFromLocalStorage();
    if (storedTodos.length === 0) {
      saveTodosToLocalStorage(mockData);
      setTodos(mockData);
    } else {
      setTodos(storedTodos);
    }
  }, []);

  // Сохранение задач в локальное хранилище при изменении состояния списка задач
  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  // Обработчик удаления задачи
  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Обработчик добавления новой задачи
  const handleAddTodo = (title: string) => {
    const newTodo: TodoModel = {
      id: Math.random().toString(),
      title: title,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Обработчик сохранения изменений в задаче
  const handleSave = (id: string, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: title } : todo
      )
    );
  };

  // Обработчик переключения статуса выполнения задачи
  const handleToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Обработчик изменения выбранного фильтра
  const handleFilterChange = (selectedFilter: Filter) => {
    setFilter(selectedFilter);
  };

  // Фильтрация задач в соответствии с выбранным фильтром
  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.Active) {
      return !todo.completed;
    } else if (filter === Filter.Completed) {
      return todo.completed;
    }
    return true;
  });

  // Подсчет количества завершенных задач
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
