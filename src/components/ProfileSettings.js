
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

const ProfileSettings = ({
  isDarkMode,
  toggleDarkMode,
  notificationsEnabled,
  onToggleNotifications,
}) => {
  return (
    <View style={[styles.profileSettings, isDarkMode && styles.darkCard]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Settings</Text>
      <View style={styles.settingItem}>
        <Ionicons name="moon-outline" size={24} color={colors.primary} style={styles.detailIcon} />
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81C784' }}
          thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <View style={styles.settingItem}>
        <Ionicons name="notifications-outline" size={24} color={colors.primary} style={styles.detailIcon} />
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81C784' }}
          thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggleNotifications}
          value={notificationsEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSettings: {
    width: '100%',
    backgroundColor: colors.background,
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
    backgroundColor: colors.darkBackground,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
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
    color: colors.text,
    flex: 1,
    marginLeft: 10,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default ProfileSettings;