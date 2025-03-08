
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../configs/firebaseConfig';
import { signOut, updateProfile } from 'firebase/auth';
import { StackActions } from '@react-navigation/native';
import { navigationRef } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import { fetchTasks } from '../services/firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeContext } from '../contexts/DarkModeContext';
import * as Notifications from 'expo-notifications';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    setUser(auth.currentUser);
    setEditedName(auth.currentUser?.displayName || '');
    loadNotifications();
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

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to enable notifications for this feature.');
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

  const calculateTaskStatistics = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const activeTasks = tasks.length - completedTasks;
    return { completedTasks, activeTasks };
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.darkSafeArea]}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={isDarkMode ? '#FFF' : '#FF5252'} />
        </TouchableOpacity>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../assets/user-image.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="camera-outline" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[styles.userNameInput, isDarkMode && styles.darkText]}
              value={editedName}
              onChangeText={setEditedName}
            />
          ) : (
            <Text style={[styles.userName, isDarkMode && styles.darkText]}>{user?.displayName || 'User Name'}</Text>
          )}
          <Text style={[styles.userEmail, isDarkMode && styles.darkText]}>{user?.email || 'user@email.com'}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
            <Text style={[styles.editText, isDarkMode && styles.darkText]}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.profileDetails, isDarkMode && styles.darkCard]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Account Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Name: {user?.displayName || 'Not set'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Email: {user?.email || 'Not set'}</Text>
          </View>
        </View>

        <View style={[styles.profileSettings, isDarkMode && styles.darkCard]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Settings</Text>
          <View style={styles.settingItem}>
            <Ionicons name="moon-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
            <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={isDarkMode ? '#4CAF50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
          <View style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
            <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => {
                setNotificationsEnabled(value);
                saveNotifications(value);
              }}
              value={notificationsEnabled}
            />
          </View>
        </View>

        <View style={[styles.profileStatistics, isDarkMode && styles.darkCard]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Task Statistics</Text>
          <View style={styles.statisticsRow}>
            <View style={styles.statisticItem}>
              <Text style={[styles.statisticNumber, isDarkMode && styles.darkText]}>
                {calculateTaskStatistics().completedTasks}
              </Text>
              <Text style={[styles.statisticLabel, isDarkMode && styles.darkText]}>Completed</Text>
            </View>
            <View style={styles.statisticItem}>
              <Text style={[styles.statisticNumber, isDarkMode && styles.darkText]}>
                {calculateTaskStatistics().activeTasks}
              </Text>
              <Text style={[styles.statisticLabel, isDarkMode && styles.darkText]}>Active</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkSafeArea: {
    backgroundColor: '#121212',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  userNameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  profileDetails: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  profileSettings: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  profileStatistics: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statisticItem: {
    alignItems: 'center',
  },
  statisticNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statisticLabel: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFF',
  },
});

export default ProfileScreen;