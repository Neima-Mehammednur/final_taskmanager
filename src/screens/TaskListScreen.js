// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { CheckBox } from 'react-native-elements';

// const TaskListScreen = ({ navigation }) => {
//     const [tasks, setTasks] = useState([
//         { id: '1', name: 'Math Homework', description: 'Complete algebra exercises', category: 'Education', completed: false, deadline: new Date() },
//         { id: '2', name: 'Team Meeting', description: 'Discuss project updates', category: 'Work', completed: false, deadline: new Date() },
//     ]);

//     const [filter, setFilter] = useState('All');

//     const addTask = (task) => {
//         setTasks([...tasks, { ...task, id: String(tasks.length + 1) }]);
//     };

//     const toggleComplete = (id) => {
//         setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
//     };

//     const deleteTask = (id) => {
//         setTasks(tasks.filter(task => task.id !== id));
//     };

//     const editTask = (id) => {
//         const task = tasks.find(task => task.id === id);
//         navigation.navigate('TaskCreation', { task, addTask });
//     };

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={tasks.filter(task => filter === 'All' || (filter === 'Completed' ? task.completed : task.category === filter))}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.taskCard}>
//                         <CheckBox
//                             checked={item.completed}
//                             onPress={() => toggleComplete(item.id)}
//                         />
//                         <View style={{ flex: 1 }}>
//                             <Text style={styles.taskTitle}>{item.name}</Text>
//                             <Text>{item.description}</Text>
//                             <Text>{item.deadline.toLocaleDateString()}</Text>
//                         </View>
//                         <TouchableOpacity onPress={() => deleteTask(item.id)}>
//                             <Ionicons name="trash" size={24} color="red" />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => editTask(item.id)}>
//                             <Ionicons name="create" size={24} color="blue" />
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskCreation', { addTask })}>
//                 <Text style={styles.addButtonText}>+ Add Task</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20 },
//     taskCard: { flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 5, backgroundColor: '#f9f9f9', borderRadius: 8 },
//     taskTitle: { fontWeight: 'bold' },
//     addButton: { backgroundColor: '#6200ee', padding: 15, alignItems: 'center', marginTop: 10, borderRadius: 8 },
//     addButtonText: { color: 'white', fontSize: 16 }
// });

// export default TaskListScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
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

    const renderTaskItem = ({ item }) => (
        <View style={styles.taskItem}>
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

            <View style={styles.header}>
                <Text style={styles.headerText}>My Tasks</Text>
            </View>
            <FlatList
                data={tasks}
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
        height: "100%",
    },
    header: {
        marginBottom: 24,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
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
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});

export default TaskListScreen;