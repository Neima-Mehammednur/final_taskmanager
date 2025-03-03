
// // // import React, { useEffect, useState, useRef } from "react";
// // // import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput} from "react-native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";
// // // import { useFocusEffect } from '@react-navigation/native';

// // // const TaskListScreen = ({ navigation, route }) => {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [filter, setFilter] = useState("All");
// // //   const [searchText, setSearchText] = useState("");
// // //   const searchInputRef = useRef(null);

// // //   useFocusEffect(
// // //     React.useCallback(() => {
// // //       const loadTasks = async () => {
// // //         const fetchedTasks = await fetchTasks();
// // //         setTasks(fetchedTasks);
// // //       };
// // //       loadTasks();
// // //     }, [route.params?.refresh])
// // //   );

// // //   useEffect(() => {
// // //     if (searchInputRef.current) {
// // //       searchInputRef.current.focus();
// // //     }
// // //   }, [searchText]);

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
// // //     const searchMatch = task.name.toLowerCase().includes(searchText.toLowerCase());

// // //     if (filter === "All") return searchMatch;
// // //     if (filter === "Active") return !task.completed && searchMatch;
// // //     if (filter === "Completed") return task.completed && searchMatch;

// // //     // Normalize the course name for comparison
// // //     const normalizedCourse = task.course?.trim().toLowerCase();
// // //     const normalizedFilter = filter.trim().toLowerCase();

// // //     return normalizedCourse === normalizedFilter && searchMatch;
// // //   });

// // //   const tasksLeft = tasks.filter((task) => !task.completed).length;

// // //   const capitalizeFirstLetter = (str) => {
// // //     if (!str) return str; // Handle empty or undefined strings
// // //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// // //   };

// // //   const renderHeader = () => {
// // //   // Get unique course names (normalized) and map them back to their original values
// // //   const uniqueCourses = [
// // //     ...new Set(
// // //       tasks
// // //         .map((task) => task.course?.trim().toLowerCase()) // Normalize course names
// // //         .filter((course) => course) // Remove empty or undefined values
// // //     ),
// // //   ].map((normalizedCourse) => {
// // //     // Find the first task with this normalized course name and return its original course name
// // //     const task = tasks.find((task) => task.course?.trim().toLowerCase() === normalizedCourse);
// // //     return task.course;
// // //   });

// // //   return (
// // //     <View style={styles.headerContainer}>
// // //       <Text style={styles.headerText}>My Tasks</Text>
// // //       <View style={styles.inputContainer}>
// // //         <TextInput
// // //           ref={searchInputRef}
// // //           style={styles.input}
// // //           placeholder="Search task..."
// // //           value={searchText}
// // //           onChangeText={setSearchText}
// // //         />
// // //       </View>
// // //       <View style={styles.filterContainer}>
// // //         {["All", "Active", "Completed", ...uniqueCourses].map((filterName, index) => (
// // //           <TouchableOpacity
// // //             key={`${filterName}-${index}`}
// // //             style={[styles.filterButton, filter === filterName && styles.activeFilter]}
// // //             onPress={() => setFilter(filterName)}
// // //           >
// // //             <Text style={styles.filterText}>
// // //               {capitalizeFirstLetter(filterName)} (
// // //               {
// // //                 tasks.filter((task) => {
// // //                   const filterMatch =
// // //                     filterName === "All"
// // //                       ? true
// // //                       : filterName === "Active"
// // //                       ? !task.completed
// // //                       : filterName === "Completed"
// // //                       ? task.completed
// // //                       : task.course?.trim().toLowerCase() === filterName.trim().toLowerCase();
// // //                   return filterMatch;
// // //                 }).length
// // //               }
// // //               )
// // //             </Text>
// // //           </TouchableOpacity>
// // //         ))}
// // //       </View>
// // //     </View>
// // //   );
// // // };


// // //   const renderItem = ({ item }) => (
// // //     <View style={styles.taskItem}>
// // //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// // //         <Ionicons
// // //           name={item.completed ? "checkbox-outline" : "square-outline"}
// // //           size={24}
// // //           color={item.completed ? "green" : "#ccc"}
// // //         />
// // //       </TouchableOpacity>
// // //       <View style={styles.taskDetails}>
// // //         <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>
// // //           {item.name}
// // //         </Text>
// // //         <Text style={styles.taskDescription}>
// // //           {item.description ? (item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description) : "No description"}
// // //         </Text>
// // //         <Text style={styles.taskInfo}>
// // //          Priority: {item.priority} | Deadline: {new Date(item.deadline).toLocaleDateString()}
// // //         </Text>
// // //         {item.reminder && (
// // //           <Text style={styles.reminderIndicator}>
// // //             Reminder: {new Date(item.reminder).toLocaleTimeString()}
// // //           </Text>
// // //         )}
// // //       </View>
// // //       <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
// // //         <Ionicons name="create-outline" size={24} color="#4CAF50" />
// // //       </TouchableOpacity>
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
// // //     marginTop: 60,
// // //     flex: 1,
// // //     paddingHorizontal: 16,
// // //     paddingBottom: 70,
// // //   },
// // //   headerContainer: {
// // //     marginBottom: 24,
// // //   },
// // //   headerText: {
// // //     fontSize: 24,
// // //     fontWeight: "bold",
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
// // //     flexWrap: 'wrap',
// // //     justifyContent: "flex-start",
// // //   },
// // //   filterButton: {
// // //     padding: 8,
// // //     borderRadius: 8,
// // //     borderWidth: 1,
// // //     borderColor: "#ccc",
// // //     marginRight: 8,
// // //     marginTop: 4,
// // //   },
// // //   activeFilter: {
// // //     backgroundColor: "#4CAF50",
// // //     borderColor: "#4CAF50",
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
// // //   taskDetails: {
// // //     flex: 1,
// // //     marginLeft: 16,
// // //   },
// // //   taskName: {
// // //     fontSize: 16,
// // //     fontWeight: "bold",
// // //   },
// // //   completedTaskName: {
// // //     textDecorationLine: "line-through",
// // //     color: "#888",
// // //   },
// // //   taskDescription: {
// // //     fontSize: 14,
// // //     color: "#666",
// // //   },
// // //   taskInfo: {
// // //     fontSize: 12,
// // //     color: "#888",
// // //   },
// // //   reminderIndicator: {
// // //     fontSize: 12,
// // //     color: "blue",
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
// // import { useFocusEffect } from '@react-navigation/native';

// // const TaskListScreen = ({ navigation, route }) => {
// //   const [tasks, setTasks] = useState([]);
// //   const [filter, setFilter] = useState("All");
// //   const [searchText, setSearchText] = useState("");
// //   const searchInputRef = useRef(null);

// //   useFocusEffect(
// //     React.useCallback(() => {
// //       const loadTasks = async () => {
// //         const fetchedTasks = await fetchTasks();
// //         setTasks(fetchedTasks);
// //       };
// //       loadTasks();
// //     }, [route.params?.refresh])
// //   );

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

// //     // Normalize the course name for comparison
// //     const normalizedCourse = task.course?.trim().toLowerCase();
// //     const normalizedFilter = filter.trim().toLowerCase();

// //     return normalizedCourse === normalizedFilter && searchMatch;
// //   });

// //   const tasksLeft = tasks.filter((task) => !task.completed).length;

// //   const capitalizeFirstLetter = (str) => {
// //     if (!str) return str; // Handle empty or undefined strings
// //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// //   };

// //   const renderHeader = () => {
// //     // Get unique course names (normalized) and map them back to their original values
// //     const uniqueCourses = [
// //       ...new Set(
// //         tasks
// //           .map((task) => task.course?.trim().toLowerCase()) // Normalize course names
// //           .filter((course) => course) // Remove empty or undefined values
// //       ),
// //     ].map((normalizedCourse) => {
// //       // Find the first task with this normalized course name and return its original course name
// //       const task = tasks.find((task) => task.course?.trim().toLowerCase() === normalizedCourse);
// //       return task.course;
// //     });

// //     return (
// //       <View style={styles.headerContainer}>
// //         <Text style={styles.headerText}>My Tasks</Text>
// //         <View style={styles.inputContainer}>
// //           <TextInput
// //             ref={searchInputRef}
// //             style={styles.input}
// //             placeholder="Search task..."
// //             value={searchText}
// //             onChangeText={setSearchText}
// //             placeholderTextColor="#999"
// //           />
// //         </View>
// //         <View style={styles.filterContainer}>
// //           {["All", "Active", "Completed", ...uniqueCourses].map((filterName, index) => (
// //             <TouchableOpacity
// //               key={`${filterName}-${index}`}
// //               style={[styles.filterButton, filter === filterName && styles.activeFilter]}
// //               onPress={() => setFilter(filterName)}
// //             >
// //               <Text style={[styles.filterText, filter === filterName && styles.activeFilterText]}>
// //                 {capitalizeFirstLetter(filterName)} (
// //                 {
// //                   tasks.filter((task) => {
// //                     const filterMatch =
// //                       filterName === "All"
// //                         ? true
// //                         : filterName === "Active"
// //                         ? !task.completed
// //                         : filterName === "Completed"
// //                         ? task.completed
// //                         : task.course?.trim().toLowerCase() === filterName.trim().toLowerCase();
// //                     return filterMatch;
// //                   }).length
// //                 }
// //                 )
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       </View>
// //     );
// //   };

// //   const renderItem = ({ item }) => (
// //     <View style={styles.taskCard}>
// //       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
// //         <Ionicons
// //           name={item.completed ? "checkbox-outline" : "square-outline"}
// //           size={24}
// //           color={item.completed ? "#4CAF50" : "#ccc"}
// //         />
// //       </TouchableOpacity>
// //       <View style={styles.taskDetails}>
// //         <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>
// //           {item.name}
// //         </Text>
// //         <Text style={styles.taskDescription}>
// //           {item.description ? (item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description) : "No description"}
// //         </Text>
// //         <Text style={styles.taskInfo}>
// //           Priority: {item.priority} | Deadline: {new Date(item.deadline).toLocaleDateString()}
// //         </Text>
// //         {item.reminder && (
// //           <Text style={styles.reminderIndicator}>
// //             Reminder: {new Date(item.reminder).toLocaleTimeString()}
// //           </Text>
// //         )}
// //       </View>
// //       <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
// //         <Ionicons name="create-outline" size={24} color="#4CAF50" />
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
// //         <Ionicons name="trash-outline" size={24} color="#FF5252" />
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

// //     flex: 1,
// //     paddingHorizontal: 16,
// //     paddingBottom: 70,
// //     backgroundColor: "#F5F5F5",
// //   },
// //   headerContainer: {

// //     marginBottom: 24,
// //   },
// //   headerText: {

// //     fontSize: 24,
// //     fontWeight: "bold",
// //     marginBottom: 16,
// //     color: "#333",
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
// //     padding: 12,
// //     fontSize: 16,
// //     color: "#333",
// //     backgroundColor: "#FFF",
// //   },
// //   filterContainer: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "flex-start",
// //   },
// //   filterButton: {
// //     padding: 8,
// //     borderRadius: 8,
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     marginRight: 8,
// //     marginTop: 4,
// //     backgroundColor: "#FFF",
// //   },
// //   activeFilter: {
// //     backgroundColor: "#4CAF50",
// //     borderColor: "#4CAF50",
// //   },
// //   filterText: {
// //     color: "#333",
// //   },
// //   activeFilterText: {
// //     color: "#FFF",
// //   },
// //   taskCard: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 16,
// //     backgroundColor: "#FFF",
// //     borderRadius: 12,
// //     marginBottom: 8,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   taskDetails: {
// //     flex: 1,
// //     marginLeft: 16,
// //   },
// //   taskName: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     color: "#333",
// //   },
// //   completedTaskName: {
// //     textDecorationLine: "line-through",
// //     color: "#888",
// //   },
// //   taskDescription: {
// //     fontSize: 14,
// //     color: "#666",
// //     marginTop: 4,
// //   },
// //   taskInfo: {
// //     fontSize: 12,
// //     color: "#888",
// //     marginTop: 4,
// //   },
// //   reminderIndicator: {
// //     fontSize: 12,
// //     color: "#2196F3",
// //     marginTop: 4,
// //   },
// //   footerContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     padding: 16,
// //   },
// //   tasksLeftText: {
// //     fontSize: 16,
// //     color: "#333",
// //   },
// //   clearCompletedButton: {
// //     backgroundColor: "#FF5252",
// //     borderRadius: 8,
// //     padding: 8,
// //   },
// //   clearCompletedText: {
// //     color: "#FFF",
// //     fontSize: 14,
// //     fontWeight: "bold",
// //   },
// // });

// // export default TaskListScreen;
// import React, { useEffect, useState, useRef } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";
// import { useFocusEffect } from '@react-navigation/native';

// const TaskListScreen = ({ navigation, route }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [searchText, setSearchText] = useState("");
//   const searchInputRef = useRef(null);

//   useFocusEffect(
//     React.useCallback(() => {
//       const loadTasks = async () => {
//         const fetchedTasks = await fetchTasks();
//         setTasks(fetchedTasks);
//       };
//       loadTasks();
//     }, [route.params?.refresh])
//   );

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

//     // Normalize the course name for comparison
//     const normalizedCourse = task.course?.trim().toLowerCase();
//     const normalizedFilter = filter.trim().toLowerCase();

//     return normalizedCourse === normalizedFilter && searchMatch;
//   });

//   const tasksLeft = tasks.filter((task) => !task.completed).length;

//   const capitalizeFirstLetter = (str) => {
//     if (!str) return str; // Handle empty or undefined strings
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };

//   const renderHeader = () => {
//     // Get unique course names (normalized) and map them back to their original values
//     const uniqueCourses = [
//       ...new Set(
//         tasks
//           .map((task) => task.course?.trim().toLowerCase()) // Normalize course names
//           .filter((course) => course) // Remove empty or undefined values
//       ),
//     ].map((normalizedCourse) => {
//       // Find the first task with this normalized course name and return its original course name
//       const task = tasks.find((task) => task.course?.trim().toLowerCase() === normalizedCourse);
//       return task.course;
//     });

//     return (
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>My Tasks</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             ref={searchInputRef}
//             style={styles.input}
//             placeholder="Search task..."
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor="#999"
//           />
//         </View>
//         <View style={styles.filterContainer}>
//           {["All", "Active", "Completed", ...uniqueCourses].map((filterName, index) => (
//             <TouchableOpacity
//               key={`${filterName}-${index}`}
//               style={[styles.filterButton, filter === filterName && styles.activeFilter]}
//               onPress={() => setFilter(filterName)}
//             >
//               <Text style={[styles.filterText, filter === filterName && styles.activeFilterText]}>
//                 {capitalizeFirstLetter(filterName)} (
//                 {
//                   tasks.filter((task) => {
//                     const filterMatch =
//                       filterName === "All"
//                         ? true
//                         : filterName === "Active"
//                         ? !task.completed
//                         : filterName === "Completed"
//                         ? task.completed
//                         : task.course?.trim().toLowerCase() === filterName.trim().toLowerCase();
//                     return filterMatch;
//                   }).length
//                 }
//                 )
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={[styles.taskCard, item.priority === "High" && styles.highPriorityTask]}>
//       <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
//         <Ionicons
//           name={item.completed ? "checkbox-outline" : "square-outline"}
//           size={24}
//           color={item.completed ? "#4CAF50" : "#ccc"}
//         />
//       </TouchableOpacity>
//       <View style={styles.taskDetails}>
//         <Text style={[styles.taskName, item.completed && styles.completedTaskName]}>
//           {item.name}
//         </Text>
//         <Text style={styles.taskDescription}>
//           {item.description ? (item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description) : "No description"}
//         </Text>
//         <Text style={styles.taskInfo}>
//           Priority: {item.priority} | Deadline: {new Date(item.deadline).toLocaleDateString()}
//         </Text>
//         {item.reminder && (
//           <Text style={styles.reminderIndicator}>
//             Reminder: {new Date(item.reminder).toLocaleTimeString()}
//           </Text>
//         )}
//       </View>
//       <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
//         <Ionicons name="create-outline" size={24} color="#4CAF50" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
//         <Ionicons name="trash-outline" size={24} color="#FF5252" />
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
//       contentContainerStyle={styles.flatListContent}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   flatListContent: {
//     paddingTop: 50, // Add padding to ensure the header is visible
//   },
//   headerContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 16, // Ensure the header is not cut off
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     color: "#333",
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
//     padding: 12,
//     fontSize: 16,
//     color: "#333",
//     backgroundColor: "#FFF",
//   },
//   filterContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "flex-start",
//   },
//   filterButton: {
//     padding: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginRight: 8,
//     marginTop: 4,
//     backgroundColor: "#FFF",
//   },
//   activeFilter: {
//     backgroundColor: "#4CAF50",
//     borderColor: "#4CAF50",
//   },
//   filterText: {
//     color: "#333",
//   },
//   activeFilterText: {
//     color: "#FFF",
//   },
//   taskCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#FFF",
//     borderRadius: 12,
//     marginBottom: 8,
//     marginHorizontal: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   highPriorityTask: {
//     borderLeftWidth: 4,
//     borderLeftColor: "#FF5252", // Red border for high-priority tasks
//   },
//   taskDetails: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   taskName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   completedTaskName: {
//     textDecorationLine: "line-through",
//     color: "#888",
//   },
//   taskDescription: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
//   taskInfo: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 4,
//   },
//   reminderIndicator: {
//     fontSize: 12,
//     color: "#2196F3",
//     marginTop: 4,
//   },
//   footerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//   },
//   tasksLeftText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   clearCompletedButton: {
//     backgroundColor: "#FF5252",
//     borderRadius: 8,
//     padding: 8,
//   },
//   clearCompletedText: {
//     color: "#FFF",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });

// export default TaskListScreen;

import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";
import { useFocusEffect } from '@react-navigation/native';


const TaskListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);
  
  useFocusEffect(
    React.useCallback(() => {
      const loadTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      };
      loadTasks();
    }, [route.params?.refresh])
  );

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

    // Normalize the course name for comparison
    const normalizedCourse = task.course?.trim().toLowerCase();
    const normalizedFilter = filter.trim().toLowerCase();

    return normalizedCourse === normalizedFilter && searchMatch;
  });

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Handle empty or undefined strings
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const renderHeader = () => {
    // Get unique course names (normalized) and map them back to their original values
    const uniqueCourses = [
      ...new Set(
        tasks
          .map((task) => task.course?.trim().toLowerCase()) // Normalize course names
          .filter((course) => course) // Remove empty or undefined values
      ),
    ].map((normalizedCourse) => {
      // Find the first task with this normalized course name and return its original course name
      const task = tasks.find((task) => task.course?.trim().toLowerCase() === normalizedCourse);
      return task.course;
    });

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Tasks</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={searchInputRef}
            style={styles.input}
            placeholder="Search task..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.filterContainer}>
          {["All", "Active", "Completed", ...uniqueCourses].map((filterName, index) => (
            <TouchableOpacity
              key={`${filterName}-${index}`}
              style={[styles.filterButton, filter === filterName && styles.activeFilter]}
              onPress={() => setFilter(filterName)}
            >
              <Text style={[styles.filterText, filter === filterName && styles.activeFilterText]}>
                {capitalizeFirstLetter(filterName)} (
                {
                  tasks.filter((task) => {
                    const filterMatch =
                      filterName === "All"
                        ? true
                        : filterName === "Active"
                          ? !task.completed
                          : filterName === "Completed"
                            ? task.completed
                            : task.course?.trim().toLowerCase() === filterName.trim().toLowerCase();
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
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.taskCard} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
    <View style={styles.taskCard}>
      <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
        <Ionicons
          name={item.completed ? "checkbox-outline" : "square-outline"}
          size={24}
          color={item.completed ? "#4CAF50" : "#ccc"}
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
          Priority: <Text style={item.priority === "High" && styles.highPriorityText}>{item.priority}</Text> | Deadline: {new Date(item.deadline).toLocaleDateString()}
        </Text>
        {item.reminder && (
          <Text style={styles.reminderIndicator}>
            Reminder: {new Date(item.reminder).toLocaleTimeString()}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
        <Ionicons name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
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
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  flatListContent: {
    paddingTop: 50,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16, 
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
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
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FFF",
  },
  filterContainer: {
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    marginTop: 4,
    backgroundColor: "#FFF",
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  filterText: {
    color: "#333",
  },
  activeFilterText: {
    color: "#FFF",
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  completedTaskName: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  taskInfo: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  highPriorityText: {
    color: "#FF5252", 
    fontWeight: "bold",
  },
  reminderIndicator: {
    fontSize: 12,
    color: "#2196F3",
    marginTop: 4,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  tasksLeftText: {
    fontSize: 16,
    color: "#333",
  },
  clearCompletedButton: {
    backgroundColor: "#FF5252",
    borderRadius: 8,
    padding: 8,
  },
  clearCompletedText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TaskListScreen;