
import { useState } from 'react';
import * as CalendarLib from 'expo-calendar';
import { Alert } from 'react-native';

const useCalendarEvents = () => {
  const [addedTaskIds, setAddedTaskIds] = useState(new Set());

  const requestCalendarPermissions = async () => {
    const { status } = await CalendarLib.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to enable calendar permissions for this feature.');
      return false;
    }
    return true;
  };

  const getDefaultCalendar = async () => {
    return await CalendarLib.getDefaultCalendarAsync();
  };

  const addEventToCalendar = async (eventData) => {
    try {
      const hasPermissions = await requestCalendarPermissions();
      if (!hasPermissions) return null;

      const calendar = await getDefaultCalendar();
      if (!calendar) {
        Alert.alert('Error', 'Could not get default calendar.');
        return null;
      }

      const event = {
        title: eventData.title,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        notes: eventData.notes,
        calendarId: calendar.id,
      };

      const eventId = await CalendarLib.createEventAsync(calendar.id, event);
      return eventId;
    } catch (error) {
      console.error('Error adding event to calendar:', error);
      Alert.alert('Error', 'Failed to add task to calendar.');
      return null;
    }
  };

  const handleAddTasksToCalendar = async (tasks) => {
    const newAddedTaskIds = new Set(addedTaskIds);
    let addedCount = 0;

    for (const task of tasks) {
      if (!addedTaskIds.has(task.id)) {
        const eventData = {
          title: task.name,
          startDate: new Date(task.deadline),
          endDate: new Date(new Date(task.deadline).getTime() + 60 * 60 * 1000),
          notes: task.description,
        };
        const eventId = await addEventToCalendar(eventData);
        if (eventId) {
          newAddedTaskIds.add(task.id);
          addedCount++;
        }
      }
    }

    if (addedCount > 0) {
      setAddedTaskIds(newAddedTaskIds);
    }
  };

  return { handleAddTasksToCalendar };
};

export default useCalendarEvents;