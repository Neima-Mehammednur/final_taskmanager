import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Button,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter
  const [isWriting, setIsWriting] = useState(false); // Toggle write mode
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'General', attachments: [] });
  const [showCategoryModal, setShowCategoryModal] = useState(false); // Toggle category dropdown
  const [showAttachmentModal, setShowAttachmentModal] = useState(false); // Toggle attachment modal
  const [newAttachment, setNewAttachment] = useState({ type: '', uri: '', name: '', description: '' });

  // Fetch notes from AsyncStorage on screen load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSaveNote = async () => {
    if (!newNote.title || !newNote.content) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      attachments: newNote.attachments, // Include attachments in the note
    };

    try {
      const updatedNotes = [...notes, note];
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setIsWriting(false);
      setNewNote({ title: '', content: '', category: 'General', attachments: [] }); // Reset form
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleDeleteAttachment = (noteId, attachmentIndex) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        note.attachments.splice(attachmentIndex, 1); // Remove the attachment
      }
      return note;
    });
    setNotes(updatedNotes);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save changes
  };

  const handleViewNote = (note) => {
    Alert.alert(note.title, note.content);
  };

  // Handle file or image upload
  const handleUpload = async () => {
    setShowAttachmentModal(true);
  };

  // Handle file selection
  const handleUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
      });

      if (result.type === 'success') {
        setNewAttachment({ ...newAttachment, type: 'file', uri: result.uri, name: result.name });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Handle image selection
  const handleUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setNewAttachment({ ...newAttachment, type: 'image', uri: result.uri });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Save attachment with name and description
  const handleSaveAttachment = () => {
    if (!newAttachment.name || !newAttachment.description) {
      Alert.alert('Error', 'Please provide a name and description for the attachment');
      return;
    }

    const updatedAttachments = [...newNote.attachments, newAttachment];
    setNewNote({ ...newNote, attachments: updatedAttachments }); // Update newNote with the attachment
    setNewAttachment({ type: '', uri: '', name: '', description: '' }); // Reset attachment form
    setShowAttachmentModal(false);
  };

  // Filter notes based on the selected category
  const filteredNotes = filter === 'All' ? notes : notes.filter((note) => note.category === filter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Notes</Text>
      </View>

      {/* Upload and Write Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleUpload}>
          <Text style={styles.actionButtonText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setIsWriting(true)}>
          <Text style={styles.actionButtonText}>Write</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
          onPress={() => setFilter('All')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Science' && styles.activeFilter]}
          onPress={() => setFilter('Science')}
        >
          <Text style={styles.filterText}>Science</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Math' && styles.activeFilter]}
          onPress={() => setFilter('Math')}
        >
          <Text style={styles.filterText}>Math</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'General' && styles.activeFilter]}
          onPress={() => setFilter('General')}
        >
          <Text style={styles.filterText}>General</Text>
        </TouchableOpacity>
      </View>

      {/* Write Note Form */}
      {isWriting && (
        <View style={styles.writeNoteContainer}>
          <TextInput
            style={styles.input}
            placeholder="Note Title"
            value={newNote.title}
            onChangeText={(text) => setNewNote({ ...newNote, title: text })}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Note Content"
            value={newNote.content}
            onChangeText={(text) => setNewNote({ ...newNote, content: text })}
            multiline
          />
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text>Category: {newNote.category}</Text>
          </TouchableOpacity>
          <Button title="Save Note" onPress={handleSaveNote} />
          <Button title="Cancel" onPress={() => setIsWriting(false)} color="red" />
        </View>
      )}

      {/* Attachment Modal */}
      <Modal visible={showAttachmentModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Attachment</Text>
            <TouchableOpacity style={styles.modalOption} onPress={handleUploadFile}>
              <Text>Upload File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleUploadImage}>
              <Text>Upload Image</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Attachment Name"
              value={newAttachment.name}
              onChangeText={(text) => setNewAttachment({ ...newAttachment, name: text })}
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Attachment Description"
              value={newAttachment.description}
              onChangeText={(text) => setNewAttachment({ ...newAttachment, description: text })}
              multiline
            />
            <Button title="Save Attachment" onPress={handleSaveAttachment} />
            <Button title="Cancel" onPress={() => setShowAttachmentModal(false)} color="red" />
          </View>
        </View>
      </Modal>

      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <TouchableOpacity onPress={() => handleViewNote(item)}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteCategory}>{item.category}</Text>
              {item.attachments.map((attachment, index) => (
                <View key={index} style={styles.attachmentContainer}>
                  {attachment.type === 'image' ? (
                    <Image source={{ uri: attachment.uri }} style={styles.attachmentImage} />
                  ) : (
                    <Text style={styles.attachmentFile}>{attachment.name}</Text>
                  )}
                  <Text style={styles.attachmentDescription}>{attachment.description}</Text>
                  <TouchableOpacity onPress={() => handleDeleteAttachment(item.id, index)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#000',
  },
  writeNoteContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  multilineInput: {
    height: 100,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    padding: 8,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteCategory: {
    fontSize: 14,
    color: '#666',
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  attachmentImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  attachmentFile: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 8,
  },
  attachmentDescription: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
});

export default NotesScreen;