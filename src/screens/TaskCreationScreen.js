
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { addTask, updateTask } from "../services/firebaseService";

// const TaskCreationScreen = () => {
//   const [taskName, setTaskName] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");
//   const [taskCourse, setTaskCourse] = useState("");
//   const [taskPriority, setTaskPriority] = useState("Low");
//   const [taskDeadline, setTaskDeadline] = useState(new Date());
//   const [taskNotes, setTaskNotes] = useState("");
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);
//   const [reminderTime, setReminderTime] = useState(new Date());
//   const [isEditing, setIsEditing] = useState(false);
//   const [taskId, setTaskId] = useState(null);

//   const navigation = useNavigation();
//   const route = useRoute();

//   useEffect(() => {
//     if (route.params?.task) {
//       const { task } = route.params;  
//       setTaskName(task.name);
//       setTaskDescription(task.description);
//       setTaskCourse(task.course);
//       setTaskPriority(task.priority);
//       setTaskDeadline(new Date(task.deadline));
//       setTaskNotes(task.notes);
//       setIsReminderEnabled(!!task.reminder);
//       if (task.reminder) {
//         setReminderTime(new Date(task.reminder));
//       }
//       setIsEditing(true);
//       setTaskId(task.id);
//     } else {
//       // Reset state for new task creation
//       setTaskName("");
//       setTaskDescription("");
//       setTaskCourse("");
//       setTaskPriority("Low");
//       setTaskDeadline(new Date());
//       setTaskNotes("");
//       setIsReminderEnabled(false);
//       setReminderTime(new Date());
//       setIsEditing(false);
//       setTaskId(null);
//     }
//   }, [route.params?.task]);

//   const handleCreateOrUpdateTask = async () => {
//     if (!taskName || !taskDescription || !taskCourse) {
//       Alert.alert("Error", "Please fill in all required fields");
//       return;
//     }

//     const taskData = {
//       name: taskName,
//       description: taskDescription,
//       course: taskCourse,
//       priority: taskPriority,
//       deadline: taskDeadline.toISOString(),
//       reminder: isReminderEnabled ? reminderTime.toISOString() : null,
//       completed: false,
//       notes: taskNotes,
//       attachments: [],
//     };

//     try {
//       if (isEditing) {
//         // Update the existing task
//         await updateTask(taskId, taskData);
//       } else {
//         // Create a new task
//         await addTask(taskData);
//       }

//       // Reset state after successful creation/update
//       setTaskName("");
//       setTaskDescription("");
//       setTaskCourse("");
//       setTaskPriority("Low");
//       setTaskDeadline(new Date());
//       setTaskNotes("");
//       setIsReminderEnabled(false);
//       setReminderTime(new Date());
//       setIsEditing(false);
//       setTaskId(null);

//       // Navigate back to the TaskList screen with a refresh parameter
//       navigation.navigate("TaskList", { refresh: true });
//     } catch (error) {
//       console.error("Error saving task:", error);
//     }
//   };

//   const handleReminderTimeChange = (event, selectedTime) => {
//     if (selectedTime) {
//       setReminderTime(selectedTime);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>{isEditing ? "Edit Task" : "Create Task"}</Text>
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

//       {/* Course */}
//       <Text style={styles.label}>Course</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter course name"
//         value={taskCourse}
//         onChangeText={setTaskCourse}
//       />

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
//             color={isReminderEnabled ? '#4CAF50' : '#ccc'}
//           />
//         </TouchableOpacity>
//       </View>

//       {isReminderEnabled && (
//         <DateTimePicker
//           style={styles.reminderPicker}
//           value={reminderTime}
//           mode="time"
//           display="default"
//           onChange={handleReminderTimeChange}
//         />
//       )}

//       {/* Create/Update Task Button */}
//       <TouchableOpacity style={styles.createButton} onPress={handleCreateOrUpdateTask}>
//         <Text style={styles.createButtonText}>{isEditing ? "Update Task" : "Create Task"}</Text>
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
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   createButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//   },
//   createButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   reminderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   reminderToggle: {
//     marginLeft: 10,
//   },
//   reminderPicker: {
//     marginBottom: 10,
//   },
// });

// export default TaskCreationScreen;


import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { addTask, updateTask } from "../services/firebaseService";

const TaskCreationScreen = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCourse, setTaskCourse] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [taskNotes, setTaskNotes] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTaskName(task.name);
      setTaskDescription(task.description);
      setTaskCourse(task.course);
      setTaskPriority(task.priority);
      setTaskDeadline(new Date(task.deadline));
      setTaskNotes(task.notes);
      setIsReminderEnabled(!!task.reminder);
      if (task.reminder) {
        setReminderTime(new Date(task.reminder));
      }
      setIsEditing(true);
      setTaskId(task.id);
    } else {
      // Reset state for new task creation
      setTaskName("");
      setTaskDescription("");
      setTaskCourse("");
      setTaskPriority("Low");
      setTaskDeadline(new Date());
      setTaskNotes("");
      setIsReminderEnabled(false);
      setReminderTime(new Date());
      setIsEditing(false);
      setTaskId(null);
    }
  }, [route.params?.task]);

  const handleCreateOrUpdateTask = async () => {
    if (!taskName || !taskDescription || !taskCourse) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      course: taskCourse,
      priority: taskPriority,
      deadline: taskDeadline.toISOString(),
      reminder: isReminderEnabled ? reminderTime.toISOString() : null,
      completed: false,
      notes: taskNotes,
      attachments: [],
    };

    try {
      if (isEditing) {
        // Update the existing task
        await updateTask(taskId, taskData);
      } else {
        // Create a new task
        await addTask(taskData);
      }

      // Reset state after successful creation/update
      setTaskName("");
      setTaskDescription("");
      setTaskCourse("");
      setTaskPriority("Low");
      setTaskDeadline(new Date());
      setTaskNotes("");
      setIsReminderEnabled(false);
      setReminderTime(new Date());
      setIsEditing(false);
      setTaskId(null);

      // Navigate back to the TaskList screen with a refresh parameter
      navigation.navigate("TaskList", { refresh: true });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleReminderTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Gradient */}
    
        <Text style={styles.headerText}>{isEditing ? "Edit Task" : "Create Task"}</Text>

      {/* Task Name */}
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        placeholderTextColor="#999"
        value={taskName}
        onChangeText={setTaskName}
      />

      {/* Task Description */}
      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter task description"
        placeholderTextColor="#999"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline
      />

      {/* Course */}
      <Text style={styles.label}>Course</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter course name"
        placeholderTextColor="#999"
        value={taskCourse}
        onChangeText={setTaskCourse}
      />

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        {["Low", "Medium", "High"].map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.priorityButton,
              taskPriority === priority && styles.activePriorityButton,
            ]}
            onPress={() => setTaskPriority(priority)}
          >
            <Text
              style={[
                styles.priorityButtonText,
                taskPriority === priority && styles.activePriorityButtonText,
              ]}
            >
              {priority}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Deadline */}
      <Text style={styles.label}>Deadline</Text>
      <View style={styles.dateTimePickerContainer}>
        <DateTimePicker
          value={taskDeadline}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => selectedDate && setTaskDeadline(selectedDate)}
        />
      </View>

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
            color={isReminderEnabled ? '#4CAF50' : '#ccc'}
          />
        </TouchableOpacity>
      </View>

      {isReminderEnabled && (
        <View style={styles.dateTimePickerContainer}>
          <DateTimePicker
            value={reminderTime}
            mode="time"
            display="default"
            onChange={handleReminderTimeChange}
          />
        </View>
      )}

      {/* Create/Update Task Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateOrUpdateTask}>
        <LinearGradient
          colors={['#4CAF50', '#81C784']}
          style={styles.gradientButton}
        >
          <Text style={styles.createButtonText}>{isEditing ? "Update Task" : "Create Task"}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#FFF',
  },
  activePriorityButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activePriorityButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  dateTimePickerContainer: {
    marginBottom: 16,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reminderToggle: {
    marginLeft: 10,
  },
  createButton: {
    borderRadius: 8,
    overflow: 'hidden',

  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskCreationScreen;