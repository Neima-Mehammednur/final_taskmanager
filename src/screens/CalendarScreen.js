// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // // import { Calendar } from 'react-native-calendars';
// // // import * as CalendarAPI from 'expo-calendar';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // const CalendarScreen = () => {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [markedDates, setMarkedDates] = useState({});

// // //   // Fetch tasks from AsyncStorage on screen load
// // //   useEffect(() => {
// // //     fetchTasks();
// // //   }, []);

// // //   const fetchTasks = async () => {
// // //     try {
// // //       const storedTasks = await AsyncStorage.getItem('tasks');
// // //       if (storedTasks) {
// // //         const tasks = JSON.parse(storedTasks);
// // //         setTasks(tasks);
// // //         updateMarkedDates(tasks);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching tasks:', error);
// // //     }
// // //   };

// // //   // Update marked dates based on tasks
// // //   const updateMarkedDates = (tasks) => {
// // //     const marked = {};
// // //     tasks.forEach((task) => {
// // //       const date = new Date(task.deadline).toISOString().split('T')[0];
// // //       marked[date] = { marked: true, dotColor: '#007AFF', selected: true };
// // //     });
// // //     setMarkedDates(marked);
// // //   };

// // //   // Sync tasks with the device's native calendar
// // //   const syncWithNativeCalendar = async () => {
// // //     try {
// // //       const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
// // //       if (status !== 'granted') {
// // //         Alert.alert('Permission required', 'Please grant calendar access to sync tasks.');
// // //         return;
// // //       }

// // //       const calendarId = await getOrCreateCalendar();
// // //       for (const task of tasks) {
// // //         await CalendarAPI.createEventAsync(calendarId, {
// // //           title: task.name,
// // //           startDate: new Date(task.deadline),
// // //           endDate: new Date(task.deadline),
// // //           timeZone: 'GMT',
// // //         });
// // //       }
// // //       Alert.alert('Success', 'Tasks synced with the native calendar.');
// // //     } catch (error) {
// // //       console.error('Error syncing with calendar:', error);
// // //     }
// // //   };

// // //   // Get or create a calendar for the app
// // //   const getOrCreateCalendar = async () => {
// // //     const calendars = await CalendarAPI.getCalendarsAsync();
// // //     const existingCalendar = calendars.find((cal) => cal.title === 'Task Manager');
// // //     if (existingCalendar) return existingCalendar.id;

// // //     const newCalendar = await CalendarAPI.createCalendarAsync({
// // //       title: 'Task Manager',
// // //       color: '#007AFF',
// // //       entityType: CalendarAPI.EntityTypes.EVENT,
// // //       sourceId: 'default',
// // //       source: { isLocalAccount: true, name: 'Task Manager' },
// // //       name: 'Task Manager Calendar',
// // //       accessLevel: CalendarAPI.CalendarAccessLevel.OWNER,
// // //     });
// // //     return newCalendar.id;
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.headerText}>Calendar</Text>
// // //       <Calendar
// // //         markedDates={markedDates}
// // //         markingType="multi-dot"
// // //         onDayPress={(day) => {
// // //           const tasksForDay = tasks.filter(
// // //             (task) => new Date(task.deadline).toISOString().split('T')[0] === day.dateString
// // //           );
// // //           if (tasksForDay.length > 0) {
// // //             Alert.alert(
// // //               `Tasks for ${day.dateString}`,
// // //               tasksForDay.map((task) => task.name).join('\n')
// // //             );
// // //           }
// // //         }}
// // //       />
// // //       <TouchableOpacity style={styles.syncButton} onPress={syncWithNativeCalendar}>
// // //         <Text style={styles.syncButtonText}>Sync with Native Calendar</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 16,
// // //   },
// // //   headerText: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     marginBottom: 16,
// // //   },
// // //   syncButton: {
// // //     backgroundColor: '#007AFF',
// // //     padding: 12,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //     marginTop: 16,
// // //   },
// // //   syncButtonText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default CalendarScreen;


// // import React, { useState, useEffect } from 'react';
// // import { View, StyleSheet, Platform, Alert, ScrollView } from 'react-native';
// // import { Calendar } from 'react-native-calendars';
// // import * as CalendarExpo from 'expo-calendar';
// // import * as Permissions from 'expo-permissions';

// // const CalendarScreen = () => {
// //   const [markedDates, setMarkedDates] = useState({});
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     (async () => {
// //       const { status } = await Permissions.askAsync(Permissions.CALENDAR);
// //       if (status === 'granted') {
// //         fetchCalendarEvents();
// //       } else {
// //         Alert.alert('Calendar Permission Denied', 'Please enable calendar permissions in your device settings.');
// //       }
// //     })();
// //   }, []);

// //   const fetchCalendarEvents = async () => {
// //     try {
// //       const calendars = await CalendarExpo.getCalendarsAsync(CalendarExpo.EntityTypes.EVENT);
// //       if (calendars.length > 0) {
// //         const defaultCalendar = calendars[0]; // Or select a specific calendar
// //         const startDate = new Date();
// //         const endDate = new Date();
// //         endDate.setDate(endDate.getDate() + 30); // Fetch events for the next 30 days

// //         const fetchedEvents = await CalendarExpo.getEventsAsync(
// //           [defaultCalendar.id],
// //           startDate,
// //           endDate
// //         );

// //         setEvents(fetchedEvents);
// //         markCalendarDates(fetchedEvents);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching calendar events:', error);
// //       Alert.alert('Error', 'Could not fetch calendar events.');
// //     }
// //   };

// //   const markCalendarDates = (fetchedEvents) => {
// //     const marked = {};
// //     fetchedEvents.forEach((event) => {
// //       const date = new Date(event.startDate).toISOString().split('T')[0];
// //       marked[date] = { marked: true, dotColor: 'blue' };
// //     });
// //     setMarkedDates(marked);
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Calendar
// //         markedDates={markedDates}
// //         onDayPress={(day) => {
// //           const selectedDate = day.dateString;
// //           const eventsOnSelectedDate = events.filter((event) => {
// //             const eventDate = new Date(event.startDate).toISOString().split('T')[0];
// //             return eventDate === selectedDate;
// //           });

// //           if (eventsOnSelectedDate.length > 0) {
// //             let eventDetails = '';
// //             eventsOnSelectedDate.forEach((event) => {
// //               eventDetails += `${event.title}\n`;
// //             });
// //             Alert.alert('Events', eventDetails);
// //           } else {
// //             Alert.alert('No Events', 'No events on this day.');
// //           }
// //         }}
// //       />
// //       {/* You can add more components here if needed */}
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// // });

// // export default CalendarScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'en';

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    fetchTasksAndMarkDates();
  }, []);

  const fetchTasksAndMarkDates = async () => {
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
  };

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

      marked[date].dots.push({ key: task.name, color: dotColor });
    });

    setMarkedDates(marked);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const filteredTasks = tasks.filter(task => {
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
              <View key={index} style={[styles.taskItem, { borderLeftColor: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green' }]}>
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