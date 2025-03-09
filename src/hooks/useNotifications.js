
import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const useNotifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to enable notifications for this feature.');
      return false;
    }
    return true;
  };

  const saveNotifications = async (enabled) => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', enabled.toString());

      if (enabled) {
        const permissionGranted = await requestNotificationPermissions();
        if (permissionGranted) {
          await Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            }),
          });
        }
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const enabled = await AsyncStorage.getItem('notificationsEnabled');
      if (enabled !== null) {
        setNotificationsEnabled(enabled === 'true');
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return { notificationsEnabled, setNotificationsEnabled, saveNotifications };
};

export default useNotifications;