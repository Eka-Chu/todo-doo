import React from 'react';
import TodoModel from '../models/TodoModel';
import { TaskCounterContainer } from './TaskCounter.styles';

interface TaskCounterProps {
  todos: TodoModel[]; // Массив задач
  completedCount: number; // Количество завершенных задач
}

const TaskCounter: React.FC<TaskCounterProps> = ({ todos, completedCount }) => {
  return (
    <TaskCounterContainer>
      <p>Total tasks: {todos.length}</p> 
      <p>Completed tasks: {completedCount}</p> 
    </TaskCounterContainer>
  );
};

export default TaskCounter; 