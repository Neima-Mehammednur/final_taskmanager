
import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchTasks, deleteTask, updateTask } from "../services/firebaseService";
import { useFocusEffect } from '@react-navigation/native';
import { DarkModeContext } from "../contexts/DarkModeContext";

const TaskListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);
  const { isDarkMode } = useContext(DarkModeContext);

  useFocusEffect(
    React.useCallback(() => {
      const loadTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      };
      loadTasks();
    }, [route.params?.refresh])
  );

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(taskId, updatedTask);
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };

  const handleClearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    for (const task of completedTasks) {
      await deleteTask(task.id);
    }
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.name.toLowerCase().includes(searchText.toLowerCase());

    if (filter === "All") return searchMatch;
    if (filter === "Active") return !task.completed && searchMatch;
    if (filter === "Completed") return task.completed && searchMatch;

    const normalizedCourse = task.course?.trim().toLowerCase();
    const normalizedFilter = filter.trim().toLowerCase();

    return normalizedCourse === normalizedFilter && searchMatch;
  });

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const renderHeader = () => {
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
            ref={searchInputRef}
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Search task..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={isDarkMode ? "#777" : "#999"}
          />
        </View>
        <View style={styles.filterContainer}>
          {["All", "Active", "Completed", ...uniqueCourses].map((filterName, index) => (
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
                      filterName === "All"
                        ? true
                        : filterName === "Active"
                          ? !task.completed
                          : filterName === "Completed"
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, isDarkMode && styles.darkTaskCard]}
      onPress={() => navigation.navigate('TaskDetail', { task: item })}
    >
      <View style={styles.taskContent}>
        <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
          <Ionicons
            name={item.completed ? "checkbox-outline" : "square-outline"}
            size={24}
            color={item.completed ? "#4CAF50" : isDarkMode ? "#777" : "#ccc"}
          />
        </TouchableOpacity>
        <View style={styles.taskDetails}>
          <Text style={[styles.taskName, item.completed && styles.completedTaskName, isDarkMode && styles.darkText]}>
            {item.name}
          </Text>
          {/* Priority (only if High) */}
          {item.priority === "High" && (
            <Text style={[styles.highPriorityText, isDarkMode && styles.darkHighPriorityText]}>
              High Priority
            </Text>
          )}
          {/* Reminder */}
          {item.reminder && (
            <Text style={[styles.reminderIndicator, isDarkMode && styles.darkText]}>
              Reminder: {new Date(item.reminder).toLocaleTimeString()}
            </Text>
          )}
          {/* Deadline */}
          <Text style={[styles.taskInfo, isDarkMode && styles.darkText]}>
            Deadline: {new Date(item.deadline).toLocaleDateString()}
          </Text>
          {/* Attachments */}
          {item.attachments && item.attachments.length > 0 && (
            <View style={styles.attachmentsContainer}>
              <ScrollView horizontal>
                {item.attachments.map((attachment, index) => (
                  <View key={index} style={[styles.attachmentItem, isDarkMode && styles.darkAttachmentItem]}>
                    <Ionicons name="document-outline" size={16} color={isDarkMode ? "#FFF" : "#333"} />
                    <Text style={[styles.attachmentName, isDarkMode && styles.darkText]}>{attachment.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        {/* Edit and Delete Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
            <Ionicons name="create-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => (
    <View style={[styles.footerContainer, isDarkMode && styles.darkFooterContainer]}>
      <Text style={[styles.tasksLeftText, isDarkMode && styles.darkText]}>{tasksLeft} tasks left</Text>
      <TouchableOpacity style={[styles.clearCompletedButton, isDarkMode && styles.darkClearCompletedButton]} onPress={handleClearCompleted}>
        <Text style={styles.clearCompletedText}>Clear completed</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      style={[styles.list, isDarkMode && styles.darkList]}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  darkList: {
    backgroundColor: "#121212",
  },
  flatListContent: {
    paddingTop: 50,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  darkHeaderContainer: {
    backgroundColor: '#1E1E1E',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  darkText: {
    color: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FFF",
  },
  darkInput: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
    color: '#FFF',
  },
  filterContainer: {
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    marginTop: 4,
    backgroundColor: "#FFF",
  },
  darkFilterButton: {
    backgroundColor: '#2C2C2C',
    borderColor: '#555',
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  filterText: {
    color: "#333",
  },
  darkFilterText: {
    color: '#AAA',
  },
  activeFilterText: {
    color: "#FFF",
  },
  taskCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkTaskCard: {
    backgroundColor: '#2C2C2C',
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  completedTaskName: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  highPriorityText: {
    color: "#FF5252",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
  },
  darkHighPriorityText: {
    color: '#FF5252',
  },
  reminderIndicator: {
    fontSize: 12,
    color: "#2196F3",
    marginTop: 4,
  },
  taskInfo: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  attachmentsContainer: {
    marginTop: 8,
  },
  attachmentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 8,
    backgroundColor: "#FFF",
  },
  darkAttachmentItem: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
  },
  attachmentName: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  darkFooterContainer: {
    backgroundColor: '#1E1E1E',
  },
  tasksLeftText: {
    fontSize: 16,
    color: "#333",
  },
  clearCompletedButton: {
    backgroundColor: "#FF5252",
    borderRadius: 8,
    padding: 8,
  },
  darkClearCompletedButton: {
    backgroundColor: '#B71C1C',
  },
  clearCompletedText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TaskListScreen;

