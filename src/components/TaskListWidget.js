import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

const TaskListWidget = ({ tasks, onTaskPress, isDarkMode }) => {
  if (tasks.length === 0) {
    return (
      <View style={[styles.tasksCard, isDarkMode && styles.darkCard]}>
        <Text style={[styles.noTasksText, isDarkMode && styles.darkText]}>
          No tasks for today. Enjoy your day!
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.tasksCard, isDarkMode && styles.darkCard]}>
      <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Today's Tasks</Text>
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          style={[styles.taskItem, isDarkMode && styles.darkTaskItem]}
          onPress={() => onTaskPress(task)}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <View style={styles.taskDetails}>
            <Text style={[styles.taskName, isDarkMode && styles.darkText]}>{task.name}</Text>
            <Text style={[styles.taskDeadline, isDarkMode && styles.darkText]}>
              Deadline: {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tasksCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: colors.darkBackground,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  darkTaskItem: {
    backgroundColor: '#2C2C2C',
  },
  taskDetails: {
    marginLeft: 12,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  taskDeadline: {
    fontSize: 14,
    color: colors.text,
  },
  noTasksText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default TaskListWidget;