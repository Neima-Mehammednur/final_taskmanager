// // import React, { useState } from 'react';
// // import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import { Ionicons } from '@expo/vector-icons';
// // import CheckBox from '@react-native-community/checkbox';


// // const TaskListScreen = ({ navigation }) => {
// //     const [tasks, setTasks] = useState([
// //         { id: '1', name: 'Math Homework', description: 'Complete algebra exercises', category: 'Education', completed: false },
// //         { id: '2', name: 'Team Meeting', description: 'Discuss project updates', category: 'Work', completed: false },
// //     ]);
// //     const [filter, setFilter] = useState('All');

// //     const toggleComplete = (id) => {
// //         setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
// //     };

// //     const deleteTask = (id) => {
// //         setTasks(tasks.filter(task => task.id !== id));
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)}>
// //                 <Picker.Item label="All" value="All" />
// //                 <Picker.Item label="Personal" value="Personal" />
// //                 <Picker.Item label="Work" value="Work" />
// //                 <Picker.Item label="Education" value="Education" />
// //                 <Picker.Item label="Completed" value="Completed" />
// //             </Picker>
// //             <FlatList
// //                 data={tasks.filter(task => filter === 'All' || (filter === 'Completed' ? task.completed : task.category === filter))}
// //                 keyExtractor={item => item.id}
// //                 renderItem={({ item }) => (
// //                     <View style={styles.taskCard}>
// //                         <CheckBox value={item.completed} onValueChange={() => toggleComplete(item.id)} />
// //                         <View style={{ flex: 1 }}>
// //                             <Text style={styles.taskTitle}>{item.name}</Text>
// //                             <Text>{item.description}</Text>
// //                         </View>
// //                         <TouchableOpacity onPress={() => deleteTask(item.id)}>
// //                             <Ionicons name="trash" size={24} color="red" />
// //                         </TouchableOpacity>
// //                     </View>
// //                 )}
// //             />
// //             <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskCreation')}>
// //                 <Text style={styles.addButtonText}>+ Add Task</Text>
// //             </TouchableOpacity>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: { flex: 1, padding: 20 },
// //     taskCard: { flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 5, backgroundColor: '#f9f9f9', borderRadius: 8 },
// //     taskTitle: { fontWeight: 'bold' },
// //     addButton: { backgroundColor: '#6200ee', padding: 15, alignItems: 'center', marginTop: 10, borderRadius: 8 },
// //     addButtonText: { color: 'white', fontSize: 16 }
// // });

// // export default TaskListScreen;

// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Ionicons } from '@expo/vector-icons';
// import CheckBox from '@react-native-community/checkbox';

// const TaskListScreen = ({ navigation }) => {
//     const [tasks, setTasks] = useState([
//         { id: '1', name: 'Math Homework', description: 'Complete algebra exercises', category: 'Education', completed: false },
//         { id: '2', name: 'Team Meeting', description: 'Discuss project updates', category: 'Work', completed: false },
//     ]);
//     const [filter, setFilter] = useState('All');

//     const toggleComplete = (id) => {
//         setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
//     };

//     const deleteTask = (id) => {
//         setTasks(tasks.filter(task => task.id !== id));
//     };

//     return (
//         <View style={styles.container}>
//             <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)}>
//                 <Picker.Item label="All" value="All" />
//                 <Picker.Item label="Personal" value="Personal" />
//                 <Picker.Item label="Work" value="Work" />
//                 <Picker.Item label="Education" value="Education" />
//                 <Picker.Item label="Completed" value="Completed" />
//             </Picker>
            
//             <FlatList
//                 data={tasks.filter(task => filter === 'All' || (filter === 'Completed' ? task.completed : task.category === filter))}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.taskCard}>
//                         <CheckBox
//                             value={item.completed}
//                             onValueChange={() => toggleComplete(item.id)}
//                             tintColors={{ true: '#6200ee', false: '#ccc' }} // Android
//                             onFillColor="#6200ee" // iOS
//                         />
//                         <View style={{ flex: 1 }}>
//                             <Text style={styles.taskTitle}>{item.name}</Text>
//                             <Text>{item.description}</Text>
//                         </View>
//                         <TouchableOpacity onPress={() => deleteTask(item.id)}>
//                             <Ionicons name="trash" size={24} color="red" />
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
            
//             <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskCreation')}>
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
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([
        { id: '1', name: 'Math Homework', description: 'Complete algebra exercises', category: 'Education', completed: false },
        { id: '2', name: 'Team Meeting', description: 'Discuss project updates', category: 'Work', completed: false },
    ]);
    const [filter, setFilter] = useState('All');

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <View style={styles.container}>
            <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)}>
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Completed" value="Completed" />
            </Picker>
            <FlatList
                data={tasks.filter(task => filter === 'All' || (filter === 'Completed' ? task.completed : task.category === filter))}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskCard}>
                        <CheckBox
                            checked={item.completed}
                            onPress={() => toggleComplete(item.id)}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.taskTitle}>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskCreation')}>
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    taskCard: { flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 5, backgroundColor: '#f9f9f9', borderRadius: 8 },
    taskTitle: { fontWeight: 'bold' },
    addButton: { backgroundColor: '#6200ee', padding: 15, alignItems: 'center', marginTop: 10, borderRadius: 8 },
    addButtonText: { color: 'white', fontSize: 16 }
});

export default TaskListScreen;
