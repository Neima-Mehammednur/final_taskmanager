// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// // Screens
// import DashboardScreen from '../screens/DashboardScreen';
// import TaskListScreen from '../screens/TaskListScreen';
// import TaskCreationScreen from '../screens/TaskCreationScreen';
// import NotesScreen from '../screens/VoiceInputScreen';
// import CalendarScreen from '../screens/CalendarScreen';

// // Create Tab Navigator
// const Tab = createBottomTabNavigator();

// const CustomAddButton = ({ onPress }) => (
//   <TouchableOpacity style={styles.addButton} onPress={onPress}>
//     <Ionicons name="add" size={32} color="white" />
//   </TouchableOpacity>
// );

// const BottomTabNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: styles.tabBar,
//         }}
//       >
//         <Tab.Screen 
//           name="Dashboard" 
//           component={DashboardScreen} 
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="home-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen 
//           name="TaskList" 
//           component={TaskListScreen} 
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="list-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen 
//           name="TaskCreation" 
//           component={TaskCreationScreen} 
//           options={{
//             tabBarButton: (props) => <CustomAddButton {...props} />,
//           }}
//         />
//         <Tab.Screen 
//           name="VoiceOver" 
//           component={NotesScreen} 
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="document-text-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen 
//           name="Calendar" 
//           component={CalendarScreen} 
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="calendar-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#fff',
//     height: 70,
//     position: 'absolute',
//     left: 10,
//     right: 10,
//     borderRadius: 15,
//     elevation: 5,
//   },
//   addButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 8,
//     alignSelf: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
// });

// export default BottomTabNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import createNativeStackNavigator

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskCreationScreen from '../screens/TaskCreationScreen';
import NotesScreen from '../screens/VoiceInputScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen'; // Import TaskDetailScreen

// Create Tab and Stack Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomAddButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Ionicons name="add" size={32} color="white" />
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
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
        name="VoiceOver" 
        component={NotesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
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
