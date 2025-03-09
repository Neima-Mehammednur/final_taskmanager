
import { useState } from 'react';
import { fetchTasks, deleteTask, updateTask } from '../services/firebaseService';

const useTaskList = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(taskId, updatedTask);
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };

  const handleClearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    for (const task of completedTasks) {
      await deleteTask(task.id);
    }
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  };

  return {
    tasks,
    loadTasks,
    handleDeleteTask,
    handleToggleComplete,
    handleClearCompleted,
  };
};

export default useTaskList;