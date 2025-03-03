// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Calendar, LocaleConfig } from 'react-native-calendars';
// import { useFocusEffect } from '@react-navigation/native';
// import { collection, onSnapshot, query } from 'firebase/firestore';
// import { db } from './../../configs/firebaseConfig'; 
// LocaleConfig.locales['en'] = {
//   monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
//   dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//   dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
//   today: 'Today',
// };
// LocaleConfig.defaultLocale = 'en';

// const CalendarScreen = ({ navigation }) => {
//   const [markedDates, setMarkedDates] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

//   // Fetch tasks from Firebase in real-time
//   useEffect(() => {
//     const tasksCollection = collection(db, 'tasks'); // Use the correct Firestore instance and collection name
//     const q = query(tasksCollection);

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const tasksData = [];
//       querySnapshot.forEach((doc) => {
//         tasksData.push({ id: doc.id, ...doc.data() });
//       });
//       setTasks(tasksData);
//       markCalendarDates(tasksData); // Mark dates on the calendar
//     });

//     return () => unsubscribe(); // Cleanup the listener on unmount
//   }, []);

//   // Mark dates on the calendar based on task deadlines
//   const markCalendarDates = (fetchedTasks) => {
//     const marked = {};

//     fetchedTasks.forEach((task) => {
//       const date = new Date(task.deadline).toISOString().split('T')[0];

//       if (!marked[date]) {
//         marked[date] = { dots: [], selectedColor: 'lightgray' };
//       }

//       let dotColor = 'blue';
//       if (task.priority === 'High') {
//         dotColor = 'red';
//       } else if (task.priority === 'Medium') {
//         dotColor = 'orange';
//       } else if (task.priority === 'Low') {
//         dotColor = 'green';
//       }

//       // Use task.id to ensure the key is unique
//       marked[date].dots.push({ key: `${task.id}-${date}`, color: dotColor });
//     });

//     setMarkedDates(marked);
//   };

//   // Handle day press to show tasks for the selected date
//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     const filteredTasks = tasks.filter((task) => {
//       return new Date(task.deadline).toISOString().split('T')[0] === day.dateString;
//     });
//     setTasksForSelectedDate(filteredTasks);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>My Tasks</Text>
//       </View>

//       {/* Calendar */}
//       <Calendar
//         markedDates={markedDates}
//         markingType={'multi-dot'}
//         onDayPress={onDayPress}
//       />

//       {/* Tasks for the selected date */}
//       {selectedDate && (
//         <View style={styles.taskContainer}>
//           <Text style={styles.selectedDateText}>Tasks for {selectedDate}:</Text>
//           {tasksForSelectedDate.length > 0 ? (
//             tasksForSelectedDate.map((task, index) => (
//               <View
//                 key={`${task.id}-${index}`}
//                 style={[
//                   styles.taskItem,
//                   {
//                     borderLeftColor:
//                       task.priority === 'High'
//                         ? 'red'
//                         : task.priority === 'Medium'
//                         ? 'orange'
//                         : 'green',
//                   },
//                 ]}
//               >
//                 <Text style={styles.taskText}>{task.name}</Text>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noTaskText}>No tasks for this day</Text>
//           )}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     marginTop: 60,
//     marginLeft: 20,
//     marginBottom: 24,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   taskContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginHorizontal: 10,
//   },
//   selectedDateText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   taskItem: {
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderLeftWidth: 5,
//   },
//   taskText: {
//     fontSize: 14,
//   },
//   noTaskText: {
//     fontSize: 14,
//     color: 'gray',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default CalendarScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './../../configs/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

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

  return (
    <ScrollView style={styles.container}>
    
        <Text style={styles.headerText}>My Calendar</Text>
     

      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          markingType={'multi-dot'}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#4CAF50',
            selectedDayBackgroundColor: '#4CAF50',
            selectedDayTextColor: '#fff',
            todayTextColor: '#4CAF50',
            dayTextColor: '#333',
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
        <View style={styles.taskContainer}>
          <Text style={styles.selectedDateText}>Tasks for {selectedDate}:</Text>
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task, index) => (
              <View
                key={`${task.id}-${index}`}
                style={[
                  styles.taskCard,
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
                <Text style={styles.taskName}>{task.name}</Text>
                <Text style={styles.taskDeadline}>
                  Deadline: {new Date(task.deadline).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 70,
    marginLeft: 20,
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
  taskContainer: {
    margin: 16,
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