

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { DarkModeContext } from '../contexts/DarkModeContext'; // Import DarkModeContext

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const CalendarScreen = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext); // Use DarkModeContext

  
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
        marked[date] = { dots: [], selectedColor: '#4CAF50' };
      }

      let dotColor = '#2196F3';
      if (task.priority === 'High') {
        dotColor = '#FF5252';
      } else if (task.priority === 'Medium') {
        dotColor = '#FFA726';
      }

      marked[date].dots.push({ key: `${task.id}-${date}`, color: dotColor });
    });

    setMarkedDates(marked);
  };

  const selectToday = (allTasks) => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    const todaysTasks = allTasks.filter((task) => {
      return new Date(task.deadline).toISOString().split('T')[0] === today;
    });

    setTasksForSelectedDate(todaysTasks);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const filteredTasks = tasks.filter((task) => {
      return new Date(task.deadline).toISOString().split('T')[0] === day.dateString;
    });
    setTasksForSelectedDate(filteredTasks);
  };

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { task });
  };


  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.headerText, isDarkMode && styles.darkText]}>My Calendar</Text>

      <View style={[styles.calendarContainer, isDarkMode && styles.darkCalendarContainer]}>
        <Calendar
          markedDates={markedDates}
          markingType={'multi-dot'}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: isDarkMode ? '#1E1E1E' : '#fff', // Apply dark mode background
            calendarBackground: isDarkMode ? '#1E1E1E' : '#fff', // Apply dark mode background
            textSectionTitleColor: '#4CAF50',
            selectedDayBackgroundColor: '#4CAF50',
            selectedDayTextColor: '#fff',
            todayTextColor: '#4CAF50',
            dayTextColor: isDarkMode ? '#FFF' : '#333', // Apply dark mode text color
            textDisabledColor: '#ccc',
            arrowColor: '#4CAF50',
            monthTextColor: '#4CAF50',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
        />
      </View>

      {selectedDate && (
        <View style={[styles.taskContainer, isDarkMode && styles.darkTaskContainer]}>
          <Text style={[styles.selectedDateText, isDarkMode && styles.darkText]}>Tasks for {selectedDate}:</Text>
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task, index) => (
              <TouchableOpacity
                key={`${task.id}-${index}`}
                onPress={() => handleTaskPress(task)}
              >
                <View
                  style={[
                    styles.taskCard,
                    isDarkMode && styles.darkTaskCard,
                    {
                      borderLeftColor:
                        task.priority === 'High'
                          ? '#FF5252'
                          : task.priority === 'Medium'
                          ? '#FFA726'
                          : '#4CAF50',
                    },
                  ]}
                >
                  <Text style={[styles.taskName, isDarkMode && styles.darkText]}>{task.name}</Text>
                  <Text style={[styles.taskDeadline, isDarkMode && styles.darkText]}>
                    Deadline: {new Date(task.deadline).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={[styles.noTaskText, isDarkMode && styles.darkText]}>No tasks for this day</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkContainer:{
    backgroundColor: '#121212',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 70,
    marginLeft: 20,
  },
  darkText:{
    color: '#FFF',
  },
  calendarContainer: {
    margin: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCalendarContainer:{
    backgroundColor: '#1E1E1E',
  },
  taskContainer: {
    margin: 16,
  },
  darkTaskContainer:{
    backgroundColor: '#1E1E1E',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkTaskCard:{
    backgroundColor: '#2C2C2C',
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDeadline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noTaskText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default CalendarScreen;