import React from 'react';
import TodoModel from '../models/TodoModel'; // Импортируйте тип TodoModel из файла TodoModel.ts

interface TaskCounterProps {
  todos: TodoModel[];
  completedCount: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ todos, completedCount }) => {
  return (
    <div>
      <p>Total tasks: {todos.length}</p>
      <p>Completed tasks: {completedCount}</p>
    </div>
  );
};

export default TaskCounter;
