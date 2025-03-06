
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkModeContext } from '../contexts/DarkModeContext';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskCreationScreen from '../screens/TaskCreationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomAddButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Ionicons name="add" size={32} color="white" />
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, isDarkMode && styles.darkTabBar],
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="TaskList" 
        component={TaskListScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="TaskCreation" 
        component={TaskCreationScreen} 
        options={{
          tabBarButton: (props) => <CustomAddButton {...props} />,
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 70,
    position: 'absolute',
    left: 10,
    right: 10,
    borderRadius: 15,
    elevation: 5,
  },
  darkTabBar: {
    backgroundColor: '#1E1E1E',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default BottomTabNavigator;