
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

const ProfileDetails = ({ user, isDarkMode }) => {
  return (
    <View style={[styles.profileDetails, isDarkMode && styles.darkCard]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Account Details</Text>
      <View style={styles.detailRow}>
        <Ionicons name="person-outline" size={24} color={colors.primary} style={styles.detailIcon} />
        <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Name: {user?.displayName || 'Not set'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="mail-outline" size={24} color={colors.primary} style={styles.detailIcon} />
        <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Email: {user?.email || 'Not set'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileDetails: {
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
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default ProfileDetails;