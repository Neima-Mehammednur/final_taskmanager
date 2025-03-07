import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
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
    const now = new Date();
    const deadline = new Date(task.deadline);
    const completedOnTime = now <= deadline;
  
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedOnTime: completedOnTime,
      completionDate: now.toISOString(),
    };
  
    await updateTask(taskId, updatedTask);
  
    // Update user's gamification data
    if (updatedTask.completed) {
      await updateUserGamificationData(completedOnTime);
    }
  
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };
  
  const updateUserGamificationData = async (completedOnTime) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
  
    // Calculate points
    const pointsEarned = completedOnTime ? 10 : 5; // Award more points for on-time completion
    const newPoints = (userData.points || 0) + pointsEarned;
  
    // Calculate streak
    const lastCompletionDate = userData.lastCompletionDate ? new Date(userData.lastCompletionDate) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    let newStreak = userData.streak || 0;
    if (lastCompletionDate) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
  
      if (lastCompletionDate.getTime() === yesterday.getTime()) {
        newStreak += 1; // Increment streak if the last completion was yesterday
      } else if (lastCompletionDate.getTime() < yesterday.getTime()) {
        newStreak = 1; // Reset streak if there was a gap
      }
    } else {
      newStreak = 1; // First task completion
    }
  
    // Update user data
    await updateDoc(userRef, {
      points: newPoints,
      streak: newStreak,
      lastCompletionDate: today.toISOString(),
    });
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

    // Normalize the course name for comparison
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
    <TouchableOpacity style={[styles.taskCard, isDarkMode && styles.darkTaskCard]} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
      <View style={[styles.taskCard, isDarkMode && styles.darkTaskCard]}>
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
          <Text style={[styles.taskDescription, isDarkMode && styles.darkText]}>
            {item.description ? (item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description) : "No description"}
          </Text>
          <Text style={[styles.taskInfo, isDarkMode && styles.darkText]}>
            Priority: <Text style={[item.priority === "High" && styles.highPriorityText, isDarkMode && styles.darkHighPriorityText]}>{item.priority}</Text> | Deadline: {new Date(item.deadline).toLocaleDateString()}
          </Text>
          {item.reminder && (
            <Text style={[styles.reminderIndicator, isDarkMode && styles.darkText]}>
              Reminder: {new Date(item.reminder).toLocaleTimeString()}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("TaskCreation", { task: item })}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF5252" />
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkTaskCard: {
    backgroundColor: '#2C2C2C',
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
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  taskInfo: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  highPriorityText: {
    color: "#FF5252",
    fontWeight: "bold",
  },
  darkHighPriorityText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  reminderIndicator: {
    fontSize: 12,
    color: "#2196F3",
    marginTop: 4,
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