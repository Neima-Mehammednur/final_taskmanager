import React, { useState, useEffect, useCallback, useContext} from 'react';
import { ScrollView, StyleSheet, SafeAreaView, RefreshControl, View, Text } from 'react-native';
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchTasks } from '../services/firebaseService';
import { auth } from '../configs/firebaseConfig';
import { DarkModeContext } from '../contexts/DarkModeContext';
import ProgressCard from '../components/ProgressCard';
import WeatherWidget from '../components/WeatherWidget';
import TaskListWidget from '../components/TaskListWidget';
import useWeather from '../hooks/useWeather';
import { colors } from '../constants/theme';

const DashboardScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState('');
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const { isDarkMode } = useContext(DarkModeContext);
  const { weatherData } = useWeather();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  const fetchData = async () => {
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
      setUserName(user.displayName || 'User');
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

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

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter((task) => {
      if (task.deadline) {
        return task.deadline.split('T')[0] === today;
      }
      return false;
    });
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greetingText, isDarkMode && styles.darkText]}>
            {greeting}, {userName}
          </Text>
          <Text style={[styles.quoteText, isDarkMode && styles.darkText]}>"{quote}"</Text>
        </View>

        {/* Progress Section */}
        <ProgressCard tasks={tasks} isDarkMode={isDarkMode} />

        {/* Weather Section */}
        <WeatherWidget weatherData={weatherData} isDarkMode={isDarkMode} />

        {/* Today's Tasks Section */}
        <TaskListWidget
          tasks={getTodaysTasks()}
          onTaskPress={(task) => navigation.navigate('TaskDetail', { task })}
          isDarkMode={isDarkMode}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground,
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
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.text,
    marginTop: 8,
  },
});

export default DashboardScreen;

