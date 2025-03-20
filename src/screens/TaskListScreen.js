
import React, { useRef, useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DarkModeContext } from '../contexts/DarkModeContext';
import FilterHeader from '../components/FilterHeader';
import TaskCard from '../components/TaskCard';
import useTaskList from '../hooks/useTaskList';
import { colors } from '../constants/theme';

const TaskListScreen = ({ navigation, route }) => {
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const { isDarkMode } = useContext(DarkModeContext);
  const { tasks, loadTasks, handleDeleteTask, handleToggleComplete, handleClearCompleted } = useTaskList();

  // Sort tasks by deadline in ascending order
  const sortedTasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // Filter tasks based on search text and selected filter
  const filteredTasks = sortedTasks.filter((task) => {
    const searchMatch = task.name.toLowerCase().includes(searchText.toLowerCase());

    if (filter === 'All') return searchMatch;
    if (filter === 'Active') return !task.completed && searchMatch;
    if (filter === 'Completed') return task.completed && searchMatch;

    const normalizedCourse = task.course?.trim().toLowerCase();
    const normalizedFilter = filter.trim().toLowerCase();

    return normalizedCourse === normalizedFilter && searchMatch;
  });

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [route.params?.refresh])
  );

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? colors.darkBackground : colors.background }}>
      {/* Non-scrollable Header */}
      <FilterHeader
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        isDarkMode={isDarkMode}
      />

      {/* Scrollable Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={handleToggleComplete}
            onEditTask={(task) => navigation.navigate('TaskCreation', { task })}
            onDeleteTask={handleDeleteTask}
            isDarkMode={isDarkMode}
          />
        )}
        ListFooterComponent={
          <View style={[styles.footerContainer, isDarkMode && styles.darkFooterContainer]}>
            <Text style={[styles.tasksLeftText, isDarkMode && styles.darkText]}>{tasksLeft} tasks left</Text>
            <TouchableOpacity
              style={[styles.clearCompletedButton, isDarkMode && styles.darkClearCompletedButton]}
              onPress={handleClearCompleted}
            >
              <Text style={styles.clearCompletedText}>Clear completed</Text>
            </TouchableOpacity>
          </View>
        }
        style={[styles.list, isDarkMode && styles.darkList]}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  darkList: {
    backgroundColor: colors.darkBackground,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  darkFooterContainer: {
    backgroundColor: colors.darkBackground,
  },
  tasksLeftText: {
    fontSize: 16,
    color: colors.text,
  },
  clearCompletedButton: {
    backgroundColor: '#FF5252',
    borderRadius: 8,
    padding: 8,
  },
  darkClearCompletedButton: {
    backgroundColor: '#B71C1C',
  },
  clearCompletedText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaskListScreen;