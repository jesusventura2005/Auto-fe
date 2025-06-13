import { useState } from 'react';

export type Task = {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  kilometraje: string;
  completado: boolean;
};

export const useTaskManager = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return {
    tasks,
    updateTask,
    addTask,
  };
};
