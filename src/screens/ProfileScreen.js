

import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../configs/firebaseConfig';
import { signOut, updateProfile } from 'firebase/auth';
import { navigationRef } from '../navigation/navigationRef'; 
import { fetchTasks } from '../services/firebaseService';
import { DarkModeContext } from '../contexts/DarkModeContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileDetails from '../components/ProfileDetails';
import ProfileSettings from '../components/ProfileSettings';
import ProfileStatistics from '../components/ProfileStatistics';
import useNotifications from '../hooks/useNotifications';
import { colors } from '../constants/theme';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [tasks, setTasks] = useState([]);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { notificationsEnabled, setNotificationsEnabled, saveNotifications } = useNotifications();

  useEffect(() => {
    setUser(auth.currentUser);
    setEditedName(auth.currentUser?.displayName || '');
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully!');
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      updateProfile(auth.currentUser, { displayName: editedName })
        .then(() => {
          setUser({ ...auth.currentUser, displayName: editedName });
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.darkSafeArea]}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={isDarkMode ? '#FFF' : '#FF5252'} />
        </TouchableOpacity>
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          editedName={editedName}
          setEditedName={setEditedName}
          onEditToggle={handleEditToggle}
          onPickImage={pickImage}
          isDarkMode={isDarkMode}
        />
        <ProfileDetails user={user} isDarkMode={isDarkMode} />
        <ProfileSettings
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={(value) => {
            setNotificationsEnabled(value);
            saveNotifications(value);
          }}
        />
        <ProfileStatistics tasks={tasks} isDarkMode={isDarkMode} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  darkSafeArea: {
    backgroundColor: colors.darkBackground,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default ProfileScreen;