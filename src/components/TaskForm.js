
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

const TaskForm = ({
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
  isDarkMode,
}) => {
  const handleReminderTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  return (
    <View>
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
        style={[styles.input, styles.multilineInput, isDarkMode && styles.darkInput]}
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
            color={isReminderEnabled ? colors.primary : isDarkMode ? '#777' : '#ccc'}
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

    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: colors.background,
    fontSize: 16,
    color: colors.text,
  },
  darkInput: {
    backgroundColor: colors.darkBackground,
    borderColor: '#555',
    color: colors.darkText,
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
    backgroundColor: colors.background,
  },
  darkPriorityButton: {
    backgroundColor: colors.darkBackground,
    borderColor: '#555',
  },
  activePriorityButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  priorityButtonText: {
    fontSize: 14,
    color: colors.text,
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

export default TaskForm;