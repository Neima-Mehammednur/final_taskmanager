
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

const AttachmentsSection = ({ attachments, onPickDocument, onRemoveAttachment, isDarkMode }) => {
  return (
    <View>
      <Text style={[styles.label, isDarkMode && styles.darkText]}>Attachments</Text>
      <View style={styles.attachmentsRow}>
        <TouchableOpacity
          style={[styles.attachmentButton, isDarkMode && styles.darkAttachmentButton]}
          onPress={onPickDocument}
        >
          <Ionicons name="attach" size={20} color={isDarkMode ? '#FFF' : '#333'} />
        </TouchableOpacity>
        <ScrollView horizontal style={styles.attachmentsContainer}>
          {attachments.map((attachment, index) => (
            <View
              key={index}
              style={[styles.attachmentItem, isDarkMode && styles.darkAttachmentItem]}
            >
              <Text style={[styles.attachmentName, isDarkMode && styles.darkText]}>
                {attachment.name}
              </Text>
              <TouchableOpacity onPress={() => onRemoveAttachment(index)}>
                <Ionicons name="close-circle" size={20} color="#FF6347" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.text,
  },
  darkText: {
    color: colors.darkText,
  },
  attachmentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  attachmentButton: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    marginRight: 10,
  },
  darkAttachmentButton: {
    backgroundColor: '#333',
  },
  attachmentsContainer: {
    flexDirection: 'row',
    maxHeight: 40,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: colors.background,
  },
  darkAttachmentItem: {
    backgroundColor: colors.darkBackground,
    borderColor: '#555',
  },
  attachmentName: {
    fontSize: 14,
    marginRight: 10,
    color: colors.text,
  },
});

export default AttachmentsSection;