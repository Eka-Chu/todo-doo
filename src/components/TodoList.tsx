import React from 'react';
import TodoModel from '../models/TodoModel';
import Todo from './Todo';

interface TodoListProps {
  todos: TodoModel[];
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;
