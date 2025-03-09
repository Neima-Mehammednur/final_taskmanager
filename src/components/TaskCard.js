
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { useNavigation } from '@react-navigation/native'; 

const TaskCard = ({ task, onToggleComplete, onDeleteTask, isDarkMode }) => {
  const navigation = useNavigation(); 

  const handleCardPress = () => {
    navigation.navigate('TaskDetail', { task }); 
  };

  const handleEditPress = () => {
    navigation.navigate('TaskCreation', { task }); 
  };

  return (
    <TouchableOpacity
      style={[styles.taskCard, isDarkMode && styles.darkTaskCard]}
      onPress={handleCardPress} 
    >
      <View style={styles.taskContent}>
        <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
          <Ionicons
            name={task.completed ? "checkbox-outline" : "square-outline"}
            size={24}
            color={task.completed ? colors.primary : isDarkMode ? "#777" : "#ccc"}
          />
        </TouchableOpacity>
        <View style={styles.taskDetails}>
          <Text style={[styles.taskName, task.completed && styles.completedTaskName, isDarkMode && styles.darkText]}>
            {task.name}
          </Text>
          {task.priority === "High" && (
            <Text style={[styles.highPriorityText, isDarkMode && styles.darkHighPriorityText]}>
              High Priority
            </Text>
          )}
          {task.reminder && (
            <Text style={[styles.reminderIndicator, isDarkMode && styles.darkText]}>
              Reminder: {new Date(task.reminder).toLocaleTimeString()}
            </Text>
          )}
          <Text style={[styles.taskInfo, isDarkMode && styles.darkText]}>
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </Text>
          {task.attachments && task.attachments.length > 0 && (
            <View style={styles.attachmentsContainer}>
              <ScrollView horizontal>
                {task.attachments.map((attachment, index) => (
                  <View key={index} style={[styles.attachmentItem, isDarkMode && styles.darkAttachmentItem]}>
                    <Ionicons name="document-outline" size={16} color={isDarkMode ? "#FFF" : "#333"} />
                    <Text style={[styles.attachmentName, isDarkMode && styles.darkText]}>{attachment.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleEditPress}>
            <Ionicons name="create-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteTask(task.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkTaskCard: {
    backgroundColor: colors.darkBackground,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  completedTaskName: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  highPriorityText: {
    color: '#FF5252',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
  darkHighPriorityText: {
    color: '#FF5252',
  },
  reminderIndicator: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 4,
  },
  taskInfo: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  attachmentsContainer: {
    marginTop: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 8,
    backgroundColor: colors.background,
  },
  darkAttachmentItem: {
    backgroundColor: colors.darkBackground,
    borderColor: '#555',
  },
  attachmentName: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default TaskCard;