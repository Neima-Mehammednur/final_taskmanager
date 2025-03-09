
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { DarkModeContext } from '../contexts/DarkModeContext';
import CalendarComponent from '../components/CalendarComponent';
import TaskListComponent from '../components/TaskListComponent';
import useCalendarEvents from '../hooks/useCalendarEvents';
import { colors } from '../constants/theme';

const CalendarScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);
  const { handleAddTasksToCalendar } = useCalendarEvents();

  useEffect(() => {
    const tasksCollection = collection(db, 'tasks');
    const q = query(tasksCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
      markCalendarDates(tasksData);
      selectToday(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const markCalendarDates = (fetchedTasks) => {
    const marked = {};
    fetchedTasks.forEach((task) => {
      const date = new Date(task.deadline).toISOString().split('T')[0];
      if (!marked[date]) {
        marked[date] = { dots: [], selectedColor: colors.primary };
      }
      let dotColor = '#2196F3';
      if (task.priority === 'High') dotColor = '#FF5252';
      else if (task.priority === 'Medium') dotColor = '#FFA726';
      marked[date].dots.push({ key: task.id, color: dotColor });
    });
    setMarkedDates(marked);
  };

  const selectToday = (allTasks) => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    const todaysTasks = allTasks.filter((task) => new Date(task.deadline).toISOString().split('T')[0] === today);
    setTasksForSelectedDate(todaysTasks);
  };

  const onDayPress = async (day) => {
    setSelectedDate(day.dateString);
    const filteredTasks = tasks.filter((task) => new Date(task.deadline).toISOString().split('T')[0] === day.dateString);
    setTasksForSelectedDate(filteredTasks);
    await handleAddTasksToCalendar(filteredTasks);
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.headerText, isDarkMode && styles.darkText]}>My Calendar</Text>
      <CalendarComponent markedDates={markedDates} onDayPress={onDayPress} isDarkMode={isDarkMode} />
      {selectedDate && (
        <TaskListComponent tasks={tasksForSelectedDate} onTaskPress={(task) => navigation.navigate('TaskDetail', { task })} isDarkMode={isDarkMode} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 70,
    marginLeft: 20,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default CalendarScreen;