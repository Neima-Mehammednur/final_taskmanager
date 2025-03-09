
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const ProfileStatistics = ({ tasks, isDarkMode }) => {
  const calculateTaskStatistics = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const activeTasks = tasks.length - completedTasks;
    return { completedTasks, activeTasks };
  };

  return (
    <View style={[styles.profileStatistics, isDarkMode && styles.darkCard]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Task Statistics</Text>
      <View style={styles.statisticsRow}>
        <View style={styles.statisticItem}>
          <Text style={[styles.statisticNumber, isDarkMode && styles.darkText]}>
            {calculateTaskStatistics().completedTasks}
          </Text>
          <Text style={[styles.statisticLabel, isDarkMode && styles.darkText]}>Completed</Text>
        </View>
        <View style={styles.statisticItem}>
          <Text style={[styles.statisticNumber, isDarkMode && styles.darkText]}>
            {calculateTaskStatistics().activeTasks}
          </Text>
          <Text style={[styles.statisticLabel, isDarkMode && styles.darkText]}>Active</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileStatistics: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: colors.darkBackground,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statisticItem: {
    alignItems: 'center',
  },
  statisticNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statisticLabel: {
    fontSize: 14,
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default ProfileStatistics;