
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import { addTask, updateTask } from '../services/firebaseService';
import { DarkModeContext } from '../contexts/DarkModeContext';
import * as Notifications from 'expo-notifications';

const TaskCreationScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCourse, setTaskCourse] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [taskNotes, setTaskNotes] = useState('');
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useContext(DarkModeContext);

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
      setAttachments(task.attachments || []);
    } else {
      setTaskName('');
      setTaskDescription('');
      setTaskCourse('');
      setTaskPriority('Low');
      setTaskDeadline(new Date());
      setTaskNotes('');
      setIsReminderEnabled(false);
      setReminderTime(new Date());
      setIsEditing(false);
      setTaskId(null);
      setAttachments([]);
    }
  }, [route.params?.task]);

  const scheduleReminderNotification = async (reminderTime, taskName) => {
    const now = new Date();
    if (reminderTime <= now) {
      Alert.alert('Invalid Reminder', 'The reminder time must be in the future.');
      return;
    }

    console.log('Scheduling reminder for:', reminderTime);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `Don't forget: ${taskName}`,
        sound: true,
      },
      trigger: {
        date: reminderTime,
      },
    });
  };

  const handleCreateOrUpdateTask = async () => {
    if (!taskName || !taskDescription || !taskCourse) {
      Alert.alert('Error', 'Please fill in all required fields');
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
      attachments: attachments,
    };

    try {
      if (isEditing) {
        await updateTask(taskId, taskData);
      } else {
        await addTask(taskData);
      }

      if (isReminderEnabled) {
        await scheduleReminderNotification(reminderTime, taskName);
      }

      navigation.navigate('TaskList', { refresh: true });

      setTaskName('');
      setTaskDescription('');
      setTaskCourse('');
      setTaskPriority('Low');
      setTaskDeadline(new Date());
      setTaskNotes('');
      setIsReminderEnabled(false);
      setReminderTime(new Date());
      setIsEditing(false);
      setTaskId(null);
      setAttachments([]);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleReminderTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newAttachment = { uri: file.uri, name: file.name };
        setAttachments([...attachments, newAttachment]);
      } else {
        console.log('Document picker was canceled or no file was selected.');
      }
    } catch (err) {
      console.warn('Document Picker Error:', err);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isDarkMode && styles.darkContainer,
        ]}
        style={{ flex: 1 }}
      >
        <Text style={[styles.headerText, isDarkMode && styles.darkText]}>
          {isEditing ? 'Edit Task' : 'Create Task'}
        </Text>

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Task Name</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Enter task name"
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
          value={taskName}
          onChangeText={setTaskName}
        />

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Task Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.multilineInput,
            isDarkMode && styles.darkInput,
          ]}
          placeholder="Enter task description"
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
          value={taskDescription}
          onChangeText={setTaskDescription}
          multiline
        />

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Course</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Enter course name"
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
          value={taskCourse}
          onChangeText={setTaskCourse}
        />

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Priority</Text>
        <View style={styles.pickerContainer}>
          {['Low', 'Medium', 'High'].map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                taskPriority === priority && styles.activePriorityButton,
                isDarkMode && styles.darkPriorityButton,
              ]}
              onPress={() => setTaskPriority(priority)}
            >
              <Text
                style={[
                  styles.priorityButtonText,
                  taskPriority === priority && styles.activePriorityButtonText,
                  isDarkMode && styles.darkPriorityButtonText,
                ]}
              >
                {priority}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.deadlineFullRow}>
          <Text style={[styles.label, isDarkMode && styles.darkText, styles.deadlineLabel]}>
            Deadline
          </Text>
          <DateTimePicker
            value={taskDeadline}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => selectedDate && setTaskDeadline(selectedDate)}
            textColor={isDarkMode ? '#FFF' : '#000'}
            style={styles.deadlinePicker}
          />
          <DateTimePicker
            value={taskDeadline}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              if (selectedTime) {
                const newDeadline = new Date(taskDeadline);
                newDeadline.setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds());
                setTaskDeadline(newDeadline);
              }
            }}
            textColor={isDarkMode ? '#FFF' : '#000'}
            style={styles.deadlinePicker}
          />
        </View>

        <View style={styles.reminderContainer}>
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Set Reminder</Text>
          <TouchableOpacity
            style={styles.reminderToggle}
            onPress={() => setIsReminderEnabled(!isReminderEnabled)}
          >
            <Ionicons
              name={isReminderEnabled ? 'notifications' : 'notifications-off'}
              size={24}
              color={isReminderEnabled ? '#4CAF50' : isDarkMode ? '#777' : '#ccc'}
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
              textColor={isDarkMode ? '#FFF' : '#000'}
            />
          </View>
        )}

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Attachments</Text>
        <View style={styles.attachmentsRow}>
          <TouchableOpacity
            style={[styles.attachmentButton, isDarkMode && styles.darkAttachmentButton]}
            onPress={pickDocument}
          >
            <Ionicons name="attach" size={20} color={isDarkMode ? '#FFF' : '#333'} />
          </TouchableOpacity>
          <ScrollView horizontal style={styles.attachmentsContainer}>
            {attachments.map((attachment, index) => (
              <View
                key={index}
                style={[styles.attachmentItem, isDarkMode && styles.darkAttachmentItem]}
              >
                <Text style={[styles.attachmentName, isDarkMode && styles.darkText]}>
                  {attachment.name}
                </Text>
                <TouchableOpacity onPress={() => removeAttachment(index)}>
                  <Ionicons name="close-circle" size={20} color="#FF6347" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Create Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateOrUpdateTask}>
        <LinearGradient colors={['#4CAF50', '#81C784']} style={styles.gradientButton}>
          <Text style={styles.createButtonText}>{isEditing ? 'Update Task' : 'Create Task'}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    paddingBottom: 100,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    marginBottom: 20,
  },
  darkText: {
    color: '#FFF',
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
  darkInput: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
    color: '#FFF',
  },
  multilineInput: {
    height: 60,
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
  darkPriorityButton: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
  },
  activePriorityButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#666',
  },
  darkPriorityButtonText: {
    color: '#AAA',
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
    marginBottom: 5,
  },
  reminderToggle: {
    marginLeft: 10,
  },
  createButton: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
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
  attachmentButton: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    marginRight: 10,
  },
  darkAttachmentButton: {
    backgroundColor: '#333',
  },
  attachmentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    maxHeight: 40,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#FFF',
  },
  darkAttachmentItem: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
  },
  attachmentName: {
    fontSize: 14,
    marginRight: 10,
    color: '#333',
  },
  deadlineFullRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deadlineLabel: {
    flex: 1,
  },
  deadlinePicker: {
    flex: 2,
    marginRight: 5,
  },
});

export default TaskCreationScreen;