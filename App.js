
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

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe; 
  }, []);

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