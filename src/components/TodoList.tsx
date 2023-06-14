import React from 'react';
import TodoModel from '../models/TodoModel';
import Todo from './Todo';

interface TodoListProps {
  todos: TodoModel[];
  onDelete: (id: string) => void;
  onSave: (id: string, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onSave }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onSave={onSave} />
      ))}
    </div>
  );
};

export default TodoList;

