
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

  const fetchTasksAndMarkDates = useCallback(async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        markCalendarDates(parsedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasksAndMarkDates();
    }, [fetchTasksAndMarkDates])
  );

  const markCalendarDates = (fetchedTasks) => {
    const marked = {};

    fetchedTasks.forEach((task) => {
      const date = new Date(task.deadline).toISOString().split('T')[0];

      if (!marked[date]) {
        marked[date] = { dots: [], selectedColor: 'lightgray' };
      }

      let dotColor = 'blue';
      if (task.priority === 'High') {
        dotColor = 'red';
      } else if (task.priority === 'Medium') {
        dotColor = 'orange';
      } else if (task.priority === 'Low') {
        dotColor = 'green';
      }

      // Use task.id to ensure the key is unique
      marked[date].dots.push({ key: `${task.id}-${date}`, color: dotColor });
    });

    setMarkedDates(marked);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const filteredTasks = tasks.filter((task) => {
      return new Date(task.deadline).toISOString().split('T')[0] === day.dateString;
    });
    setTasksForSelectedDate(filteredTasks);
  };

  return (
    <ScrollView style={styles.container}>
      <Calendar
        markedDates={markedDates}
        markingType={'multi-dot'}
        onDayPress={onDayPress}
      />

      {selectedDate && (
        <View style={styles.taskContainer}>
          <Text style={styles.selectedDateText}>Tasks for {selectedDate}:</Text>
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task, index) => (
              <View key={`${task.id}-${index}`} style={[styles.taskItem, { borderLeftColor: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green' }]}>
                <Text style={styles.taskText}>{task.name}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noTaskText}>No tasks for this day</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  taskContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderLeftWidth: 5,
  },
  taskText: {
    fontSize: 14,
  },
  noTaskText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CalendarScreen;