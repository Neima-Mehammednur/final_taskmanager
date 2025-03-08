
import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Image,
} from 'react-native';
import * as Progress from 'react-native-progress';
import * as Location from 'expo-location';
import { useIsFocused, useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchTasks } from '../services/firebaseService';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../configs/firebaseConfig";
import { DarkModeContext } from '../contexts/DarkModeContext';

const DashboardScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState('');
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  const fetchData = async () => {
    fetchWeather();
    setGreetingAndQuote();
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to load tasks.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "User");
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchWeather = async () => {
    const API_KEY = 'e55be00f9ada24e30fcbd080a5078a6a';
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Please enable location services to get weather information.'
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      Alert.alert('Weather Error', 'Failed to load weather data.');
    }
  };

  const setGreetingAndQuote = () => {
    const hour = new Date().getHours();
    let greetingText = 'Good ';
    if (hour < 12) {
      greetingText += 'Morning';
    } else if (hour < 18) {
      greetingText += 'Afternoon';
    } else {
      greetingText += 'Evening';
    }
    setGreeting(greetingText);

    const quotes = [
      'The only way to do great work is to love what you do.',
      'Believe you can and you’re halfway there.',
      'The future belongs to those who believe in the beauty of their dreams.',
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const calculateProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return tasks.length > 0 ? completedTasks / tasks.length : 0;
  };

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter((task) => {
      if (task.deadline) {
        return task.deadline.split('T')[0] === today;
      }
      return false;
    });
  };

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return null;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    return <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />;
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greetingText, isDarkMode && styles.darkText]}>Good Afternoon, {userName}</Text>
          <Text style={[styles.quoteText, isDarkMode && styles.darkText]}>"{quote}"</Text>
        </View>

        {/* Progress Section */}
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
              color="#4CAF50"
              thickness={6}
            />
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Ionicons name="list-outline" size={24} color="#4CAF50" />
                <Text style={[styles.metricValue, isDarkMode && styles.darkText]}>{tasks.length}</Text>
                <Text style={[styles.metricLabel, isDarkMode && styles.darkText]}>Total Tasks</Text>
              </View>
              <View style={styles.metricItem}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
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

        {/* Weather Section */}
        {weatherData && weatherData.main && (
          <View style={[styles.weatherCard, isDarkMode && styles.darkCard]}>
            <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Weather in {weatherData.name}</Text>
            <View style={styles.weatherContent}>
              {getWeatherIcon(weatherData.weather[0].icon)}
              <Text style={[styles.weatherText, isDarkMode && styles.darkText]}>{weatherData.main.temp}°C</Text>
              <Text style={[styles.weatherDescription, isDarkMode && styles.darkText]}>{weatherData.weather[0].description}</Text>
            </View>
          </View>
        )}

        {/* Today's Tasks Section */}
        <View style={[styles.tasksCard, isDarkMode && styles.darkCard]}>
          <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Today's Tasks</Text>
          {getTodaysTasks().length > 0 ? (
            getTodaysTasks().map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskItem, isDarkMode && styles.darkTaskItem]}
                onPress={() => navigation.navigate('TaskDetail', { task: task })}
              >
                <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
                <View style={styles.taskDetails}>
                  <Text style={[styles.taskName, isDarkMode && styles.darkText]}>{task.name}</Text>
                  <Text style={[styles.taskDeadline, isDarkMode && styles.darkText]}>
                    Deadline: {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={[styles.noTasksText, isDarkMode && styles.darkText]}>No tasks for today. Enjoy your day!</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#FFF',
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#1E1E1E',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  progressContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 8,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  tasksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#333',
  },
  taskDeadline: {
    fontSize: 14,
    color: '#666',
  },
  noTasksText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
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
    color: '#333',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default DashboardScreen;

