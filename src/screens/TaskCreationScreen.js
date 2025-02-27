// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   ScrollView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from '@expo/vector-icons';

// // const TaskCreationScreen = () => {
// //   const [taskName, setTaskName] = useState('');
// //   const [taskDescription, setTaskDescription] = useState('');
// //   const [taskCategory, setTaskCategory] = useState('Personal');
// //   const [taskPriority, setTaskPriority] = useState('Low');
// //   const [taskDeadline, setTaskDeadline] = useState(new Date());
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [showReminderPicker, setShowReminderPicker] = useState(false);
// //   const [reminderTime, setReminderTime] = useState(new Date());
// //   const [isReminderEnabled, setIsReminderEnabled] = useState(false);
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
// //       reminder: isReminderEnabled ? reminderTime.toISOString() : null,
// //       completed: false,
// //     };

// //     try {
// //       const existingTasks = await AsyncStorage.getItem('tasks');
// //       const tasks = existingTasks ? JSON.parse(existingTasks) : [];
// //       tasks.push(newTask);
// //       await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

// //       // Reset the form fields
// //       setTaskName('');
// //       setTaskDescription('');
// //       setTaskCategory('Personal');
// //       setTaskPriority('Low');
// //       setTaskDeadline(new Date());
// //       setReminderTime(new Date());
// //       setIsReminderEnabled(false);

// //       // Navigate back to the CalendarScreen and trigger a refresh
// //       navigation.navigate('Calendar', { refresh: true });
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

// //   const handleReminderTimeChange = (event, selectedTime) => {
// //     setShowReminderPicker(false);
// //     if (selectedTime) {
// //       setReminderTime(selectedTime);
// //     }
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerText}>Create Task</Text>
// //       </View>

// //       {/* Task Name */}
// //       <Text style={styles.label}>Task Name</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter task name"
// //         value={taskName}
// //         onChangeText={setTaskName}
// //       />

// //       {/* Task Description */}
// //       <Text style={styles.label}>Task Description</Text>
// //       <TextInput
// //         style={[styles.input, styles.multilineInput]}
// //         placeholder="Enter task description"
// //         value={taskDescription}
// //         onChangeText={setTaskDescription}
// //         multiline
// //       />

// //       {/* Category Picker */}
// //       <Text style={styles.label}>Category</Text>
// //       <View style={styles.pickerContainer}>
// //         <TouchableOpacity
// //           style={styles.pickerButton}
// //           onPress={() => setTaskCategory('Personal')}
// //         >
// //           <Text style={taskCategory === 'Personal' ? styles.activePickerText : styles.pickerText}>Personal</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.pickerButton}
// //           onPress={() => setTaskCategory('Work')}
// //         >
// //           <Text style={taskCategory === 'Work' ? styles.activePickerText : styles.pickerText}>Work</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.pickerButton}
// //           onPress={() => setTaskCategory('Education')}
// //         >
// //           <Text style={taskCategory === 'Education' ? styles.activePickerText : styles.pickerText}>Education</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Priority Picker */}
// //       <Text style={styles.label}>Priority</Text>
// //       <View style={styles.pickerContainer}>
// //         <TouchableOpacity
// //           style={styles.pickerButton}
// //           onPress={() => setTaskPriority('Low')}
// //         >
// //           <Text style={taskPriority === 'Low' ? styles.activePickerText : styles.pickerText}>Low</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.pickerButton}
// //           onPress={() => setTaskPriority('Medium')}
// //         >
// //           <Text style={taskPriority === 'Medium' ? styles.activePickerText : styles.pickerText}>Medium</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.pickerButton}
// //           onPress={() => setTaskPriority('High')}
// //         >
// //           <Text style={taskPriority === 'High' ? styles.activePickerText : styles.pickerText}>High</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Deadline Picker */}
// //       <Text style={styles.label}>Deadline</Text>
// //       <DateTimePicker
// //         value={taskDeadline}
// //         mode="datetime" // Allow picking both date and time
// //         display="default"
// //         onChange={(event, selectedDate) => selectedDate && setTaskDeadline(selectedDate)}
// //       />

// //       {/* Reminder Toggle and Time Picker */}
// //       <View style={styles.reminderContainer}>
// //         <Text style={styles.label}>Set Reminder</Text>
// //         <TouchableOpacity
// //           style={styles.reminderToggle}
// //           onPress={() => setIsReminderEnabled(!isReminderEnabled)}
// //         >
// //           <Ionicons
// //             name={isReminderEnabled ? 'notifications' : 'notifications-off'}
// //             size={24}
// //             color={isReminderEnabled ? '#007AFF' : '#ccc'}
// //           />
// //         </TouchableOpacity>
// //       </View>

// //       {isReminderEnabled && (
// //         <DateTimePicker
// //           style={styles.reminderPicker}
// //           value={reminderTime}
// //           mode="time"
// //           display="default"
// //           onChange={(event, selectedTime) => selectedTime && setReminderTime(selectedTime)}
// //         />
// //       )}

// //       {/* Create Task Button */}
// //       <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
// //         <Text style={styles.createButtonText}>Create Task</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     marginTop: 50,
// //     flex: 1,
// //     justifyContent: 'flex-start',
// //     alignItems: 'stretch',
// //     padding: 16,
// //     height: '100%',
// //   },
// //   header: {
// //     marginBottom: 24,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
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
// //   pickerContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   pickerButton: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 8,
// //     padding: 12,
// //     marginHorizontal: 4,
// //   },
// //   pickerText: {
// //     color: '#666',
// //   },
// //   activePickerText: {
// //     color: '#007AFF',
// //     fontWeight: 'bold',
// //   },
// //   reminderContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 8,
// //   },
// //   reminderPicker: {
// //     alignSelf: 'flex-start',
// //     marginTop: -20,
// //   },
// //   reminderToggle: {
// //     padding: 8,
// //   },
// //   createButton: {
// //     backgroundColor: '#007AFF',
// //     borderRadius: 8,
// //     padding: 16,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   createButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default TaskCreationScreen;

// import React, { useState } from "react";
// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { addTask } from "../services/firebaseService";

// const TaskCreationScreen = () => {
//   const [taskName, setTaskName] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");
//   const [taskCourse, setTaskCourse] = useState("");
//   const [taskType, setTaskType] = useState("Assignment");
//   const [taskPriority, setTaskPriority] = useState("Low");
//   const [taskDeadline, setTaskDeadline] = useState(new Date());
//   const [taskNotes, setTaskNotes] = useState("");
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);
//   const navigation = useNavigation();

//   const handleCreateTask = async () => {
//     if (!taskName || !taskDescription || !taskCourse) {
//       Alert.alert("Error", "Please fill in all required fields");
//       return;
//     }

//     const newTask = {
//       name: taskName,
//       description: taskDescription,
//       course: taskCourse,
//       type: taskType,
//       priority: taskPriority,
//       deadline: taskDeadline.toISOString(),
//       reminder: isReminderEnabled ? reminderTime.toISOString() : null,
//       completed: false,
//       notes: taskNotes,
//       attachments: [],
//     };

//     try {
//       await addTask(newTask); // Use Firebase service
//       navigation.navigate("TaskList");
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
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

//       {/* Course */}
//       <Text style={styles.label}>Course</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter course name"
//         value={taskCourse}
//         onChangeText={setTaskCourse}
//       />

//       {/* Task Type */}
//       <Text style={styles.label}>Task Type</Text>
//       <View style={styles.pickerContainer}>
//         {["Assignment", "Exam", "Study"].map((type) => (
//           <TouchableOpacity
//             key={type}
//             style={[styles.pickerButton, taskType === type && styles.activePickerButton]}
//             onPress={() => setTaskType(type)}
//           >
//             <Text style={taskType === type ? styles.activePickerText : styles.pickerText}>{type}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Priority */}
//       <Text style={styles.label}>Priority</Text>
//       <View style={styles.pickerContainer}>
//         {["Low", "Medium", "High"].map((priority) => (
//           <TouchableOpacity
//             key={priority}
//             style={[styles.pickerButton, taskPriority === priority && styles.activePickerButton]}
//             onPress={() => setTaskPriority(priority)}
//           >
//             <Text style={taskPriority === priority ? styles.activePickerText : styles.pickerText}>{priority}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Deadline */}
//       <Text style={styles.label}>Deadline</Text>
//       <DateTimePicker
//         value={taskDeadline}
//         mode="datetime"
//         display="default"
//         onChange={(event, selectedDate) => selectedDate && setTaskDeadline(selectedDate)}
//       />

//       {/* Notes */}
//       <Text style={styles.label}>Notes</Text>
//       <TextInput
//         style={[styles.input, styles.multilineInput]}
//         placeholder="Enter additional notes"
//         value={taskNotes}
//         onChangeText={setTaskNotes}
//         multiline
//       />

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
//     height: '100%',
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
//   pickerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   pickerButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginHorizontal: 4,
//   },
//   pickerText: {
//     color: '#666',
//   },
//   activePickerText: {
//     color: '#007AFF',
//     fontWeight: 'bold',
//   },
//   reminderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   reminderPicker: {
//     alignSelf: 'flex-start',
//     marginTop: -20,
//   },
//   reminderToggle: {
//     padding: 8,
//   },
//   createButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   createButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default TaskCreationScreen;

import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { addTask } from "../services/firebaseService";

const TaskCreationScreen = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCourse, setTaskCourse] = useState("");
  const [taskType, setTaskType] = useState("Assignment");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [taskNotes, setTaskNotes] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const navigation = useNavigation();

  const handleCreateTask = async () => {
    if (!taskName || !taskDescription || !taskCourse) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      course: taskCourse,
      type: taskType,
      priority: taskPriority,
      deadline: taskDeadline.toISOString(),
      reminder: isReminderEnabled ? reminderTime.toISOString() : null,
      completed: false,
      notes: taskNotes,
      attachments: [],
    };

    try {
      await addTask(newTask); // Use Firebase service
      navigation.navigate("TaskList", { refresh: true }); // Pass refresh flag to update the list
    } catch (error) {
      console.error("Error creating task:", error);
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

      {/* Course */}
      <Text style={styles.label}>Course</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter course name"
        value={taskCourse}
        onChangeText={setTaskCourse}
      />

      {/* Task Type */}
      <Text style={styles.label}>Task Type</Text>
      <View style={styles.pickerContainer}>
        {["Assignment", "Exam", "Study"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.pickerButton, taskType === type && styles.activePickerButton]}
            onPress={() => setTaskType(type)}
          >
            <Text style={taskType === type ? styles.activePickerText : styles.pickerText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        {["Low", "Medium", "High"].map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[styles.pickerButton, taskPriority === priority && styles.activePickerButton]}
            onPress={() => setTaskPriority(priority)}
          >
            <Text style={taskPriority === priority ? styles.activePickerText : styles.pickerText}>{priority}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Deadline */}
      <Text style={styles.label}>Deadline</Text>
      <DateTimePicker
        value={taskDeadline}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => selectedDate && setTaskDeadline(selectedDate)}
      />

      {/* Notes */}
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter additional notes"
        value={taskNotes}
        onChangeText={setTaskNotes}
        multiline
      />

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
    height: '100%',
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