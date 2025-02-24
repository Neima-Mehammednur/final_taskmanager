// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useIsFocused } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const TaskListScreen = ({ navigation }) => {
//     const [tasks, setTasks] = useState([]);
//     const isFocused = useIsFocused();

//     useEffect(() => {
//         if (isFocused) {
//             fetchTasks();
//         }
//     }, [isFocused]);

//     const fetchTasks = async () => {
//         try {
//             const storedTasks = await AsyncStorage.getItem('tasks');
//             if (storedTasks) {
//                 setTasks(JSON.parse(storedTasks));
//             }
//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//         }
//     };

//     const handleDeleteTask = async (taskId) => {
//         try {
//             const updatedTasks = tasks.filter((task) => task.id !== taskId);
//             await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//             setTasks(updatedTasks);
//         } catch (error) {
//             console.error('Error deleting task:', error);
//         }
//     };

//     const handleToggleComplete = async (taskId) => {
//         try {
//             const updatedTasks = tasks.map((task) =>
//                 task.id === taskId ? { ...task, completed: !task.completed } : task
//             );
//             await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//             setTasks(updatedTasks);
//         } catch (error) {
//             console.error('Error toggling task completion:', error);
//         }
//     };

//     const renderTaskItem = ({ item }) => (
//         <View style={styles.taskItem}>
//             <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
//                 <Ionicons
//                     name={item.completed ? 'checkbox-outline' : 'square-outline'}
//                     size={24}
//                     color={item.completed ? 'green' : '#ccc'}
//                 />
//             </TouchableOpacity>
//             <View style={styles.taskDetails}>
//                 <Text style={[styles.taskName, item.completed && styles.completedTask]}>
//                     {item.name}
//                 </Text>
//                 <Text style={styles.taskDescription}>{item.description}</Text>
//                 <Text style={styles.taskDeadline}>
//                     Deadline: {new Date(item.deadline).toLocaleDateString()}
//                 </Text>
//             </View>
//             <TouchableOpacity onPress={() => navigation.navigate('TaskCreation', { task: item })}>
//                 <Ionicons name="create-outline" size={24} color="#007AFF" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
//                 <Ionicons name="trash-outline" size={24} color="red" />
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <View style={styles.container}>

//             <View style={styles.header}>
//                 <Text style={styles.headerText}>My Tasks</Text>
//             </View>
//             <FlatList
//                 data={tasks}
//                 renderItem={renderTaskItem}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.listContainer}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 50,
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'stretch',
//         padding: 16,
//         height: "100%",
//     },
//     header: {
//         marginBottom: 24,
//     },
//     headerText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     listContainer: {
//         paddingBottom: 16,
//     },
//     taskItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     taskDetails: {
//         flex: 1,
//         marginLeft: 16,
//     },
//     taskName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     taskDescription: {
//         fontSize: 14,
//         color: '#666',
//     },
//     taskDeadline: {
//         fontSize: 12,
//         color: '#888',
//     },
//     completedTask: {
//         textDecorationLine: 'line-through',
//         color: '#888',
//     },
// });

// export default TaskListScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused]);

  const fetchTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    return task.category === filter;
  });

  const renderTaskItem = ({ item }) => (
    <View
      style={[
        styles.taskItem,
        item.priority === 'High' && styles.highPriorityTask,
      ]}
    >
      <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
        <Ionicons
          name={item.completed ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={item.completed ? 'green' : '#ccc'}
        />
      </TouchableOpacity>
      <View style={styles.taskDetails}>
        <Text style={[styles.taskName, item.completed && styles.completedTask]}>
          {item.name}
        </Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskDeadline}>
          Deadline: {new Date(item.deadline).toLocaleDateString()}
        </Text>
        {item.priority === 'High' && (
          <Text style={styles.highPriorityText}>High Priority</Text>
        )}
        {item.reminder && (
          <View style={styles.reminderIndicator}>
            <Ionicons name="notifications-outline" size={16} color="#007AFF" />
            <Text style={styles.reminderText}>Reminder Set</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TaskCreation', { task: item })}>
        <Ionicons name="create-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Tasks</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
          onPress={() => setFilter('All')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Personal' && styles.activeFilter]}
          onPress={() => setFilter('Personal')}
        >
          <Text style={styles.filterText}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Work' && styles.activeFilter]}
          onPress={() => setFilter('Work')}
        >
          <Text style={styles.filterText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Education' && styles.activeFilter]}
          onPress={() => setFilter('Education')}
        >
          <Text style={styles.filterText}>Education</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Completed' && styles.activeFilter]}
          onPress={() => setFilter('Completed')}
        >
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16,
    height: '100%',
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#000',
  },
  listContainer: {
    paddingBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  highPriorityTask: {
    borderLeftWidth: 4,
    borderLeftColor: 'red',
  },
  highPriorityText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14, 
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskDeadline: {
    fontSize: 12,
    color: '#888',
  },
  taskPriority: {
    fontSize: 12,
    color: '#888',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  reminderIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reminderText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
});

export default TaskListScreen;