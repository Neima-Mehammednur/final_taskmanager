import React from 'react';
import { StatusBar } from 'expo-status-bar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <BottomTabNavigator />
    </>
  );
}
