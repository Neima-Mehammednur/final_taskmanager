
import { useState } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { addTask, updateTask } from '../services/firebaseService';

const useTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCourse, setTaskCourse] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [taskNotes, setTaskNotes] = useState('');
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [attachments, setAttachments] = useState([]);

  const scheduleReminderNotification = async (reminderTime, taskName) => {
    const now = new Date();
    if (reminderTime <= now) {
      Alert.alert('Invalid Reminder', 'The reminder time must be in the future.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `Don't forget: ${taskName}`,
        sound: true,
      },
      trigger: {
        date: reminderTime,
      },
    });
  };

  const handleCreateOrUpdateTask = async (isEditing, taskId, navigation) => {
    if (!taskName || !taskDescription || !taskCourse) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      course: taskCourse,
      priority: taskPriority,
      deadline: taskDeadline.toISOString(),
      reminder: isReminderEnabled ? reminderTime.toISOString() : null,
      completed: false,
      notes: taskNotes,
      attachments: attachments,
    };

    try {
      if (isEditing) {
        await updateTask(taskId, taskData);
      } else {
        await addTask(taskData);
      }

      if (isReminderEnabled) {
        await scheduleReminderNotification(reminderTime, taskName);
      }

      navigation.navigate('TaskList', { refresh: true });

      setTaskName('');
      setTaskDescription('');
      setTaskCourse('');
      setTaskPriority('Low');
      setTaskDeadline(new Date());
      setTaskNotes('');
      setIsReminderEnabled(false);
      setReminderTime(new Date());
      setAttachments([]);
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save task. Please try again.');
    }
  };

  return {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    taskCourse,
    setTaskCourse,
    taskPriority,
    setTaskPriority,
    taskDeadline,
    setTaskDeadline,
    taskNotes,
    setTaskNotes,
    isReminderEnabled,
    setIsReminderEnabled,
    reminderTime,
    setReminderTime,
    attachments,
    setAttachments,
    handleCreateOrUpdateTask,
  };
};

export default useTaskForm;