import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoContainer, Input, Button } from './AddTodo.styles';

interface AddTodoProps {
  onAdd: (title: string) => void; // Функция добавления новой задачи
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState(''); // Состояние заголовка новой задачи

  const handleAddTodo = () => {
    if (title.trim() !== '') { // Если заголовок не пустой
      onAdd(title.trim()); // Вызов функции добавления новой задачи
      setTitle(''); // Очистка поля ввода заголовка
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // Обработчик изменения значения заголовка
  };

  return (
    <AddTodoContainer>
      <Input
        type="text"
        value={title} // Отображение текущего значения заголовка
        onChange={handleInputChange} // Обработчик изменения значения заголовка
        placeholder="New to do..." // Плейсхолдер для поля ввода
      />
      <Button onClick={handleAddTodo}>Add</Button> 
    </AddTodoContainer>
  );
};

export default AddTodo; 
