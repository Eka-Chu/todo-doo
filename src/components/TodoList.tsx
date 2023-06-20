import React from 'react';
import TodoModel from '../models/TodoModel';
import Todo from './Todo';
import { TodoListContainer } from './TodoList.styles';

interface TodoListProps {
todos: TodoModel[]; // Список задач
onDelete: (id: string) => void; // Функция удаления задачи по ID
onSave: (id: string, title: string) => void; // Функция сохранения изменений в задаче
onToggle: (id: string) => void; // Функция переключения статуса задачи
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onSave, onToggle }) => {
return (
<TodoListContainer>
{todos.map((todo) => (
<Todo
key={todo.id} // Уникальный ключ задачи
todo={todo} // Задача
onDelete={onDelete} // Обработчик удаления задачи
onSave={onSave} // Обработчик сохранения изменений в задаче
onToggle={onToggle} // Обработчик переключения статуса задачи
/>
))}
</TodoListContainer>
);
};

export default TodoList;