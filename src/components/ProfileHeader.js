
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../constants/theme';

const ProfileHeader = ({ user, isEditing, editedName, setEditedName, onEditToggle, onPickImage, isDarkMode }) => {
  return (
    <View style={styles.profileHeader}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={onPickImage}>
        <Image
          source={user?.photoURL ? { uri: user.photoURL } : require('../assets/user-image.jpg')}
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
      <TouchableOpacity style={styles.editButton} onPress={onEditToggle}>
        <Text style={[styles.editText, isDarkMode && styles.darkText]}>{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  userNameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  userEmail: {
    fontSize: 16,
    color: colors.text,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  darkText: {
    color: colors.darkText,
  },
});

export default ProfileHeader;