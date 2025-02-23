import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';

const TaskCreationScreen = ({ navigation }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('Medium');
    const [deadline, setDeadline] = useState(new Date());
    const [attachment, setAttachment] = useState(null);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (!result.cancelled) {
            setAttachment(result.uri);
        }
    };

    const createTask = () => {
        console.log({ taskName, description, category, priority, deadline, attachment });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Task Name" value={taskName} onChangeText={setTaskName} />
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
            <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Education" value="Education" />
            </Picker>
            <Picker selectedValue={priority} onValueChange={setPriority}>
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
            </Picker>
            <DateTimePicker value={deadline} mode="date" display="default" onChange={(event, selectedDate) => setDeadline(selectedDate || deadline)} />
            <TouchableOpacity style={styles.attachButton} onPress={pickDocument}>
                <Text>{attachment ? 'File Attached' : 'Attach File'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton} onPress={createTask}>
                <Text style={styles.createButtonText}>Create Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
    attachButton: { backgroundColor: '#ddd', padding: 10, marginTop: 10, borderRadius: 5, alignItems: 'center' },
    createButton: { backgroundColor: '#6200ee', padding: 15, alignItems: 'center', marginTop: 10, borderRadius: 8 },
    createButtonText: { color: 'white', fontSize: 16 }
});

export default TaskCreationScreen;
