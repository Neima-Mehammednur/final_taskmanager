
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const TaskListComponent = ({ tasks, onTaskPress, isDarkMode }) => {
  if (tasks.length === 0) {
    return (
      <View style={[styles.taskContainer, isDarkMode && styles.darkTaskContainer]}>
        <Text style={[styles.noTaskText, isDarkMode && styles.darkText]}>No tasks for this day</Text>
      </View>
    );
  }

  return (
    <View style={[styles.taskContainer, isDarkMode && styles.darkTaskContainer]}>
      {tasks.map((task, index) => (
        <TouchableOpacity
          key={`${task.id}-${index}`}
          onPress={() => onTaskPress(task)}
        >
          <View
            style={[
              styles.taskCard,
              isDarkMode && styles.darkTaskCard,
              {
                borderLeftColor:
                  task.priority === 'High'
                    ? '#FF5252'
                    : task.priority === 'Medium'
                      ? '#FFA726'
                      : colors.primary,
              },
            ]}
          >
            <Text style={[styles.taskName, isDarkMode && styles.darkText]}>{task.name}</Text>
            <Text style={[styles.taskDeadline, isDarkMode && styles.darkText]}>
              Deadline: {new Date(task.deadline).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    margin: 16,
  },
  darkTaskContainer: {
    backgroundColor: colors.darkBackground,
  },
  taskCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkTaskCard: {
    backgroundColor: colors.darkBackground,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  taskDeadline: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  noTaskText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default TaskListComponent;