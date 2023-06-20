import React, { useState } from 'react';
import TodoModel from '../models/TodoModel';
import {
  TodoItem,
  TodoCheckbox,
  TodoTitle,
  TodoButton
} from './Todo.styles';

interface TodoProps {
  todo: TodoModel; // Пропс с информацией о задаче
  onDelete: (id: string) => void; // Функция удаления задачи
  onSave: (id: string, title: string) => void; // Функция сохранения изменений в задаче
  onToggle: (id: string) => void; // Функция переключения состояния задачи
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete, onSave, onToggle }) => {
  const [completed, setCompleted] = useState(todo.completed); // Состояние завершенности задачи
  const [editing, setEditing] = useState(false); // Состояние редактирования задачи
  const [editedTitle, setEditedTitle] = useState(todo.title); // Состояние измененного заголовка задачи

  const handleToggle = () => {
    setCompleted(!completed); // Переключение состояния завершенности задачи
    onToggle(todo.id); // Вызов функции переключения состояния задачи
  };

  const handleDelete = () => {
    onDelete(todo.id); // Вызов функции удаления задачи
  };

  const handleEdit = () => {
    setEditing(!editing); // Изменение состояния редактирования задачи
  };

  const handleSave = () => {
    onSave(todo.id, editedTitle); // Вызов функции сохранения изменений в задаче
    setEditing(false); // Завершение режима редактирования
  };

  const handleCancel = () => {
    setEditing(false); // Отмена режима редактирования
    setEditedTitle(todo.title); // Восстановление оригинального заголовка задачи
  };

  return (
    <TodoItem>
      <div>
        <TodoCheckbox
          type="checkbox"
          checked={completed} // Отображение состояния завершенности задачи
          onChange={handleToggle} // Обработчик переключения состояния задачи
        />
        <TodoTitle completed={completed} onClick={handleToggle}>
          {todo.title} 
        </TodoTitle>
      </div>
      <div>
        {editing ? ( // Если в режиме редактирования
          <div>
            <input
              type="text"
              value={editedTitle} // Значение измененного заголовка
              onChange={(e) => setEditedTitle(e.target.value)} // Обработчик изменения заголовка
            />
            <TodoButton onClick={handleSave}>Save</TodoButton> 
            <TodoButton onClick={handleCancel}>Cancel</TodoButton> 
          </div>
        ) : ( // Если не в режиме редактирования
          <div>
            <TodoButton onClick={handleDelete}>Delete</TodoButton> 
            <TodoButton onClick={handleEdit}>Edit</TodoButton> 
          </div>
        )}
      </div>
    </TodoItem>
  );
};

export default Todo; 
