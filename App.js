
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './src/configs/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { DarkModeProvider } from './src/contexts/DarkModeContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { navigationRef } from './src/navigation/navigationRef'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); 
    });

    return unsubscribe; 
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <DarkModeProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        {user ? (
          <BottomTabNavigator />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
