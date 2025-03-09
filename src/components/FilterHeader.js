
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const FilterHeader = ({ tasks, filter, setFilter, searchText, setSearchText, isDarkMode }) => {
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const uniqueCourses = [
    ...new Set(
      tasks
        .map((task) => task.course?.trim().toLowerCase())
        .filter((course) => course)
    ),
  ].map((normalizedCourse) => {
    const task = tasks.find((task) => task.course?.trim().toLowerCase() === normalizedCourse);
    return task.course;
  });

  return (
    <View style={[styles.headerContainer, isDarkMode && styles.darkHeaderContainer]}>
      <Text style={[styles.headerText, isDarkMode && styles.darkText]}>My Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Search task..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
        />
      </View>
      <View style={styles.filterContainer}>
        {['All', 'Active', 'Completed', ...uniqueCourses].map((filterName, index) => (
          <TouchableOpacity
            key={`${filterName}-${index}`}
            style={[styles.filterButton, filter === filterName && styles.activeFilter, isDarkMode && styles.darkFilterButton]}
            onPress={() => setFilter(filterName)}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterName && styles.activeFilterText,
                isDarkMode && styles.darkFilterText,
              ]}
            >
              {capitalizeFirstLetter(filterName)} (
              {
                tasks.filter((task) => {
                  const filterMatch =
                    filterName === 'All'
                      ? true
                      : filterName === 'Active'
                        ? !task.completed
                        : filterName === 'Completed'
                          ? task.completed
                          : task.course?.trim().toLowerCase() === filterName.trim().toLowerCase();
                  return filterMatch;
                }).length
              }
              )
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  darkHeaderContainer: {
    backgroundColor: colors.darkBackground,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  darkInput: {
    backgroundColor: colors.darkBackground,
    borderColor: '#555',
    color: colors.darkText,
  },
  filterContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    marginTop: 4,
    backgroundColor: colors.background,
  },
  darkFilterButton: {
    backgroundColor: colors.darkBackground,
    borderColor: '#555',
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.text,
  },
  darkFilterText: {
    color: '#AAA',
  },
  activeFilterText: {
    color: '#FFF',
  },
});

export default FilterHeader;