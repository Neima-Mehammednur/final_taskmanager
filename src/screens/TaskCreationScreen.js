
import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DarkModeContext } from '../contexts/DarkModeContext';
import TaskForm from '../components/TaskForm';
import AttachmentsSection from '../components/AttachmentsSection';
import useTaskForm from '../hooks/useTaskForm';
import { colors } from '../constants/theme';
import * as DocumentPicker from 'expo-document-picker';

const TaskCreationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useContext(DarkModeContext);
  const {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    taskCourse,
    setTaskCourse,
    taskPriority,
    setTaskPriority,
    taskDeadline,
    setTaskDeadline,
    isReminderEnabled,
    setIsReminderEnabled,
    reminderTime,
    setReminderTime,
    attachments,
    setAttachments,
    handleCreateOrUpdateTask,
  } = useTaskForm();

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTaskName(task.name);
      setTaskDescription(task.description);
      setTaskCourse(task.course);
      setTaskPriority(task.priority);
      setTaskDeadline(new Date(task.deadline));
      setIsReminderEnabled(!!task.reminder);
      if (task.reminder) {
        setReminderTime(new Date(task.reminder));
      }
      setAttachments(task.attachments || []);
    }
  }, [route.params?.task]);

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
        contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}
        style={{ flex: 1 }}
      >
        <Text style={[styles.headerText, isDarkMode && styles.darkText]}>
          {route.params?.task ? 'Edit Task' : 'Create Task'}
        </Text>

        <TaskForm
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          taskCourse={taskCourse}
          setTaskCourse={setTaskCourse}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          taskDeadline={taskDeadline}
          setTaskDeadline={setTaskDeadline}
          isReminderEnabled={isReminderEnabled}
          setIsReminderEnabled={setIsReminderEnabled}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          isDarkMode={isDarkMode}
        />

        <AttachmentsSection
          attachments={attachments}
          onPickDocument={pickDocument}
          onRemoveAttachment={removeAttachment}
          isDarkMode={isDarkMode}
        />
      </ScrollView>

      {/* Create Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => handleCreateOrUpdateTask(!!route.params?.task, route.params?.task?.id, navigation)}
      >
        <LinearGradient colors={['#4CAF50', '#81C784']} style={styles.gradientButton}>
          <Text style={styles.createButtonText}>
          {route.params?.task ? 'Update Task' : 'Create Task'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingBottom: 100,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 50,
    marginBottom: 20,
  },
  darkText: {
    color: colors.darkText,
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
});

export default TaskCreationScreen;