import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from '../contexts/DarkModeContext'; 

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { isDarkMode } = useContext(DarkModeContext); 

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.headerText, isDarkMode && styles.darkText]}>Task Detail</Text>

      <ScrollView style={[styles.content, isDarkMode && styles.darkContent]}>
        {/* Name */}
        <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
          <Ionicons name="document-text-outline" size={24} color="#4CAF50" style={styles.icon} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Task Name</Text>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{task.name}</Text>
          </View>
        </View>
        {/* Description */}
        <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
          <Ionicons name="document-text-outline" size={24} color="#4CAF50" style={styles.icon} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Description</Text>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{task.description}</Text>
          </View>
        </View>

        {/* Course */}
        <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
          <Ionicons name="school-outline" size={24} color="#4CAF50" style={styles.icon} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Course</Text>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{task.course}</Text>
          </View>
        </View>

        {/* Priority */}
        <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
          <Ionicons name="flag-outline" size={24} color="#4CAF50" style={styles.icon} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Priority</Text>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{task.priority}</Text>
          </View>
        </View>

        {/* Deadline */}
        <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
          <Ionicons name="calendar-outline" size={24} color="#4CAF50" style={styles.icon} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Deadline</Text>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{formatDateTime(task.deadline)}</Text>
          </View>
        </View>

        {/* Reminder */}
        {task.reminder && (
          <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
            <Ionicons name="alarm-outline" size={24} color="#4CAF50" style={styles.icon} />
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Reminder</Text>
              <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{formatDateTime(task.reminder)}</Text>
            </View>
          </View>
        )}

        {/* Attachments */}
        {task.attachments && task.attachments.length > 0 && (
          <View style={[styles.detailCard, isDarkMode && styles.darkDetailCard]}>
            <Ionicons name="attach-outline" size={24} color="#4CAF50" style={styles.icon} />
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>Attachments</Text>
              {task.attachments.map((attachment, index) => (
                <Text key={index} style={[styles.detailText, isDarkMode && styles.darkText]}>
                  {attachment.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close-circle" size={40} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginTop: 20,
  },
  darkText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  darkContent: {
    backgroundColor: '#1E1E1E',
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkDetailCard: {
    backgroundColor: '#2C2C2C',
  },
  icon: {
    marginRight: 16,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default TaskDetailScreen;