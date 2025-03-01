// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import * as Progress from 'react-native-progress';
// // import * as Location from 'expo-location';
// // import { useFocusEffect } from '@react-navigation/native';

// // const DashboardScreen = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [weatherData, setWeatherData] = useState(null);
// //   const [greeting, setGreeting] = useState('');
// //   const [quote, setQuote] = useState('');

// //   // Fetch tasks, weather, and set greeting/quote when the screen comes into focus
// //   useFocusEffect(
// //     useCallback(() => {
// //       fetchTasks();
// //       fetchWeather();
// //       setGreetingAndQuote();
// //     }, [])
// //   );

// //   // Fetch tasks from AsyncStorage
// //   const fetchTasks = async () => {
// //     try {
// //       const storedTasks = await AsyncStorage.getItem('tasks');
// //       if (storedTasks) {
// //         setTasks(JSON.parse(storedTasks));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching tasks:', error);
// //     }
// //   };

// //   // Fetch weather data using the user's location
// //   const fetchWeather = async () => {
// //     const API_KEY = 'e55be00f9ada24e30fcbd080a5078a6a';
// //     try {
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') {
// //         console.error('Permission to access location was denied');
// //         return;
// //       }

// //       let location = await Location.getCurrentPositionAsync({});
// //       const { latitude, longitude } = location.coords;

// //       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

// //       const response = await fetch(url);
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       setWeatherData(data);
// //     } catch (error) {
// //       console.error('Error fetching weather:', error);
// //     }
// //   };

// //   // Set greeting and a random quote based on the time of day
// //   const setGreetingAndQuote = () => {
// //     const hour = new Date().getHours();
// //     let greetingText = 'Good ';
// //     if (hour < 12) {
// //       greetingText += 'Morning';
// //     } else if (hour < 18) {
// //       greetingText += 'Afternoon';
// //     } else {
// //       greetingText += 'Evening';
// //     }
// //     setGreeting(greetingText);

// //     const quotes = [
// //       'The only way to do great work is to love what you do.',
// //       'Believe you can and you’re halfway there.',
// //       'The future belongs to those who believe in the beauty of their dreams.',
// //     ];
// //     setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
// //   };

// //   // Calculate the progress of completed tasks
// //   const calculateProgress = () => {
// //     const completedTasks = tasks.filter((task) => task.completed).length;
// //     return tasks.length > 0 ? completedTasks / tasks.length : 0;
// //   };

// //   // Get tasks for today
// //   const getTodaysTasks = () => {
// //     const today = new Date().toISOString().split('T')[0];
// //     return tasks.filter((task) => task.deadline.split('T')[0] === today);
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerText}>Hello UserName</Text>
// //       </View>
// //       <Text style={styles.quote}>"{quote}"</Text>

// //       {/* Progress Circle */}
// //       <View style={styles.progressContainer}>
// //         <Progress.Circle
// //           progress={calculateProgress()}
// //           size={120}
// //           showsText={true}
// //           formatText={() => {
// //             const completedTasks = tasks.filter((task) => task.completed).length;
// //             return `${completedTasks}/${tasks.length}`;
// //           }}
// //           color="#007AFF"
// //           thickness={8}
// //         />
// //         <Text style={styles.progressText}>Tasks Completed</Text>
// //       </View>

// //       {/* Weather Information */}
// //       {weatherData && weatherData.main && (
// //         <View style={styles.weatherContainer}>
// //           <Text style={styles.weatherTitle}>Weather in {weatherData.name}</Text>
// //           <Text>Temperature: {weatherData.main.temp}°C</Text>
// //           <Text>Description: {weatherData.weather[0].description}</Text>
// //         </View>
// //       )}

// //       {/* Today's Tasks */}
// //       <View style={styles.todaysTasksContainer}>
// //         <Text style={styles.todaysTasksTitle}>Today's Tasks</Text>
// //         {getTodaysTasks().length > 0 ? (
// //           getTodaysTasks().map((task) => (
// //             <View key={task.id} style={styles.taskItem}>
// //               <Text style={styles.taskName}>{task.name}</Text>
// //               <Text style={styles.taskDeadline}>
// //                 Deadline: {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //               </Text>
// //             </View>
// //           ))
// //         ) : (
// //           <Text style={styles.noTasksText}>No tasks for today.</Text>
// //         )}
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     marginTop: 10,
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   header: {
// //     marginTop: 30,
// //     marginBottom: 24,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //   },

// //   quote: {
// //     fontStyle: 'italic',
// //     marginBottom: 20,
// //     color: '#666',
// //   },
// //   progressContainer: {
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   progressText: {
// //     marginTop: 10,
// //     fontSize: 16,
// //     color: '#007AFF',
// //   },
// //   weatherContainer: {
// //     backgroundColor: '#fff',
// //     padding: 16,
// //     borderRadius: 8,
// //     marginBottom: 20,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   weatherTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     color: '#333',
// //   },
// //   todaysTasksContainer: {
// //     backgroundColor: '#fff',
// //     padding: 16,
// //     borderRadius: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   todaysTasksTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     color: '#333',
// //   },
// //   taskItem: {
// //     marginBottom: 10,
// //     padding: 10,
// //     backgroundColor: '#f9f9f9',
// //     borderRadius: 8,
// //   },
// //   taskName: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   taskDeadline: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   noTasksText: {
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //   },

// // });

// // export default DashboardScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import * as Progress from 'react-native-progress';
// import * as Location from 'expo-location';
// import { useFocusEffect } from '@react-navigation/native';
// import { collection, onSnapshot, query } from 'firebase/firestore';
// import { db } from '../services/firebaseService'; // Import your Firebase db instance

// const DashboardScreen = () => {
//   const [tasks, setTasks] = useState([]);
//   const [weatherData, setWeatherData] = useState(null);
//   const [greeting, setGreeting] = useState('');
//   const [quote, setQuote] = useState('');

//   // Fetch tasks from Firebase in real-time
//   useEffect(() => {
//     const tasksCollection = collection(db, 'tasks'); // Replace 'tasks' with your collection name
//     const q = query(tasksCollection);

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const tasksData = [];
//       querySnapshot.forEach((doc) => {
//         tasksData.push({ id: doc.id, ...doc.data() });
//       });
//       setTasks(tasksData);
//     });

//     return () => unsubscribe(); // Cleanup the listener on unmount
//   }, []);

//   // Fetch weather data using the user's location
//   const fetchWeather = async () => {
//     const API_KEY = 'e55be00f9ada24e30fcbd080a5078a6a';
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;

//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setWeatherData(data);
//     } catch (error) {
//       console.error('Error fetching weather:', error);
//     }
//   };

//   // Set greeting and a random quote based on the time of day
//   const setGreetingAndQuote = () => {
//     const hour = new Date().getHours();
//     let greetingText = 'Good ';
//     if (hour < 12) {
//       greetingText += 'Morning';
//     } else if (hour < 18) {
//       greetingText += 'Afternoon';
//     } else {
//       greetingText += 'Evening';
//     }
//     setGreeting(greetingText);

//     const quotes = [
//       'The only way to do great work is to love what you do.',
//       'Believe you can and you’re halfway there.',
//       'The future belongs to those who believe in the beauty of their dreams.',
//     ];
//     setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
//   };

//   // Calculate the progress of completed tasks
//   const calculateProgress = () => {
//     const completedTasks = tasks.filter((task) => task.completed).length;
//     return tasks.length > 0 ? completedTasks / tasks.length : 0;
//   };

//   // Get tasks for today
//   const getTodaysTasks = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return tasks.filter((task) => task.deadline.split('T')[0] === today);
//   };

//   // Fetch weather and set greeting/quote when the screen comes into focus
//   useFocusEffect(
//     React.useCallback(() => {
//       fetchWeather();
//       setGreetingAndQuote();
//     }, [])
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Hello UserName</Text>
//       </View>
//       <Text style={styles.quote}>"{quote}"</Text>

//       {/* Progress Circle */}
//       <View style={styles.progressContainer}>
//         <Progress.Circle
//           progress={calculateProgress()}
//           size={120}
//           showsText={true}
//           formatText={() => {
//             const completedTasks = tasks.filter((task) => task.completed).length;
//             return `${completedTasks}/${tasks.length}`;
//           }}
//           color="#007AFF"
//           thickness={8}
//         />
//         <Text style={styles.progressText}>Tasks Completed</Text>
//       </View>

//       {/* Weather Information */}
//       {weatherData && weatherData.main && (
//         <View style={styles.weatherContainer}>
//           <Text style={styles.weatherTitle}>Weather in {weatherData.name}</Text>
//           <Text>Temperature: {weatherData.main.temp}°C</Text>
//           <Text>Description: {weatherData.weather[0].description}</Text>
//         </View>
//       )}

//       {/* Today's Tasks */}
//       <View style={styles.todaysTasksContainer}>
//         <Text style={styles.todaysTasksTitle}>Today's Tasks</Text>
//         {getTodaysTasks().length > 0 ? (
//           getTodaysTasks().map((task) => (
//             <View key={task.id} style={styles.taskItem}>
//               <Text style={styles.taskName}>{task.name}</Text>
//               <Text style={styles.taskDeadline}>
//                 Deadline: {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </Text>
//             </View>
//           ))
//         ) : (
//           <Text style={styles.noTasksText}>No tasks for today.</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 10,
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     marginTop: 30,
//     marginBottom: 24,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   quote: {
//     fontStyle: 'italic',
//     marginBottom: 20,
//     color: '#666',
//   },
//   progressContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   progressText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#007AFF',
//   },
//   weatherContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   weatherTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   todaysTasksContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   todaysTasksTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   taskItem: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   taskName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   taskDeadline: {
//     fontSize: 14,
//     color: '#666',
//   },
//   noTasksText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
// });

// export default DashboardScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import * as Location from 'expo-location';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { fetchTasks } from '../services/firebaseService'; // Import your Firebase service

const DashboardScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState('');
  const isFocused = useIsFocused();

    useFocusEffect(
        useCallback(() => {
            fetchWeather();
            setGreetingAndQuote();
        }, [])
    );

  useEffect(() => {
    if (isFocused) {
      const loadTasks = async () => {
        try {
          const fetchedTasks = await fetchTasks();
          setTasks(fetchedTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      loadTasks();
    }
  }, [isFocused]);

  // Fetch weather data using the user's location
  const fetchWeather = async () => {
    const API_KEY = 'e55be00f9ada24e30fcbd080a5078a6a';
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Set greeting and a random quote based on the time of day
  const setGreetingAndQuote = () => {
    const hour = new Date().getHours();
    let greetingText = 'Good ';
    if (hour < 12) {
      greetingText += 'Morning';
    } else if (hour < 18) {
      greetingText += 'Afternoon';
    } else {
      greetingText += 'Evening';
    }
    setGreeting(greetingText);

    const quotes = [
      'The only way to do great work is to love what you do.',
      'Believe you can and you’re halfway there.',
      'The future belongs to those who believe in the beauty of their dreams.',
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  // Calculate the progress of completed tasks
  const calculateProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return tasks.length > 0 ? completedTasks / tasks.length : 0;
  };

  // Get tasks for today
  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter((task) => {
      if (task.deadline) {
        return task.deadline.split('T')[0] === today;
      }
      return false; // Or handle as you wish, like return true to show undefined deadlines.
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello UserName</Text>
      </View>
      <Text style={styles.quote}>"{quote}"</Text>

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <Progress.Circle
          progress={calculateProgress()}
          size={120}
          showsText={true}
          formatText={() => {
            const completedTasks = tasks.filter((task) => task.completed).length;
            return `${completedTasks}/${tasks.length}`;
          }}
          color="#007AFF"
          thickness={8}
        />
        <Text style={styles.progressText}>Tasks Completed</Text>
      </View>

      {/* Weather Information */}
      {weatherData && weatherData.main && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>Weather in {weatherData.name}</Text>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
        </View>
      )}

      {/* Today's Tasks */}
      <View style={styles.todaysTasksContainer}>
        <Text style={styles.todaysTasksTitle}>Today's Tasks</Text>
        {getTodaysTasks().length > 0 ? (
          getTodaysTasks().map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskName}>{task.name}</Text>
              <Text style={styles.taskDeadline}>
                Deadline: {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>No tasks for today.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 30,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#666',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  todaysTasksContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todaysTasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDeadline: {
    fontSize: 14,
    color: '#666',
  },
  noTasksText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default DashboardScreen;