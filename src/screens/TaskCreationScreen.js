// // // // import React, { useState } from 'react';
// // // // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // // import * as DocumentPicker from 'expo-document-picker';

// // // // const TaskCreationScreen = ({ navigation, route }) => {
// // // //     const [taskName, setTaskName] = useState('');
// // // //     const [description, setDescription] = useState('');
// // // //     const [category, setCategory] = useState('Personal');
// // // //     const [priority, setPriority] = useState('Medium');
// // // //     const [deadline, setDeadline] = useState(new Date());
// // // //     const [attachment, setAttachment] = useState(null);
// // // //     const [showCategoryModal, setShowCategoryModal] = useState(false);
// // // //     const [showPriorityModal, setShowPriorityModal] = useState(false);
// // // //     const [reminder, setReminder] = useState(false);
// // // //     const [reminderTime, setReminderTime] = useState(new Date());

// // // //     const pickDocument = async () => {
// // // //         let result = await DocumentPicker.getDocumentAsync({});
// // // //         if (!result.cancelled) {
// // // //             setAttachment(result.uri);
// // // //         }
// // // //     };

// // // //     const createTask = () => {
// // // //         const newTask = { taskName, description, category, priority, deadline, attachment, reminderTime };
// // // //         route.params.addTask(newTask);  // Pass data to TaskListScreen
// // // //         navigation.goBack();
// // // //     };

// // // //     const renderPickerItem = (value, label, setter, modalSetter) => (
// // // //         <TouchableOpacity onPress={() => {
// // // //             setter(value);
// // // //             modalSetter(false);
// // // //         }}>
// // // //             <Text style={styles.modalItem}>{label}</Text>
// // // //         </TouchableOpacity>
// // // //     );

// // // //     return (
// // // //         <View style={styles.container}>
// // // //             <TextInput style={styles.input} placeholder="Task Name" value={taskName} onChangeText={setTaskName} />
// // // //             <DateTimePicker value={deadline} mode="date" display="default" onChange={(event, selectedDate) => setDeadline(selectedDate || deadline)} />

// // // //             <TouchableOpacity style={styles.pickerButton} onPress={() => setShowCategoryModal(true)}>
// // // //                 <Text>{category}</Text>
// // // //             </TouchableOpacity>
// // // //             <TouchableOpacity style={styles.pickerButton} onPress={() => setShowPriorityModal(true)}>
// // // //                 <Text>{priority}</Text>
// // // //             </TouchableOpacity>

// // // //             <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />

// // // //             <TouchableOpacity style={styles.attachButton} onPress={pickDocument}>
// // // //                 <Text>{attachment ? 'File Attached' : 'Attach File'}</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity style={styles.reminderButton} onPress={() => setReminder(true)}>
// // // //                 <Text>{reminder ? `Reminder set for ${reminderTime}` : 'Set Reminder'}</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity style={styles.createButton} onPress={createTask}>
// // // //                 <Text style={styles.createButtonText}>Create Task</Text>
// // // //             </TouchableOpacity>

// // // //             {/* Category Modal */}
// // // //             <Modal visible={showCategoryModal} animationType="slide">
// // // //                 <View style={styles.modalContainer}>
// // // //                     <FlatList
// // // //                         data={['Personal', 'Work', 'Education']}
// // // //                         renderItem={({ item }) => renderPickerItem(item, item, setCategory, setShowCategoryModal)}
// // // //                         keyExtractor={(item) => item}
// // // //                     />
// // // //                 </View>
// // // //             </Modal>

// // // //             {/* Priority Modal */}
// // // //             <Modal visible={showPriorityModal} animationType="slide">
// // // //                 <View style={styles.modalContainer}>
// // // //                     <FlatList
// // // //                         data={['Low', 'Medium', 'High']}
// // // //                         renderItem={({ item }) => renderPickerItem(item, item, setPriority, setShowPriorityModal)}
// // // //                         keyExtractor={(item) => item}
// // // //                     />
// // // //                 </View>
// // // //             </Modal>
// // // //         </View>
// // // //     );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //     container: { flex: 1, padding: 20 },
// // // //     input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
// // // //     pickerButton: { padding: 10, marginTop: 10, backgroundColor: '#ddd', borderRadius: 5, alignItems: 'center' },
// // // //     attachButton: { backgroundColor: '#ddd', padding: 10, marginTop: 10, borderRadius: 5, alignItems: 'center' },
// // // //     reminderButton: { backgroundColor: '#ddd', padding: 10, marginTop: 10, borderRadius: 5, alignItems: 'center' },
// // // //     createButton: { backgroundColor: '#6200ee', padding: 15, alignItems: 'center', marginTop: 10, borderRadius: 8 },
// // // //     createButtonText: { color: 'white', fontSize: 16 },
// // // //     modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
// // // //     modalItem: { padding: 15, backgroundColor: 'white', margin: 5, borderRadius: 5, width: 200, textAlign: 'center' },
// // // // });

// // // // export default TaskCreationScreen;

// // // import React, { useState, useContext } from 'react';
// // // import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { TaskContext } from '../context/TaskContext';
// // // import { Appbar } from 'react-native-paper';
// // // import * as DocumentPicker from 'expo-document-picker';
// // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // import styles from '../styles';

// // // const TaskCreationScreen = () => {
// // //   const navigation = useNavigation();
// // //   const { addTask } = useContext(TaskContext);
// // //   const [title, setTitle] = useState('');
// // //   const [description, setDescription] = useState('');
// // //   const [file, setFile] = useState(null);
// // //   const [reminder, setReminder] = useState(new Date());
// // //   const [showPicker, setShowPicker] = useState(false);

// // //   const handleFileSelect = async () => {
// // //     try {
// // //       const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
// // //       if (result.uri) {
// // //         setFile(result);
// // //       }
// // //     } catch (error) {
// // //       console.error('File selection error:', error);
// // //     }
// // //   };

// // //   const handleAddTask = () => {
// // //     if (title.trim()) {
// // //       addTask({ id: Date.now(), title, description, file, reminder });
// // //       navigation.goBack();
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Appbar.Header>
// // //         <Appbar.Content title="Create Task" />
// // //       </Appbar.Header>
// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="Task Title"
// // //         value={title}
// // //         onChangeText={setTitle}
// // //       />
// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="Task Description"
// // //         value={description}
// // //         onChangeText={setDescription}
// // //       />
// // //       <TouchableOpacity style={styles.fileButton} onPress={handleFileSelect}>
// // //         <Text style={styles.fileButtonText}>{file ? file.name : 'Attach File'}</Text>
// // //       </TouchableOpacity>
// // //       <TouchableOpacity style={styles.reminderButton} onPress={() => setShowPicker(true)}>
// // //         <Text style={styles.reminderButtonText}>Set Reminder</Text>
// // //       </TouchableOpacity>
// // //       {showPicker && (
// // //         <DateTimePicker
// // //           value={reminder}
// // //           mode="datetime"
// // //           display="default"
// // //           onChange={(event, selectedDate) => {
// // //             setShowPicker(false);
// // //             if (selectedDate) setReminder(selectedDate);
// // //           }}
// // //         />
// // //       )}
// // //       <Button title="Add Task" onPress={handleAddTask} color="blue" />
// // //     </View>
// // //   );
// // // };

// // // export default TaskCreationScreen;
// // import React, { useState } from 'react';
// // import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';

// // const TaskCreationScreen = () => {
// //   const [taskName, setTaskName] = useState('');
// //   const [taskDescription, setTaskDescription] = useState('');
// //   const [taskCategory, setTaskCategory] = useState('Personal');
// //   const [taskPriority, setTaskPriority] = useState('Low');
// //   const [taskDeadline, setTaskDeadline] = useState(new Date());
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const navigation = useNavigation();

// //   const handleCreateTask = async () => {
// //     if (!taskName || !taskDescription) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     const newTask = {
// //       id: Date.now().toString(),
// //       name: taskName,
// //       description: taskDescription,
// //       category: taskCategory,
// //       priority: taskPriority,
// //       deadline: taskDeadline.toISOString(),
// //       completed: false,
// //     };

// //     try {
// //       // Fetch existing tasks from AsyncStorage
// //       const existingTasks = await AsyncStorage.getItem('tasks');
// //       const tasks = existingTasks ? JSON.parse(existingTasks) : [];

// //       // Add the new task
// //       tasks.push(newTask);

// //       // Save updated tasks back to AsyncStorage
// //       await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

// //       // Navigate back to TaskListScreen
// //       navigation.navigate('TaskList');
// //     } catch (error) {
// //       console.error('Error saving task:', error);
// //     }
// //   };

// //   const handleDateChange = (event, selectedDate) => {
// //     setShowDatePicker(false);
// //     if (selectedDate) {
// //       setTaskDeadline(selectedDate);
// //     }
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.label}>Task Name</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter task name"
// //         value={taskName}
// //         onChangeText={setTaskName}
// //       />

// //       <Text style={styles.label}>Task Description</Text>
// //       <TextInput
// //         style={[styles.input, styles.multilineInput]}
// //         placeholder="Enter task description"
// //         value={taskDescription}
// //         onChangeText={setTaskDescription}
// //         multiline
// //       />

// //       <Text style={styles.label}>Category</Text>
// //       <Picker
// //         selectedValue={taskCategory}
// //         onValueChange={(itemValue) => setTaskCategory(itemValue)}
// //         style={styles.picker}
// //       >
// //         <Picker.Item label="Personal" value="Personal" />
// //         <Picker.Item label="Work" value="Work" />
// //         <Picker.Item label="Education" value="Education" />
// //       </Picker>

// //       <Text style={styles.label}>Priority</Text>
// //       <Picker
// //         selectedValue={taskPriority}
// //         onValueChange={(itemValue) => setTaskPriority(itemValue)}
// //         style={styles.picker}
// //       >
// //         <Picker.Item label="Low" value="Low" />
// //         <Picker.Item label="Medium" value="Medium" />
// //         <Picker.Item label="High" value="High" />
// //       </Picker>

// //       <Text style={styles.label}>Deadline</Text>
// //       <Button title="Select Deadline" onPress={() => setShowDatePicker(true)} />
// //       {showDatePicker && (
// //         <DateTimePicker
// //           value={taskDeadline}
// //           mode="date"
// //           display="default"
// //           onChange={handleDateChange}
// //         />
// //       )}

// //       <View style={styles.buttonContainer}>
// //         <Button title="Create Task" onPress={handleCreateTask} />
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 16,
// //   },
// //   label: {
// //     fontSize: 16,
// //     marginBottom: 8,
// //     fontWeight: 'bold',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 8,
// //     padding: 12,
// //     marginBottom: 16,
// //   },
// //   multilineInput: {
// //     height: 100,
// //   },
// //   picker: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 8,
// //     marginBottom: 16,
// //   },
// //   buttonContainer: {
// //     marginTop: 24,
// //   },
// // });

// // export default TaskCreationScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';


// const TaskCreationScreen = () => {
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskCategory, setTaskCategory] = useState('Personal');
//   const [taskPriority, setTaskPriority] = useState('Low');
//   const [taskDeadline, setTaskDeadline] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showCategoryPicker, setShowCategoryPicker] = useState(false);
//   const [showPriorityPicker, setShowPriorityPicker] = useState(false);
//   const [showReminderPicker, setShowReminderPicker] = useState(false);
//   const [reminderTime, setReminderTime] = useState(new Date());
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);
//   const navigation = useNavigation();

//   const handleCreateTask = async () => {
//     if (!taskName || !taskDescription) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     const newTask = {
//       id: Date.now().toString(),
//       name: taskName,
//       description: taskDescription,
//       category: taskCategory,
//       priority: taskPriority,
//       deadline: taskDeadline.toISOString(),
//       reminder: isReminderEnabled ? reminderTime.toISOString() : null,
//       completed: false,
//     };

//     try {
//       const existingTasks = await AsyncStorage.getItem('tasks');
//       const tasks = existingTasks ? JSON.parse(existingTasks) : [];
//       tasks.push(newTask);
//       await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
//       navigation.navigate('TaskList');
//     } catch (error) {
//       console.error('Error saving task:', error);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setTaskDeadline(selectedDate);
//     }
//   };

//   const handleReminderTimeChange = (event, selectedTime) => {
//     setShowReminderPicker(false);
//     if (selectedTime) {
//       setReminderTime(selectedTime);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Create Task</Text>
//       </View>

//       {/* Task Name */}
//       <Text style={styles.label}>Task Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter task name"
//         value={taskName}
//         onChangeText={setTaskName}
//       />

//       {/* Task Description */}
//       <Text style={styles.label}>Task Description</Text>
//       <TextInput
//         style={[styles.input, styles.multilineInput]}
//         placeholder="Enter task description"
//         value={taskDescription}
//         onChangeText={setTaskDescription}
//         multiline
//       />

//       {/* Category Picker */}
//       <Text style={styles.label}>Category</Text>
//       <TouchableOpacity
//         style={styles.pickerButton}
//         onPress={() => setShowCategoryPicker(true)}
//       >
//         <Text>{taskCategory}</Text>
//         <Ionicons name="chevron-down" size={16} color="#666" />
//       </TouchableOpacity>
//       {showCategoryPicker && (
//         <View style={styles.pickerModal}>
//           <Picker
//             selectedValue={taskCategory}
//             onValueChange={(itemValue) => {
//               setTaskCategory(itemValue);
//               setShowCategoryPicker(false);
//             }}
//           >
//             <Picker.Item label="Personal" value="Personal" />
//             <Picker.Item label="Work" value="Work" />
//             <Picker.Item label="Education" value="Education" />
//           </Picker>
//         </View>
//       )}

//       {/* Priority Picker */}
//       <Text style={styles.label}>Priority</Text>
//       <TouchableOpacity
//         style={styles.pickerButton}
//         onPress={() => setShowPriorityPicker(true)}
//       >
//         <Text>{taskPriority}</Text>
//         <Ionicons name="chevron-down" size={16} color="#666" />
//       </TouchableOpacity>
//       {showPriorityPicker && (
//         <View style={styles.pickerModal}>
//           <Picker
//             selectedValue={taskPriority}
//             onValueChange={(itemValue) => {
//               setTaskPriority(itemValue);
//               setShowPriorityPicker(false);
//             }}
//           >
//             <Picker.Item label="Low" value="Low" />
//             <Picker.Item label="Medium" value="Medium" />
//             <Picker.Item label="High" value="High" />
//           </Picker>
//         </View>
//       )}

//       {/* Deadline Picker */}
//       <Text style={styles.label}>Deadline</Text>
//       <TouchableOpacity
//         style={styles.pickerButton}
//         onPress={() => setShowDatePicker(true)}
//       >
//         <Text>{taskDeadline.toLocaleDateString()}</Text>
//         <Ionicons name="calendar-outline" size={16} color="#666" />
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={taskDeadline}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}

//       {/* Reminder Toggle and Time Picker */}
//       <View style={styles.reminderContainer}>
//         <Text style={styles.label}>Set Reminder</Text>
//         <TouchableOpacity
//           style={styles.reminderToggle}
//           onPress={() => setIsReminderEnabled(!isReminderEnabled)}
//         >
//           <Ionicons
//             name={isReminderEnabled ? 'notifications' : 'notifications-off'}
//             size={24}
//             color={isReminderEnabled ? '#007AFF' : '#ccc'}
//           />
//         </TouchableOpacity>
//       </View>
//       {isReminderEnabled && (
//         <TouchableOpacity
//           style={styles.pickerButton}
//           onPress={() => setShowReminderPicker(true)}
//         >
//           <Text>{reminderTime.toLocaleTimeString()}</Text>
//           <Ionicons name="time-outline" size={16} color="#666" />
//         </TouchableOpacity>
//       )}
//       {showReminderPicker && (
//         <DateTimePicker
//           value={reminderTime}
//           mode="time"
//           display="default"
//           onChange={handleReminderTimeChange}
//         />
//       )}

//       {/* Create Task Button */}
//       <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
//         <Text style={styles.createButtonText}>Create Task</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'stretch',
//     padding: 16,
//     height: "100%",
//   },
//   header: {
//     marginBottom: 24,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   multilineInput: {
//     height: 100,
//   },
//   pickerButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   pickerModal: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   reminderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   reminderToggle: {
//     padding: 8,
//   },
//   createButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//   },
//   createButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default TaskCreationScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TaskCreationScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('Personal');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const navigation = useNavigation();

  const handleCreateTask = async () => {
    if (!taskName || !taskDescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      description: taskDescription,
      category: taskCategory,
      priority: taskPriority,
      deadline: taskDeadline.toISOString(),
      reminder: isReminderEnabled ? reminderTime.toISOString() : null,
      completed: false,
    };

    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTaskDeadline(selectedDate);
    }
  };

  const handleReminderTimeChange = (event, selectedTime) => {
    setShowReminderPicker(false);
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Task</Text>
      </View>

      {/* Task Name */}
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={setTaskName}
      />

      {/* Task Description */}
      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter task description"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline
      />

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTaskCategory('Personal')}
        >
          <Text style={taskCategory === 'Personal' ? styles.activePickerText : styles.pickerText}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTaskCategory('Work')}
        >
          <Text style={taskCategory === 'Work' ? styles.activePickerText : styles.pickerText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTaskCategory('Education')}
        >
          <Text style={taskCategory === 'Education' ? styles.activePickerText : styles.pickerText}>Education</Text>
        </TouchableOpacity>
      </View>

      {/* Priority Picker */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTaskPriority('Low')}
        >
          <Text style={taskPriority === 'Low' ? styles.activePickerText : styles.pickerText}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTaskPriority('Medium')}
        >
          <Text style={taskPriority === 'Medium' ? styles.activePickerText : styles.pickerText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTaskPriority('High')}
        >
          <Text style={taskPriority === 'High' ? styles.activePickerText : styles.pickerText}>High</Text>
        </TouchableOpacity>
      </View>

      {/* Deadline Picker */}
      <Text style={styles.label}>Deadline</Text>
      <DateTimePicker
        value={taskDeadline}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => selectedDate && setTaskDeadline(selectedDate)}
      />
     {/* Reminder Toggle and Time Picker */}
<View style={styles.reminderContainer}>
  <Text style={styles.label}>Set Reminder</Text>
  <TouchableOpacity
    style={styles.reminderToggle}
    onPress={() => setIsReminderEnabled(!isReminderEnabled)}
  >
    <Ionicons
      name={isReminderEnabled ? 'notifications' : 'notifications-off'}
      size={24}
      color={isReminderEnabled ? '#007AFF' : '#ccc'}
    />
  </TouchableOpacity>
</View>

{isReminderEnabled && (
  <DateTimePicker
    style={styles.reminderPicker}
    value={reminderTime}
    mode="time"
    display="default"
    onChange={(event, selectedTime) => selectedTime && setReminderTime(selectedTime)}
  />
)}



      {/* Create Task Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
        <Text style={styles.createButtonText}>Create Task</Text>
      </TouchableOpacity>
    </ScrollView>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  multilineInput: {
    height: 100,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  pickerText: {
    color: '#666',
  },
  activePickerText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8, 
  },
  reminderPicker: {
    alignSelf: 'flex-start',
    marginTop: -20,
  },
  
  reminderToggle: {
    padding: 8,
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskCreationScreen;