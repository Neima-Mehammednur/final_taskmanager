// // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // import {
// // // // // // // // //   View,
// // // // // // // // //   Text,
// // // // // // // // //   FlatList,
// // // // // // // // //   TouchableOpacity,
// // // // // // // // //   StyleSheet,
// // // // // // // // //   Alert,
// // // // // // // // // } from 'react-native';
// // // // // // // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // // // // // // import { useIsFocused } from '@react-navigation/native';
// // // // // // // // // import { Ionicons } from '@expo/vector-icons';

// // // // // // // // // const TaskListScreen = ({ navigation }) => {
// // // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // // //   const [filter, setFilter] = useState('All'); // Default filter
// // // // // // // // //   const isFocused = useIsFocused();

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (isFocused) {
// // // // // // // // //       fetchTasks();
// // // // // // // // //     }
// // // // // // // // //   }, [isFocused]);

// // // // // // // // //   const fetchTasks = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const storedTasks = await AsyncStorage.getItem('tasks');
// // // // // // // // //       if (storedTasks) {
// // // // // // // // //         setTasks(JSON.parse(storedTasks));
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching tasks:', error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleDeleteTask = async (taskId) => {
// // // // // // // // //     try {
// // // // // // // // //       const updatedTasks = tasks.filter((task) => task.id !== taskId);
// // // // // // // // //       await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
// // // // // // // // //       setTasks(updatedTasks);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error deleting task:', error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleToggleComplete = async (taskId) => {
// // // // // // // // //     try {
// // // // // // // // //       const updatedTasks = tasks.map((task) =>
// // // // // // // // //         task.id === taskId ? { ...task, completed: !task.completed } : task
// // // // // // // // //       );
// // // // // // // // //       await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
// // // // // // // // //       setTasks(updatedTasks);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error toggling task completion:', error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Filter tasks based on the selected filter
// // // // // // // // //   const filteredTasks = tasks.filter((task) => {
// // // // // // // // //     if (filter === 'All') return true;
// // // // // // // // //     if (filter === 'Completed') return task.completed;
// // // // // // // // //     return task.category === filter;
// // // // // // // // //   });

// // // // // // // // //   const renderTaskItem = ({ item }) => (
// // // // // // // // //     <View
// // // // // // // // //       style={[
// // // // // // // // //         styles.taskItem,
// // // // // // // // //         item.priority === 'High' && styles.highPriorityTask,
// // // // // // // // //       ]}
// // // // // // // // //     >
// // // // // // // // //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // // // // // // // //         <Ionicons
// // // // // // // // //           name={item.completed ? 'checkbox-outline' : 'square-outline'}
// // // // // // // // //           size={24}
// // // // // // // // //           color={item.completed ? 'green' : '#ccc'}
// // // // // // // // //         />
// // // // // // // // //       </TouchableOpacity>
// // // // // // // // //       <View style={styles.taskDetails}>
// // // // // // // // //         <Text style={[styles.taskName, item.completed && styles.completedTask]}>
// // // // // // // // //           {item.name}
// // // // // // // // //         </Text>
// // // // // // // // //         <Text style={styles.taskDescription}>{item.description}</Text>
// // // // // // // // //         <Text style={styles.taskDeadline}>
// // // // // // // // //           Deadline: {new Date(item.deadline).toLocaleDateString()}
// // // // // // // // //         </Text>
// // // // // // // // //         {item.priority === 'High' && (
// // // // // // // // //           <Text style={styles.highPriorityText}>High Priority</Text>
// // // // // // // // //         )}
// // // // // // // // //         {item.reminder && (
// // // // // // // // //           <View style={styles.reminderIndicator}>
// // // // // // // // //             <Ionicons name="notifications-outline" size={16} color="#007AFF" />
// // // // // // // // //             <Text style={styles.reminderText}>Reminder Set</Text>
// // // // // // // // //           </View>
// // // // // // // // //         )}
// // // // // // // // //       </View>
// // // // // // // // //       <TouchableOpacity onPress={() => navigation.navigate('TaskCreation', { task: item })}>
// // // // // // // // //         <Ionicons name="create-outline" size={24} color="#007AFF" />
// // // // // // // // //       </TouchableOpacity>
// // // // // // // // //       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // // // // // // // //         <Ionicons name="trash-outline" size={24} color="red" />
// // // // // // // // //       </TouchableOpacity>
// // // // // // // // //     </View>
// // // // // // // // //   );

// // // // // // // // //   return (
// // // // // // // // //     <View style={styles.container}>
// // // // // // // // //       {/* Header */}
// // // // // // // // //       <View style={styles.header}>
// // // // // // // // //         <Text style={styles.headerText}>My Tasks</Text>
// // // // // // // // //       </View>

// // // // // // // // //       {/* Filter Buttons */}
// // // // // // // // //       <View style={styles.filterContainer}>
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
// // // // // // // // //           onPress={() => setFilter('All')}
// // // // // // // // //         >
// // // // // // // // //           <Text style={styles.filterText}>All</Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={[styles.filterButton, filter === 'Personal' && styles.activeFilter]}
// // // // // // // // //           onPress={() => setFilter('Personal')}
// // // // // // // // //         >
// // // // // // // // //           <Text style={styles.filterText}>Personal</Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={[styles.filterButton, filter === 'Work' && styles.activeFilter]}
// // // // // // // // //           onPress={() => setFilter('Work')}
// // // // // // // // //         >
// // // // // // // // //           <Text style={styles.filterText}>Work</Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={[styles.filterButton, filter === 'Education' && styles.activeFilter]}
// // // // // // // // //           onPress={() => setFilter('Education')}
// // // // // // // // //         >
// // // // // // // // //           <Text style={styles.filterText}>Education</Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={[styles.filterButton, filter === 'Completed' && styles.activeFilter]}
// // // // // // // // //           onPress={() => setFilter('Completed')}
// // // // // // // // //         >
// // // // // // // // //           <Text style={styles.filterText}>Completed</Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //       </View>

// // // // // // // // //       {/* Task List */}
// // // // // // // // //       <FlatList
// // // // // // // // //         data={filteredTasks}
// // // // // // // // //         renderItem={renderTaskItem}
// // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // //         contentContainerStyle={styles.listContainer}
// // // // // // // // //       />
// // // // // // // // //     </View>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // //   container: {
// // // // // // // // //     marginTop: 50,
// // // // // // // // //     flex: 1,
// // // // // // // // //     justifyContent: 'flex-start',
// // // // // // // // //     alignItems: 'stretch',
// // // // // // // // //     padding: 16,
// // // // // // // // //     height: '100%',
// // // // // // // // //   },
// // // // // // // // //   header: {
// // // // // // // // //     marginBottom: 24,
// // // // // // // // //   },
// // // // // // // // //   headerText: {
// // // // // // // // //     fontSize: 24,
// // // // // // // // //     fontWeight: 'bold',
// // // // // // // // //   },
// // // // // // // // //   filterContainer: {
// // // // // // // // //     flexDirection: 'row',
// // // // // // // // //     justifyContent: 'space-between',
// // // // // // // // //     marginBottom: 16,
// // // // // // // // //   },
// // // // // // // // //   filterButton: {
// // // // // // // // //     padding: 8,
// // // // // // // // //     borderRadius: 8,
// // // // // // // // //     borderWidth: 1,
// // // // // // // // //     borderColor: '#ccc',
// // // // // // // // //   },
// // // // // // // // //   activeFilter: {
// // // // // // // // //     backgroundColor: '#007AFF',
// // // // // // // // //     borderColor: '#007AFF',
// // // // // // // // //   },
// // // // // // // // //   filterText: {
// // // // // // // // //     color: '#000',
// // // // // // // // //   },
// // // // // // // // //   listContainer: {
// // // // // // // // //     paddingBottom: 16,
// // // // // // // // //   },
// // // // // // // // //   taskItem: {
// // // // // // // // //     flexDirection: 'row',
// // // // // // // // //     alignItems: 'center',
// // // // // // // // //     padding: 16,
// // // // // // // // //     borderBottomWidth: 1,
// // // // // // // // //     borderBottomColor: '#ccc',
// // // // // // // // //     marginBottom: 8,
// // // // // // // // //     borderRadius: 8,
// // // // // // // // //     backgroundColor: '#fff',
// // // // // // // // //   },
// // // // // // // // //   highPriorityTask: {
// // // // // // // // //     borderLeftWidth: 4,
// // // // // // // // //     borderLeftColor: 'red',
// // // // // // // // //   },
// // // // // // // // //   highPriorityText: {
// // // // // // // // //     color: 'red',
// // // // // // // // //     fontWeight: 'bold',
// // // // // // // // //     fontSize: 14, 
// // // // // // // // //   },
// // // // // // // // //   taskDetails: {
// // // // // // // // //     flex: 1,
// // // // // // // // //     marginLeft: 16,
// // // // // // // // //   },
// // // // // // // // //   taskName: {
// // // // // // // // //     fontSize: 16,
// // // // // // // // //     fontWeight: 'bold',
// // // // // // // // //   },
// // // // // // // // //   taskDescription: {
// // // // // // // // //     fontSize: 14,
// // // // // // // // //     color: '#666',
// // // // // // // // //   },
// // // // // // // // //   taskDeadline: {
// // // // // // // // //     fontSize: 12,
// // // // // // // // //     color: '#888',
// // // // // // // // //   },
// // // // // // // // //   taskPriority: {
// // // // // // // // //     fontSize: 12,
// // // // // // // // //     color: '#888',
// // // // // // // // //   },
// // // // // // // // //   completedTask: {
// // // // // // // // //     textDecorationLine: 'line-through',
// // // // // // // // //     color: '#888',
// // // // // // // // //   },
// // // // // // // // //   reminderIndicator: {
// // // // // // // // //     flexDirection: 'row',
// // // // // // // // //     alignItems: 'center',
// // // // // // // // //     marginTop: 4,
// // // // // // // // //   },
// // // // // // // // //   reminderText: {
// // // // // // // // //     fontSize: 12,
// // // // // // // // //     color: '#007AFF',
// // // // // // // // //     marginLeft: 4,
// // // // // // // // //   },
// // // // // // // // // });

// // // // // // // // // export default TaskListScreen;

// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// // // // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // // // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// // // // // // // // const TaskListScreen = ({ navigation }) => {
// // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // //   const [filter, setFilter] = useState("All");

// // // // // // // //   useEffect(() => {
// // // // // // // //     const loadTasks = async () => {
// // // // // // // //       const fetchedTasks = await fetchTasks();
// // // // // // // //       setTasks(fetchedTasks);
// // // // // // // //     };
// // // // // // // //     loadTasks();
// // // // // // // //   }, []);

// // // // // // // //   const handleDeleteTask = async (taskId) => {
// // // // // // // //     await deleteTask(taskId);
// // // // // // // //     setTasks(tasks.filter((task) => task.id !== taskId));
// // // // // // // //   };

// // // // // // // //   const handleToggleComplete = async (taskId) => {
// // // // // // // //     const task = tasks.find((task) => task.id === taskId);
// // // // // // // //     const updatedTask = { ...task, completed: !task.completed };
// // // // // // // //     await updateTask(taskId, updatedTask);
// // // // // // // //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// // // // // // // //   };

// // // // // // // //   const filteredTasks = tasks.filter((task) => {
// // // // // // // //     if (filter === "All") return true;
// // // // // // // //     return task.course === filter;
// // // // // // // //   });

// // // // // // // //   return (
// // // // // // // //     <View style={styles.container}>
// // // // // // // //       {/* Filter Buttons */}
// // // // // // // //       <View style={styles.filterContainer}>
// // // // // // // //         {["All", "Math", "Science", "History"].map((course) => (
// // // // // // // //           <TouchableOpacity
// // // // // // // //             key={course}
// // // // // // // //             style={[styles.filterButton, filter === course && styles.activeFilter]}
// // // // // // // //             onPress={() => setFilter(course)}
// // // // // // // //           >
// // // // // // // //             <Text style={styles.filterText}>{course}</Text>
// // // // // // // //           </TouchableOpacity>
// // // // // // // //         ))}
// // // // // // // //       </View>

// // // // // // // //       {/* Task List */}
// // // // // // // //       <FlatList
// // // // // // // //         data={filteredTasks}
// // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // //         renderItem={({ item }) => (
// // // // // // // //           <View style={styles.taskItem}>
// // // // // // // //             <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // // // // // // //               <Ionicons
// // // // // // // //                 name={item.completed ? "checkbox-outline" : "square-outline"}
// // // // // // // //                 size={24}
// // // // // // // //                 color={item.completed ? "green" : "#ccc"}
// // // // // // // //               />
// // // // // // // //             </TouchableOpacity>
// // // // // // // //             <View style={styles.taskDetails}>
// // // // // // // //               <Text style={styles.taskName}>{item.name}</Text>
// // // // // // // //               <Text style={styles.taskCourse}>{item.course}</Text>
// // // // // // // //               <Text style={styles.taskDeadline}>
// // // // // // // //                 Deadline: {new Date(item.deadline).toLocaleString()}
// // // // // // // //               </Text>
// // // // // // // //             </View>
// // // // // // // //             <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
// // // // // // // //               <Ionicons name="create-outline" size={24} color="#007AFF" />
// // // // // // // //             </TouchableOpacity>
// // // // // // // //             <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // // // // // // //               <Ionicons name="trash-outline" size={24} color="red" />
// // // // // // // //             </TouchableOpacity>
// // // // // // // //           </View>
// // // // // // // //         )}
// // // // // // // //       />
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: {
// // // // // // // //     flex: 1,
// // // // // // // //     padding: 16,
// // // // // // // //   },
// // // // // // // //   filterContainer: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     marginBottom: 16,
// // // // // // // //   },
// // // // // // // //   filterButton: {
// // // // // // // //     padding: 8,
// // // // // // // //     borderRadius: 8,
// // // // // // // //     borderWidth: 1,
// // // // // // // //     borderColor: "#ccc",
// // // // // // // //   },
// // // // // // // //   activeFilter: {
// // // // // // // //     backgroundColor: "#007AFF",
// // // // // // // //     borderColor: "#007AFF",
// // // // // // // //   },
// // // // // // // //   filterText: {
// // // // // // // //     color: "#000",
// // // // // // // //   },
// // // // // // // //   taskItem: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     alignItems: "center",
// // // // // // // //     padding: 16,
// // // // // // // //     borderBottomWidth: 1,
// // // // // // // //     borderBottomColor: "#ccc",
// // // // // // // //   },
// // // // // // // //   taskDetails: {
// // // // // // // //     flex: 1,
// // // // // // // //     marginLeft: 16,
// // // // // // // //   },
// // // // // // // //   taskName: {
// // // // // // // //     fontSize: 16,
// // // // // // // //     fontWeight: "bold",
// // // // // // // //   },
// // // // // // // //   taskCourse: {
// // // // // // // //     fontSize: 14,
// // // // // // // //     color: "#666",
// // // // // // // //   },
// // // // // // // //   taskDeadline: {
// // // // // // // //     fontSize: 12,
// // // // // // // //     color: "#888",
// // // // // // // //   },
// // // // // // // // });

// // // // // // // // export default TaskListScreen;


// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// // // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// // // // // // // const TaskListScreen = ({ navigation, route }) => {
// // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // //   const [filter, setFilter] = useState("All");

// // // // // // //   // Fetch tasks when the screen is focused or refreshed
// // // // // // //   useEffect(() => {
// // // // // // //     const loadTasks = async () => {
// // // // // // //       const fetchedTasks = await fetchTasks();
// // // // // // //       setTasks(fetchedTasks);
// // // // // // //     };
// // // // // // //     loadTasks();
// // // // // // //   }, [route.params?.refresh]); // Refresh when the refresh flag is passed

// // // // // // //   const handleDeleteTask = async (taskId) => {
// // // // // // //     await deleteTask(taskId);
// // // // // // //     setTasks(tasks.filter((task) => task.id !== taskId));
// // // // // // //   };

// // // // // // //   const handleToggleComplete = async (taskId) => {
// // // // // // //     const task = tasks.find((task) => task.id === taskId);
// // // // // // //     const updatedTask = { ...task, completed: !task.completed };
// // // // // // //     await updateTask(taskId, updatedTask);
// // // // // // //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// // // // // // //   };

// // // // // // //   const filteredTasks = tasks.filter((task) => {
// // // // // // //     if (filter === "All") return true;
// // // // // // //     return task.course === filter;
// // // // // // //   });

// // // // // // //   return (
// // // // // // //     <ScrollView contentContainerStyle={styles.container}>
// // // // // // //       {/* Header */}
// // // // // // //       <View style={styles.header}>
// // // // // // //         <Text style={styles.headerText}>Task List</Text>
// // // // // // //       </View>

// // // // // // //       {/* Filter Buttons */}
// // // // // // //       <View style={styles.filterContainer}>
// // // // // // //         {["All", "Math", "Science", "History"].map((course) => (
// // // // // // //           <TouchableOpacity
// // // // // // //             key={course}
// // // // // // //             style={[styles.filterButton, filter === course && styles.activeFilter]}
// // // // // // //             onPress={() => setFilter(course)}
// // // // // // //           >
// // // // // // //             <Text style={styles.filterText}>{course}</Text>
// // // // // // //           </TouchableOpacity>
// // // // // // //         ))}
// // // // // // //       </View>

// // // // // // //       {/* Task List */}
// // // // // // //       <FlatList
// // // // // // //         data={filteredTasks}
// // // // // // //         keyExtractor={(item) => item.id}
// // // // // // //         renderItem={({ item }) => (
// // // // // // //           <View style={styles.taskItem}>
// // // // // // //             <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // // // // // //               <Ionicons
// // // // // // //                 name={item.completed ? "checkbox-outline" : "square-outline"}
// // // // // // //                 size={24}
// // // // // // //                 color={item.completed ? "green" : "#ccc"}
// // // // // // //               />
// // // // // // //             </TouchableOpacity>
// // // // // // //             <View style={styles.taskDetails}>
// // // // // // //               <Text style={styles.taskName}>{item.name}</Text>
// // // // // // //               <Text style={styles.taskCourse}>{item.course}</Text>
// // // // // // //               <Text style={styles.taskDeadline}>
// // // // // // //                 Deadline: {new Date(item.deadline).toLocaleString()}
// // // // // // //               </Text>
// // // // // // //             </View>
// // // // // // //             <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
// // // // // // //               <Ionicons name="create-outline" size={24} color="#007AFF" />
// // // // // // //             </TouchableOpacity>
// // // // // // //             <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // // // // // //               <Ionicons name="trash-outline" size={24} color="red" />
// // // // // // //             </TouchableOpacity>
// // // // // // //           </View>
// // // // // // //         )}
// // // // // // //       />
// // // // // // //     </ScrollView>
// // // // // // //   );
// // // // // // // };

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     marginTop: 50,
// // // // // // //     flex: 1,
// // // // // // //     padding: 16,
// // // // // // //   },
// // // // // // //   header: {
// // // // // // //     marginBottom: 24,
// // // // // // //   },
// // // // // // //   headerText: {
// // // // // // //     fontSize: 24,
// // // // // // //     fontWeight: 'bold',
// // // // // // //   },
// // // // // // //   filterContainer: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     marginBottom: 16,
// // // // // // //   },
// // // // // // //   filterButton: {
// // // // // // //     padding: 8,
// // // // // // //     borderRadius: 8,
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: '#ccc',
// // // // // // //   },
// // // // // // //   activeFilter: {
// // // // // // //     backgroundColor: '#007AFF',
// // // // // // //     borderColor: '#007AFF',
// // // // // // //   },
// // // // // // //   filterText: {
// // // // // // //     color: '#000',
// // // // // // //   },
// // // // // // //   taskItem: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     alignItems: 'center',
// // // // // // //     padding: 16,
// // // // // // //     borderBottomWidth: 1,
// // // // // // //     borderBottomColor: '#ccc',
// // // // // // //   },
// // // // // // //   taskDetails: {
// // // // // // //     flex: 1,
// // // // // // //     marginLeft: 16,
// // // // // // //   },
// // // // // // //   taskName: {
// // // // // // //     fontSize: 16,
// // // // // // //     fontWeight: 'bold',
// // // // // // //   },
// // // // // // //   taskCourse: {
// // // // // // //     fontSize: 14,
// // // // // // //     color: '#666',
// // // // // // //   },
// // // // // // //   taskDeadline: {
// // // // // // //     fontSize: 12,
// // // // // // //     color: '#888',
// // // // // // //   },
// // // // // // // });

// // // // // // // export default TaskListScreen;

// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// // // // // // const TaskListScreen = ({ navigation, route }) => {
// // // // // //   const [tasks, setTasks] = useState([]);
// // // // // //   const [filter, setFilter] = useState("All");

// // // // // //   useEffect(() => {
// // // // // //     const loadTasks = async () => {
// // // // // //       const fetchedTasks = await fetchTasks();
// // // // // //       setTasks(fetchedTasks);
// // // // // //     };
// // // // // //     loadTasks();
// // // // // //   }, [route.params?.refresh]);

// // // // // //   const handleDeleteTask = async (taskId) => {
// // // // // //     await deleteTask(taskId);
// // // // // //     setTasks(tasks.filter((task) => task.id !== taskId));
// // // // // //   };

// // // // // //   const handleToggleComplete = async (taskId) => {
// // // // // //     const task = tasks.find((task) => task.id === taskId);
// // // // // //     const updatedTask = { ...task, completed: !task.completed };
// // // // // //     await updateTask(taskId, updatedTask);
// // // // // //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// // // // // //   };

// // // // // //   const filteredTasks = tasks.filter((task) => {
// // // // // //     if (filter === "All") return true;
// // // // // //     return task.course === filter;
// // // // // //   });

// // // // // //   const renderHeader = () => (
// // // // // //     <View>
// // // // // //       <View style={styles.header}>
// // // // // //         <Text style={styles.headerText}>Task List</Text>
// // // // // //       </View>
// // // // // //       <View style={styles.filterContainer}>
// // // // // //         {["All", "Math", "Science", "History"].map((course) => (
// // // // // //           <TouchableOpacity
// // // // // //             key={course}
// // // // // //             style={[styles.filterButton, filter === course && styles.activeFilter]}
// // // // // //             onPress={() => setFilter(course)}
// // // // // //           >
// // // // // //             <Text style={styles.filterText}>{course}</Text>
// // // // // //           </TouchableOpacity>
// // // // // //         ))}
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );

// // // // // //   return (
// // // // // //     <FlatList
// // // // // //       data={filteredTasks}
// // // // // //       keyExtractor={(item) => item.id}
// // // // // //       renderItem={({ item }) => (
// // // // // //         <View style={styles.taskItem}>
// // // // // //           <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // // // // //             <Ionicons
// // // // // //               name={item.completed ? "checkbox-outline" : "square-outline"}
// // // // // //               size={24}
// // // // // //               color={item.completed ? "green" : "#ccc"}
// // // // // //             />
// // // // // //           </TouchableOpacity>
// // // // // //           <View style={styles.taskDetails}>
// // // // // //             <Text style={styles.taskName}>{item.name}</Text>
// // // // // //             <Text style={styles.taskCourse}>{item.course}</Text>
// // // // // //             <Text style={styles.taskDeadline}>
// // // // // //               Deadline: {new Date(item.deadline).toLocaleString()}
// // // // // //             </Text>
// // // // // //           </View>
// // // // // //           <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
// // // // // //             <Ionicons name="create-outline" size={24} color="#007AFF" />
// // // // // //           </TouchableOpacity>
// // // // // //           <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // // // // //             <Ionicons name="trash-outline" size={24} color="red" />
// // // // // //           </TouchableOpacity>
// // // // // //         </View>
// // // // // //       )}
// // // // // //       ListHeaderComponent={renderHeader}
// // // // // //       style={styles.list}
// // // // // //     />
// // // // // //   );
// // // // // // };

// // // // // // const styles = StyleSheet.create({
// // // // // //   list: {
// // // // // //     marginTop: 50,
// // // // // //     flex: 1,
// // // // // //     paddingHorizontal: 16,
// // // // // //   },
// // // // // //   header: {
// // // // // //     marginBottom: 24,
// // // // // //   },
// // // // // //   headerText: {
// // // // // //     fontSize: 24,
// // // // // //     fontWeight: "bold",
// // // // // //   },
// // // // // //   filterContainer: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     marginBottom: 16,
// // // // // //   },
// // // // // //   filterButton: {
// // // // // //     padding: 8,
// // // // // //     borderRadius: 8,
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: "#ccc",
// // // // // //   },
// // // // // //   activeFilter: {
// // // // // //     backgroundColor: "#007AFF",
// // // // // //     borderColor: "#007AFF",
// // // // // //   },
// // // // // //   filterText: {
// // // // // //     color: "#000",
// // // // // //   },
// // // // // //   taskItem: {
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //     padding: 16,
// // // // // //     borderBottomWidth: 1,
// // // // // //     borderBottomColor: "#ccc",
// // // // // //   },
// // // // // //   taskDetails: {
// // // // // //     flex: 1,
// // // // // //     marginLeft: 16,
// // // // // //   },
// // // // // //   taskName: {
// // // // // //     fontSize: 16,
// // // // // //     fontWeight: "bold",
// // // // // //   },
// // // // // //   taskCourse: {
// // // // // //     fontSize: 14,
// // // // // //     color: "#666",
// // // // // //   },
// // // // // //   taskDeadline: {
// // // // // //     fontSize: 12,
// // // // // //     color: "#888",
// // // // // //   },
// // // // // // });

// // // // // // export default TaskListScreen;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // import { fetchTasks, deleteTask, updateTask, addTask } from "../services/firebaseService";

// // // // // const TaskListScreen = ({ navigation, route }) => {
// // // // //   const [tasks, setTasks] = useState([]);
// // // // //   const [filter, setFilter] = useState("All");
// // // // //   const [newTaskName, setNewTaskName] = useState("");

// // // // //   useEffect(() => {
// // // // //     const loadTasks = async () => {
// // // // //       const fetchedTasks = await fetchTasks();
// // // // //       setTasks(fetchedTasks);
// // // // //     };
// // // // //     loadTasks();
// // // // //   }, [route.params?.refresh]);

// // // // //   const handleDeleteTask = async (taskId) => {
// // // // //     await deleteTask(taskId);
// // // // //     setTasks(tasks.filter((task) => task.id !== taskId));
// // // // //   };

// // // // //   const handleToggleComplete = async (taskId) => {
// // // // //     const task = tasks.find((task) => task.id === taskId);
// // // // //     const updatedTask = { ...task, completed: !task.completed };
// // // // //     await updateTask(taskId, updatedTask);
// // // // //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// // // // //   };

// // // // //   const handleAddTask = async () => {
// // // // //     if (newTaskName.trim()) {
// // // // //       const newTask = { name: newTaskName, completed: false };
// // // // //       await addTask(newTask);
// // // // //       setNewTaskName("");
// // // // //       const updatedTasks = await fetchTasks();
// // // // //       setTasks(updatedTasks);
// // // // //     }
// // // // //   };

// // // // //   const handleClearCompleted = async () => {
// // // // //     const completedTasks = tasks.filter((task) => task.completed);
// // // // //     for (const task of completedTasks) {
// // // // //       await deleteTask(task.id);
// // // // //     }
// // // // //     const updatedTasks = await fetchTasks();
// // // // //     setTasks(updatedTasks);
// // // // //   };

// // // // //   const filteredTasks = tasks.filter((task) => {
// // // // //     if (filter === "All") return true;
// // // // //     if (filter === "Active") return !task.completed;
// // // // //     if (filter === "Completed") return task.completed;
// // // // //     return true;
// // // // //   });

// // // // //   const tasksLeft = tasks.filter((task) => !task.completed).length;

// // // // //   const renderHeader = () => (
// // // // //     <View style={styles.headerContainer}>
// // // // //       <Text style={styles.headerText}>Task Manager</Text>
// // // // //       <Text style={styles.headerSubText}>Manage your tasks efficiently</Text>
// // // // //       <View style={styles.inputContainer}>
// // // // //         <TextInput
// // // // //           style={styles.input}
// // // // //           placeholder="Add a new task..."
// // // // //           value={newTaskName}
// // // // //           onChangeText={setNewTaskName}
// // // // //         />
// // // // //         <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
// // // // //           <Text style={styles.addButtonText}>+</Text>
// // // // //         </TouchableOpacity>
// // // // //       </View>
// // // // //       <View style={styles.filterContainer}>
// // // // //         {["All", "Active", "Completed"].map((filterName) => (
// // // // //           <TouchableOpacity
// // // // //             key={filterName}
// // // // //             style={[styles.filterButton, filter === filterName && styles.activeFilter]}
// // // // //             onPress={() => setFilter(filterName)}
// // // // //           >
// // // // //             <Text style={styles.filterText}>{filterName} ({tasks.filter((task) => {
// // // // //               if (filterName === "All") return true;
// // // // //               if (filterName === "Active") return !task.completed;
// // // // //               if (filterName === "Completed") return task.completed;
// // // // //               return true;
// // // // //             }).length})</Text>
// // // // //           </TouchableOpacity>
// // // // //         ))}
// // // // //       </View>
// // // // //     </View>
// // // // //   );

// // // // //   const renderItem = ({ item }) => (
// // // // //     <View style={styles.taskItem}>
// // // // //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // // // //         <Ionicons
// // // // //           name={item.completed ? "checkbox-outline" : "square-outline"}
// // // // //           size={24}
// // // // //           color={item.completed ? "green" : "#ccc"}
// // // // //         />
// // // // //       </TouchableOpacity>
// // // // //       <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>{item.name}</Text>
// // // // //       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // // // //         <Ionicons name="trash-outline" size={24} color="red" />
// // // // //       </TouchableOpacity>
// // // // //     </View>
// // // // //   );

// // // // //   const renderFooter = () => (
// // // // //     <View style={styles.footerContainer}>
// // // // //       <Text style={styles.tasksLeftText}>{tasksLeft} tasks left</Text>
// // // // //       <TouchableOpacity style={styles.clearCompletedButton} onPress={handleClearCompleted}>
// // // // //         <Text style={styles.clearCompletedText}>Clear completed</Text>
// // // // //       </TouchableOpacity>
// // // // //     </View>
// // // // //   );

// // // // //   return (
// // // // //     <FlatList
// // // // //       data={filteredTasks}
// // // // //       keyExtractor={(item) => item.id}
// // // // //       renderItem={renderItem}
// // // // //       ListHeaderComponent={renderHeader}
// // // // //       ListFooterComponent={renderFooter}
// // // // //       style={styles.list}
// // // // //     />
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   list: {
// // // // //     marginTop: 50,
// // // // //     flex: 1,
// // // // //     paddingHorizontal: 16,
// // // // //   },
// // // // //   headerContainer: {
// // // // //     marginBottom: 24,
// // // // //   },
// // // // //   headerText: {
// // // // //     fontSize: 24,
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // //   headerSubText: {
// // // // //     fontSize: 16,
// // // // //     color: "#666",
// // // // //     marginBottom: 16,
// // // // //   },
// // // // //   inputContainer: {
// // // // //     flexDirection: "row",
// // // // //     marginBottom: 16,
// // // // //   },
// // // // //   input: {
// // // // //     flex: 1,
// // // // //     borderWidth: 1,
// // // // //     borderColor: "#ccc",
// // // // //     borderRadius: 8,
// // // // //     padding: 8,
// // // // //     marginRight: 8,
// // // // //   },
// // // // //   addButton: {
// // // // //     backgroundColor: "#333",
// // // // //     borderRadius: 8,
// // // // //     padding: 8,
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   addButtonText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 16,
// // // // //   },
// // // // //   filterContainer: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     marginBottom: 16,
// // // // //   },
// // // // //   filterButton: {
// // // // //     padding: 8,
// // // // //     borderRadius: 8,
// // // // //     borderWidth: 1,
// // // // //     borderColor: "#ccc",
// // // // //   },
// // // // //   activeFilter: {
// // // // //     backgroundColor: "#007AFF",
// // // // //     borderColor: "#007AFF",
// // // // //   },
// // // // //   filterText: {
// // // // //     color: "#000",
// // // // //   },
// // // // //   taskItem: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     padding: 16,
// // // // //     borderBottomWidth: 1,
// // // // //     borderBottomColor: "#ccc",
// // // // //   },
// // // // //   taskName: {
// // // // //     flex: 1,
// // // // //     marginLeft: 16,
// // // // //     fontSize: 16,
// // // // //   },
// // // // //   completedTaskName: {
// // // // //     textDecorationLine: "line-through",
// // // // //     color: "#888",
// // // // //   },
// // // // //   footerContainer: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     padding: 16,
// // // // //   },
// // // // //   tasksLeftText: {
// // // // //     fontSize: 16,
// // // // //   },
// // // // //   clearCompletedButton: {
// // // // //     backgroundColor: "#eee",
// // // // //     borderRadius: 8,
// // // // //     padding: 8,
// // // // //   },
// // // // //   clearCompletedText: {
// // // // //     color: "#333",
// // // // //   },
// // // // // });

// // // // // export default TaskListScreen;

// // // // import React, { useEffect, useState } from "react";
// // // // import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// // // // import { Ionicons } from "@expo/vector-icons";
// // // // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// // // // const TaskListScreen = ({ navigation, route }) => {
// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [filter, setFilter] = useState("All");
// // // //   const [searchText, setSearchText] = useState("");

// // // //   useEffect(() => {
// // // //     const loadTasks = async () => {
// // // //       const fetchedTasks = await fetchTasks();
// // // //       setTasks(fetchedTasks);
// // // //     };
// // // //     loadTasks();
// // // //   }, [route.params?.refresh]);

// // // //   const handleDeleteTask = async (taskId) => {
// // // //     await deleteTask(taskId);
// // // //     setTasks(tasks.filter((task) => task.id !== taskId));
// // // //   };

// // // //   const handleToggleComplete = async (taskId) => {
// // // //     const task = tasks.find((task) => task.id === taskId);
// // // //     const updatedTask = { ...task, completed: !task.completed };
// // // //     await updateTask(taskId, updatedTask);
// // // //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// // // //   };

// // // //   const handleClearCompleted = async () => {
// // // //     const completedTasks = tasks.filter((task) => task.completed);
// // // //     for (const task of completedTasks) {
// // // //       await deleteTask(task.id);
// // // //     }
// // // //     const updatedTasks = await fetchTasks();
// // // //     setTasks(updatedTasks);
// // // //   };

// // // //   const filteredTasks = tasks.filter((task) => {
// // // //     if (filter === "All") {
// // // //       return task.name.toLowerCase().includes(searchText.toLowerCase());
// // // //     }
// // // //     if (filter === "Active") {
// // // //       return !task.completed && task.name.toLowerCase().includes(searchText.toLowerCase());
// // // //     }
// // // //     if (filter === "Completed") {
// // // //       return task.completed && task.name.toLowerCase().includes(searchText.toLowerCase());
// // // //     }
// // // //     return true;
// // // //   });

// // // //   const tasksLeft = tasks.filter((task) => !task.completed).length;

// // // //   const renderHeader = () => (
// // // //     <View style={styles.headerContainer}>
// // // //       <Text style={styles.headerText}>Task Manager</Text>
// // // //       <Text style={styles.headerSubText}>Manage your tasks efficiently</Text>
// // // //       <View style={styles.inputContainer}>
// // // //         <TextInput
// // // //           style={styles.input}
// // // //           placeholder="Search task..."
// // // //           value={searchText}
// // // //           onChangeText={setSearchText}
// // // //         />
// // // //       </View>
// // // //       <View style={styles.filterContainer}>
// // // //         {["All", "Active", "Completed"].map((filterName) => (
// // // //           <TouchableOpacity
// // // //             key={filterName}
// // // //             style={[styles.filterButton, filter === filterName && styles.activeFilter]}
// // // //             onPress={() => setFilter(filterName)}
// // // //           >
// // // //             <Text style={styles.filterText}>{filterName} ({tasks.filter((task) => {
// // // //               if (filterName === "All") return true;
// // // //               if (filterName === "Active") return !task.completed;
// // // //               if (filterName === "Completed") return task.completed;
// // // //               return true;
// // // //             }).length})</Text>
// // // //           </TouchableOpacity>
// // // //         ))}
// // // //       </View>
// // // //     </View>
// // // //   );

// // // //   const renderItem = ({ item }) => (
// // // //     <View style={styles.taskItem}>
// // // //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // // //         <Ionicons
// // // //           name={item.completed ? "checkbox-outline" : "square-outline"}
// // // //           size={24}
// // // //           color={item.completed ? "green" : "#ccc"}
// // // //         />
// // // //       </TouchableOpacity>
// // // //       <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>{item.name}</Text>
// // // //       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // // //         <Ionicons name="trash-outline" size={24} color="red" />
// // // //       </TouchableOpacity>
// // // //     </View>
// // // //   );

// // // //   const renderFooter = () => (
// // // //     <View style={styles.footerContainer}>
// // // //       <Text style={styles.tasksLeftText}>{tasksLeft} tasks left</Text>
// // // //       <TouchableOpacity style={styles.clearCompletedButton} onPress={handleClearCompleted}>
// // // //         <Text style={styles.clearCompletedText}>Clear completed</Text>
// // // //       </TouchableOpacity>
// // // //     </View>
// // // //   );

// // // //   return (
// // // //     <FlatList
// // // //       data={filteredTasks}
// // // //       keyExtractor={(item) => item.id}
// // // //       renderItem={renderItem}
// // // //       ListHeaderComponent={renderHeader}
// // // //       ListFooterComponent={renderFooter}
// // // //       style={styles.list}
// // // //     />
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   list: {
// // // //     marginTop: 50,
// // // //     flex: 1,
// // // //     paddingHorizontal: 16,
// // // //   },
// // // //   headerContainer: {
// // // //     marginBottom: 24,
// // // //   },
// // // //   headerText: {
// // // //     fontSize: 24,
// // // //     fontWeight: "bold",
// // // //   },
// // // //   headerSubText: {
// // // //     fontSize: 16,
// // // //     color: "#666",
// // // //     marginBottom: 16,
// // // //   },
// // // //   inputContainer: {
// // // //     flexDirection: "row",
// // // //     marginBottom: 16,
// // // //   },
// // // //   input: {
// // // //     flex: 1,
// // // //     borderWidth: 1,
// // // //     borderColor: "#ccc",
// // // //     borderRadius: 8,
// // // //     padding: 8,
// // // //     marginRight: 8,
// // // //   },
// // // //   filterContainer: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     marginBottom: 16,
// // // //   },
// // // //   filterButton: {
// // // //     padding: 8,
// // // //     borderRadius: 8,
// // // //     borderWidth: 1,
// // // //     borderColor: "#ccc",
// // // //   },
// // // //   activeFilter: {
// // // //     backgroundColor: "#007AFF",
// // // //     borderColor: "#007AFF",
// // // //   },
// // // //   filterText: {
// // // //     color: "#000",
// // // //   },
// // // //   taskItem: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     padding: 16,
// // // //     borderBottomWidth: 1,
// // // //     borderBottomColor: "#ccc",
// // // //   },
// // // //   taskName: {
// // // //     flex: 1,
// // // //     marginLeft: 16,
// // // //     fontSize: 16,
// // // //   },
// // // //   completedTaskName: {
// // // //     textDecorationLine: "line-through",
// // // //     color: "#888",
// // // //   },
// // // //   footerContainer: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     padding: 16,
// // // //   },
// // // //   tasksLeftText: {
// // // //     fontSize: 16,
// // // //   },
// // // //   clearCompletedButton: {
// // // //     backgroundColor: "#eee",
// // // //     borderRadius: 8,
// // // //     padding: 8,
// // // //   },
// // // //   clearCompletedText: {
// // // //     color: "#333",
// // // //   },
// // // // });

// // // // export default TaskListScreen;
// // // import React, { useEffect, useState, useRef } from "react";
// // // import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// // // const TaskListScreen = ({ navigation, route }) => {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [filter, setFilter] = useState("All");
// // //   const [searchText, setSearchText] = useState("");
// // //   const searchInputRef = useRef(null); // Create a ref

// // //   useEffect(() => {
// // //     const loadTasks = async () => {
// // //       const fetchedTasks = await fetchTasks();
// // //       setTasks(fetchedTasks);
// // //     };
// // //     loadTasks();
// // //   }, [route.params?.refresh]);

// // //   useEffect(() => {
// // //     // Refocus the input after each re-render
// // //     if (searchInputRef.current) {
// // //       searchInputRef.current.focus();
// // //     }
// // //   }, [searchText]); // Re-run effect when searchText changes

// // //   const handleDeleteTask = async (taskId) => {
// // //     await deleteTask(taskId);
// // //     setTasks(tasks.filter((task) => task.id !== taskId));
// // //   };

// // //   const handleToggleComplete = async (taskId) => {
// // //     const task = tasks.find((task) => task.id === taskId);
// // //     const updatedTask = { ...task, completed: !task.completed };
// // //     await updateTask(taskId, updatedTask);
// // //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// // //   };

// // //   const handleClearCompleted = async () => {
// // //     const completedTasks = tasks.filter((task) => task.completed);
// // //     for (const task of completedTasks) {
// // //       await deleteTask(task.id);
// // //     }
// // //     const updatedTasks = await fetchTasks();
// // //     setTasks(updatedTasks);
// // //   };

// // //   const filteredTasks = tasks.filter((task) => {
// // //     if (filter === "All") {
// // //       return task.name.toLowerCase().includes(searchText.toLowerCase());
// // //     }
// // //     if (filter === "Active") {
// // //       return !task.completed && task.name.toLowerCase().includes(searchText.toLowerCase());
// // //     }
// // //     if (filter === "Completed") {
// // //       return task.completed && task.name.toLowerCase().includes(searchText.toLowerCase());
// // //     }
// // //     return true;
// // //   });

// // //   const tasksLeft = tasks.filter((task) => !task.completed).length;

// // //   const renderHeader = () => (
// // //     <View style={styles.headerContainer}>
// // //       <Text style={styles.headerText}>Task Manager</Text>
// // //       <Text style={styles.headerSubText}>Manage your tasks efficiently</Text>
// // //       <View style={styles.inputContainer}>
// // //         <TextInput
// // //           ref={searchInputRef} // Assign the ref
// // //           style={styles.input}
// // //           placeholder="Search task..."
// // //           value={searchText}
// // //           onChangeText={setSearchText}
// // //         />
// // //       </View>
// // //       <View style={styles.filterContainer}>
// // //         {["All", "Active", "Completed"].map((filterName) => (
// // //           <TouchableOpacity
// // //             key={filterName}
// // //             style={[styles.filterButton, filter === filterName && styles.activeFilter]}
// // //             onPress={() => setFilter(filterName)}
// // //           >
// // //             <Text style={styles.filterText}>{filterName} ({tasks.filter((task) => {
// // //               if (filterName === "All") return true;
// // //               if (filterName === "Active") return !task.completed;
// // //               if (filterName === "Completed") return task.completed;
// // //               return true;
// // //             }).length})</Text>
// // //           </TouchableOpacity>
// // //         ))}
// // //       </View>
// // //     </View>
// // //   );

// // //   const renderItem = ({ item }) => (
// // //     <View style={styles.taskItem}>
// // //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // //         <Ionicons
// // //           name={item.completed ? "checkbox-outline" : "square-outline"}
// // //           size={24}
// // //           color={item.completed ? "green" : "#ccc"}
// // //         />
// // //       </TouchableOpacity>
// // //       <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>{item.name}</Text>
// // //       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// // //         <Ionicons name="trash-outline" size={24} color="red" />
// // //       </TouchableOpacity>
// // //     </View>
// // //   );

// // //   const renderFooter = () => (
// // //     <View style={styles.footerContainer}>
// // //       <Text style={styles.tasksLeftText}>{tasksLeft} tasks left</Text>
// // //       <TouchableOpacity style={styles.clearCompletedButton} onPress={handleClearCompleted}>
// // //         <Text style={styles.clearCompletedText}>Clear completed</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );

// // //   return (
// // //     <FlatList
// // //       data={filteredTasks}
// // //       keyExtractor={(item) => item.id}
// // //       renderItem={renderItem}
// // //       ListHeaderComponent={renderHeader}
// // //       ListFooterComponent={renderFooter}
// // //       style={styles.list}
// // //     />
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   list: {
// // //     marginTop: 50,
// // //     flex: 1,
// // //     paddingHorizontal: 16,
// // //   },
// // //   headerContainer: {
// // //     marginBottom: 24,
// // //   },
// // //   headerText: {
// // //     fontSize: 24,
// // //     fontWeight: "bold",
// // //   },
// // //   headerSubText: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //     marginBottom: 16,
// // //   },
// // //   inputContainer: {
// // //     flexDirection: "row",
// // //     marginBottom: 16,
// // //   },
// // //   input: {
// // //     flex: 1,
// // //     borderWidth: 1,
// // //     borderColor: "#ccc",
// // //     borderRadius: 8,
// // //     padding: 8,
// // //     marginRight: 8,
// // //   },
// // //   filterContainer: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     marginBottom: 16,
// // //   },
// // //   filterButton: {
// // //     padding: 8,
// // //     borderRadius: 8,
// // //     borderWidth: 1,
// // //     borderColor: "#ccc",
// // //   },
// // //   activeFilter: {
// // //     backgroundColor: "#007AFF",
// // //     borderColor: "#007AFF",
// // //   },
// // //   filterText: {
// // //     color: "#000",
// // //   },
// // //   taskItem: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     padding: 16,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "#ccc",
// // //   },
// // //   taskName: {
// // //     flex: 1,
// // //     marginLeft: 16,
// // //     fontSize: 16,
// // //   },
// // //   completedTaskName: {
// // //     textDecorationLine: "line-through",
// // //     color: "#888",
// // //   },
// // //   footerContainer: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     padding: 16,
// // //   },
// // //   tasksLeftText: {
// // //     fontSize: 16,
// // //   },
// // //   clearCompletedButton: {
// // //     backgroundColor: "#eee",
// // //     borderRadius: 8,
// // //     padding: 8,
// // //   },
// // //   clearCompletedText: {
// // //     color: "#333",
// // //   },
// // // });

// // // export default TaskListScreen;

// // import React, { useEffect, useState, useRef } from "react";
// // import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// // const TaskListScreen = ({ navigation, route }) => {
// //   const [tasks, setTasks] = useState([]);
// //   const [filter, setFilter] = useState("All");
// //   const [searchText, setSearchText] = useState("");
// //   const searchInputRef = useRef(null);

// //   useEffect(() => {
// //     const loadTasks = async () => {
// //       const fetchedTasks = await fetchTasks();
// //       setTasks(fetchedTasks);
// //     };
// //     loadTasks();
// //   }, [route.params?.refresh]);

// //   useEffect(() => {
// //     if (searchInputRef.current) {
// //       searchInputRef.current.focus();
// //     }
// //   }, [searchText]);

// //   const handleDeleteTask = async (taskId) => {
// //     await deleteTask(taskId);
// //     setTasks(tasks.filter((task) => task.id !== taskId));
// //   };

// //   const handleToggleComplete = async (taskId) => {
// //     const task = tasks.find((task) => task.id === taskId);
// //     const updatedTask = { ...task, completed: !task.completed };
// //     await updateTask(taskId, updatedTask);
// //     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
// //   };

// //   const handleClearCompleted = async () => {
// //     const completedTasks = tasks.filter((task) => task.completed);
// //     for (const task of completedTasks) {
// //       await deleteTask(task.id);
// //     }
// //     const updatedTasks = await fetchTasks();
// //     setTasks(updatedTasks);
// //   };

// //   const filteredTasks = tasks.filter((task) => {
// //     const searchMatch = task.name.toLowerCase().includes(searchText.toLowerCase());

// //     if (filter === "All") return searchMatch;
// //     if (filter === "Active") return !task.completed && searchMatch;
// //     if (filter === "Completed") return task.completed && searchMatch;
// //     if (tasks.map(task => task.course).filter((value, index, self) => self.indexOf(value) === index).includes(filter)) return task.course === filter && searchMatch;
// //     return true;
// //   });

// //   const tasksLeft = tasks.filter((task) => !task.completed).length;

// //   const renderHeader = () => (
// //     <View style={styles.headerContainer}>
// //       <Text style={styles.headerText}>Task Manager</Text>
// //       <Text style={styles.headerSubText}>Manage your tasks efficiently</Text>
// //       <View style={styles.inputContainer}>
// //         <TextInput
// //           ref={searchInputRef}
// //           style={styles.input}
// //           placeholder="Search task..."
// //           value={searchText}
// //           onChangeText={setSearchText}
// //         />
// //       </View>
// //       <View style={styles.filterContainer}>
// //         {["All", "Active", "Completed", ...tasks.map(task => task.course).filter((value, index, self) => self.indexOf(value) === index)].map((filterName) => (
// //           <TouchableOpacity
// //             key={filterName}
// //             style={[styles.filterButton, filter === filterName && styles.activeFilter]}
// //             onPress={() => setFilter(filterName)}
// //           >
// //             <Text style={styles.filterText}>{filterName} ({tasks.filter((task) => {
// //               const filterMatch = filterName === "All" ? true : filterName === "Active" ? !task.completed : filterName === "Completed" ? task.completed : task.course === filterName;
// //               return filterMatch;
// //             }).length})</Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>
// //     </View>
// //   );

// //   const renderItem = ({ item }) => (
// //     <View style={styles.taskItem}>
// //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// //         <Ionicons
// //           name={item.completed ? "checkbox-outline" : "square-outline"}
// //           size={24}
// //           color={item.completed ? "green" : "#ccc"}
// //         />
// //       </TouchableOpacity>
// //       <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>
// //         {item.name}
// //         {item.priority === "High" && <Text style={styles.priorityIndicator}> (High Priority)</Text>}
// //         {item.reminder && <Text style={styles.reminderIndicator}> (Reminder)</Text>}
// //       </Text>
// //       <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
// //         <Ionicons name="create-outline" size={24} color="#007AFF" />
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// //         <Ionicons name="trash-outline" size={24} color="red" />
// //       </TouchableOpacity>
// //     </View>
// //   );

// //   const renderFooter = () => (
// //     <View style={styles.footerContainer}>
// //       <Text style={styles.tasksLeftText}>{tasksLeft} tasks left</Text>
// //       <TouchableOpacity style={styles.clearCompletedButton} onPress={handleClearCompleted}>
// //         <Text style={styles.clearCompletedText}>Clear completed</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );

// //   return (
// //     <FlatList
// //       data={filteredTasks}
// //       keyExtractor={(item) => item.id}
// //       renderItem={renderItem}
// //       ListHeaderComponent={renderHeader}
// //       ListFooterComponent={renderFooter}
// //       style={styles.list}
// //     />
// //   );
// // };

// // const styles = StyleSheet.create({
// //   list: {
// //     marginTop: 50,
// //     flex: 1,
// //     paddingHorizontal: 16,
// //   },
// //   headerContainer: {
// //     marginBottom: 24,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //   },
// //   headerSubText: {
// //     fontSize: 16,
// //     color: "#666",
// //     marginBottom: 16,
// //   },
// //   inputContainer: {
// //     flexDirection: "row",
// //     marginBottom: 16,
// //   },
// //   input: {
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     borderRadius: 8,
// //     padding: 8,
// //     marginRight: 8,
// //   },
// //   filterContainer: {
// //     flexDirection: "row",
// //     flexWrap: 'wrap',
// //     justifyContent: "flex-start",
// //     marginBottom: 16,
// //   },
// //   filterButton: {
// //     padding: 8,
// //     borderRadius: 8,
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     marginRight: 8,
// //     marginTop: 4,
// //   },
// //   activeFilter: {
// //     backgroundColor: "#007AFF",
// //     borderColor: "#007AFF",
// //   },
// //   filterText: {
// //     color: "#000",
// //   },
// //   taskItem: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ccc",
// //   },
// //   taskName: {
// //     flex: 1,
// //     marginLeft: 16,
// //     fontSize: 16,
// //   },
// //   completedTaskName: {
// //     textDecorationLine: "line-through",
// //     color: "#888",
// //   },
// //   footerContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     padding: 16,
// //   },
// //   tasksLeftText: {
// //     fontSize: 16,
// //   },
// //   clearCompletedButton: {
// //     backgroundColor: "#eee",
// //     borderRadius: 8,
// //     padding: 8,
// //   },
// //   clearCompletedText: {
// //     color: "#333",
// //   },
// //   priorityIndicator: {
// //     color: "red",
// //     fontSize: 12,
// //   },
// //   reminderIndicator: {
// //     color: "blue",
// //     fontSize: 12,
// //   },
// // });

// // export default TaskListScreen;

// import React, { useEffect, useState, useRef } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

// const TaskListScreen = ({ navigation, route }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [searchText, setSearchText] = useState("");
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     const loadTasks = async () => {
//       const fetchedTasks = await fetchTasks();
//       setTasks(fetchedTasks);
//     };
//     loadTasks();
//   }, [route.params?.refresh]);

//   useEffect(() => {
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [searchText]);

//   const handleDeleteTask = async (taskId) => {
//     await deleteTask(taskId);
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   const handleToggleComplete = async (taskId) => {
//     const task = tasks.find((task) => task.id === taskId);
//     const updatedTask = { ...task, completed: !task.completed };
//     await updateTask(taskId, updatedTask);
//     setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
//   };

//   const handleClearCompleted = async () => {
//     const completedTasks = tasks.filter((task) => task.completed);
//     for (const task of completedTasks) {
//       await deleteTask(task.id);
//     }
//     const updatedTasks = await fetchTasks();
//     setTasks(updatedTasks);
//   };

//   const filteredTasks = tasks.filter((task) => {
//     const searchMatch = task.name.toLowerCase().includes(searchText.toLowerCase());

//     if (filter === "All") return searchMatch;
//     if (filter === "Active") return !task.completed && searchMatch;
//     if (filter === "Completed") return task.completed && searchMatch;
//     if (tasks.map(task => task.course).filter((value, index, self) => self.indexOf(value) === index).includes(filter)) return task.course === filter && searchMatch;
//     return true;
//   });

//   const tasksLeft = tasks.filter((task) => !task.completed).length;

//   const renderHeader = () => (
//     <View style={styles.headerContainer}>
//       <Text style={styles.headerText}>Task Manager</Text>
//       <Text style={styles.headerSubText}>Manage your tasks efficiently</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           ref={searchInputRef}
//           style={styles.input}
//           placeholder="Search task..."
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//       </View>
//       <View style={styles.filterContainer}>
//         {["All", "Active", "Completed", ...tasks.map(task => task.course).filter((value, index, self) => self.indexOf(value) === index)].map((filterName, index) => (
//           <TouchableOpacity
//             key={`${filterName}-${index}`} // Unique key using filterName and index
//             style={[styles.filterButton, filter === filterName && styles.activeFilter]}
//             onPress={() => setFilter(filterName)}
//           >
//             <Text style={styles.filterText}>
//               {filterName} (
//               {
//                 tasks.filter((task) => {
//                   const filterMatch =
//                     filterName === "All"
//                       ? true
//                       : filterName === "Active"
//                       ? !task.completed
//                       : filterName === "Completed"
//                       ? task.completed
//                       : task.course === filterName;
//                   return filterMatch;
//                 }).length
//               }
//               )
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );

//   const renderItem = ({ item }) => (
//     <View style={styles.taskItem}>
//       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
//         <Ionicons
//           name={item.completed ? "checkbox-outline" : "square-outline"}
//           size={24}
//           color={item.completed ? "green" : "#ccc"}
//         />
//       </TouchableOpacity>
//       <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>
//         {item.name}
//         {item.priority === "High" && <Text style={styles.priorityIndicator}> (High Priority)</Text>}
//         {item.reminder && <Text style={styles.reminderIndicator}> (Reminder)</Text>}
//       </Text>
//       <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
//         <Ionicons name="create-outline" size={24} color="#007AFF" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
//         <Ionicons name="trash-outline" size={24} color="red" />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderFooter = () => (
//     <View style={styles.footerContainer}>
//       <Text style={styles.tasksLeftText}>{tasksLeft} tasks left</Text>
//       <TouchableOpacity style={styles.clearCompletedButton} onPress={handleClearCompleted}>
//         <Text style={styles.clearCompletedText}>Clear completed</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <FlatList
//       data={filteredTasks}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       ListHeaderComponent={renderHeader}
//       ListFooterComponent={renderFooter}
//       style={styles.list}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     marginTop: 60,
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   headerContainer: {
//     marginBottom: 24,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   headerSubText: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 8,
//     marginRight: 8,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     flexWrap: 'wrap',
//     justifyContent: "flex-start",
//     marginBottom: 5,
//   },
//   filterButton: {
//     padding: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginRight: 8,
//     marginTop: 4,
//   },
//   activeFilter: {
//     backgroundColor: "#007AFF",
//     borderColor: "#007AFF",
//   },
//   filterText: {
//     color: "#000",
//   },
//   taskItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   taskName: {
//     flex: 1,
//     marginLeft: 16,
//     fontSize: 16,
//   },
//   completedTaskName: {
//     textDecorationLine: "line-through",
//     color: "#888",
//   },
//   footerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//   },
//   tasksLeftText: {
//     fontSize: 16,
//   },
//   clearCompletedButton: {
//     backgroundColor: "#eee",
//     borderRadius: 8,
//     padding: 8,
//   },
//   clearCompletedText: {
//     color: "#333",
//   },
//   priorityIndicator: {
//     color: "red",
//     fontSize: 12,
//   },
//   reminderIndicator: {
//     color: "blue",
//     fontSize: 12,
//   },
// });

// export default TaskListScreen;




import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";

const TaskListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, [route.params?.refresh]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchText]);

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

  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.name.toLowerCase().includes(searchText.toLowerCase());

    if (filter === "All") return searchMatch;
    if (filter === "Active") return !task.completed && searchMatch;
    if (filter === "Completed") return task.completed && searchMatch;
    if (tasks.map(task => task.course).filter((value, index, self) => self.indexOf(value) === index).includes(filter)) return task.course === filter && searchMatch;
    return true;
  });

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>My Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.input}
          placeholder="Search task..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.filterContainer}>
        {["All", "Active", "Completed", ...tasks.map(task => task.course).filter((value, index, self) => self.indexOf(value) === index)].map((filterName, index) => (
          <TouchableOpacity
            key={`${filterName}-${index}`} // Unique key using filterName and index
            style={[styles.filterButton, filter === filterName && styles.activeFilter]}
            onPress={() => setFilter(filterName)}
          >
            <Text style={styles.filterText}>
              {filterName} (
              {
                tasks.filter((task) => {
                  const filterMatch =
                    filterName === "All"
                      ? true
                      : filterName === "Active"
                      ? !task.completed
                      : filterName === "Completed"
                      ? task.completed
                      : task.course === filterName;
                  return filterMatch;
                }).length
              }
              )
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
        <Ionicons
          name={item.completed ? "checkbox-outline" : "square-outline"}
          size={24}
          color={item.completed ? "green" : "#ccc"}
        />
      </TouchableOpacity>
      <View style={styles.taskDetails}>
        <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>
          {item.name}
        </Text>
        <Text style={styles.taskDescription}>
          {item.description ? (item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description) : "No description"}
        </Text>
        <Text style={styles.taskInfo}>
          Type: {item.type} | Priority: {item.priority} | Deadline: {new Date(item.deadline).toLocaleDateString()}
        </Text>
        {item.reminder && (
          <Text style={styles.reminderIndicator}>
            Reminder: {new Date(item.reminder).toLocaleTimeString()}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
        <Ionicons name="create-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
  
  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.tasksLeftText}>{tasksLeft} tasks left</Text>
      <TouchableOpacity style={styles.clearCompletedButton} onPress={handleClearCompleted}>
        <Text style={styles.clearCompletedText}>Clear completed</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 60,
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
 
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "flex-start",
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    marginTop: 4,
  },
  activeFilter: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterText: {
    color: "#000",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completedTaskName: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  taskInfo: {
    fontSize: 12,
    color: "#888",
  },
  reminderIndicator: {
    fontSize: 12,
    color: "blue",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  tasksLeftText: {
    fontSize: 16,
  },
  clearCompletedButton: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 8,
  },
  clearCompletedText: {
    color: "#333",
  },
});

export default TaskListScreen;