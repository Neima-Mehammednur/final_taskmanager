
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

const ProgressCard = ({ tasks, isDarkMode }) => {
  const calculateProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return tasks.length > 0 ? completedTasks / tasks.length : 0;
  };

  return (
    <View style={[styles.progressCard, isDarkMode && styles.darkCard]}>
      <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Task Progress</Text>
      <View style={styles.progressContent}>
        <Progress.Circle
          progress={calculateProgress()}
          size={80}
          showsText={true}
          formatText={() => {
            const completedTasks = tasks.filter((task) => task.completed).length;
            return `${Math.round(calculateProgress() * 100)}%`;
          }}
          color={colors.primary}
          thickness={6}
        />
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Ionicons name="list-outline" size={24} color={colors.primary} />
            <Text style={[styles.metricValue, isDarkMode && styles.darkText]}>{tasks.length}</Text>
            <Text style={[styles.metricLabel, isDarkMode && styles.darkText]}>Total Tasks</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color={colors.primary} />
            <Text style={[styles.metricValue, isDarkMode && styles.darkText]}>
              {tasks.filter((task) => task.completed).length}
            </Text>
            <Text style={[styles.metricLabel, isDarkMode && styles.darkText]}>Completed</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="time-outline" size={24} color="#FFA726" />
            <Text style={[styles.metricValue, isDarkMode && styles.darkText]}>
              {tasks.filter((task) => !task.completed).length}
            </Text>
            <Text style={[styles.metricLabel, isDarkMode && styles.darkText]}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  progressContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 15,
  },
  metricItem: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default ProgressCard;