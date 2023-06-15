import React, { useState } from 'react';
import TodoModel from '../models/TodoModel';
import {
  TodoItem,
  TodoCheckbox,
  TodoTitle,
  TodoButton
} from './Todo.styles';

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
    <TodoItem>
      <div>
        <TodoCheckbox
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
        />
        <TodoTitle completed={completed} onClick={handleToggle}>
          {todo.title}
        </TodoTitle>
      </div>
      <div>
        {editing ? (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TodoButton onClick={handleSave}>Save</TodoButton>
            <TodoButton onClick={handleCancel}>Cancel</TodoButton>
          </div>
        ) : (
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


