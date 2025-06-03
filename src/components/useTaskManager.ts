import { useState } from 'react';

export type Task = {
  title: string;
  description: string;
  type: string;
  date: string;
  mileage: string;
  completed: boolean;
};

export const useTaskManager = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.title === updatedTask.title && task.date === updatedTask.date
          ? updatedTask
          : task
      )
    );
  };

  return {
    tasks,
    updateTask,
  };
};
