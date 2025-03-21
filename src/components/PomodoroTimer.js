
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme';
import * as Notifications from 'expo-notifications';
import { DarkModeContext } from '../contexts/DarkModeContext'; 

// Notification handler setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  const { isDarkMode } = useContext(DarkModeContext);

  // Timer logic
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isWorkTime) {
              setMinutes(5);
              setIsWorkTime(false);
              sendNotification('Break Time!', 'Take a 5-minute break.');
            } else {
              setMinutes(25);
              setIsWorkTime(true);
              sendNotification('Work Time!', 'Time to focus for 25 minutes.');
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isWorkTime]);

  
  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null,
    });
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer to initial state
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsWorkTime(true);
  };

  
  const dynamicStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? colors.darkBackground : colors.background,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    },
    timerText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDarkMode ? colors.darkText : colors.text,
    },
    modeText: {
      fontSize: 18,
      color: isDarkMode ? colors.darkText : colors.text,
      marginTop: 10,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.timerText}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
      <Text style={dynamicStyles.modeText}>
        {isWorkTime ? 'Work Time' : 'Break Time'}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleTimer} style={dynamicStyles.button}>
          <Text style={dynamicStyles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={dynamicStyles.button}>
          <Text style={dynamicStyles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default PomodoroTimer;