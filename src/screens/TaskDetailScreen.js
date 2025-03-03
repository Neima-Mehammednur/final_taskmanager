
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

// const TaskDetailScreen = ({ route, navigation }) => {
//   const { task } = route.params;

//   return (
//     <View style={styles.modalContainer}>
//       <ScrollView style={styles.modalContent}>
//         <LinearGradient colors={['#4CAF50', '#81C784']} style={styles.header}>
//           <Text style={styles.headerText}>{task.name}</Text>
//         </LinearGradient>

//         <View style={styles.detailContainer}>
//           <Text style={styles.detailLabel}>Description:</Text>
//           <Text style={styles.detailText}>{task.description}</Text>

//           <Text style={styles.detailLabel}>Course:</Text>
//           <Text style={styles.detailText}>{task.course}</Text>

//           <Text style={styles.detailLabel}>Priority:</Text>
//           <Text style={styles.detailText}>{task.priority}</Text>

//           <Text style={styles.detailLabel}>Deadline:</Text>
//           <Text style={styles.detailText}>{new Date(task.deadline).toLocaleString()}</Text>

//           {task.reminder && (
//             <>
//               <Text style={styles.detailLabel}>Reminder:</Text>
//               <Text style={styles.detailText}>{new Date(task.reminder).toLocaleString()}</Text>
//             </>
//           )}

//           <Text style={styles.detailLabel}>Notes:</Text>
//           <Text style={styles.detailText}>{task.notes || 'No notes'}</Text>

//           {task.attachments && task.attachments.length > 0 && (
//             <>
//               <Text style={styles.detailLabel}>Attachments:</Text>
//               {task.attachments.map((attachment, index) => (
//                 <Text key={index} style={styles.detailText}>
//                   {attachment.name}
//                 </Text>
//               ))}
//             </>
//           )}
//         </View>

//         <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="close-circle" size={32} color="#4CAF50" />
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end', // Align to bottom
//   },
//   modalContent: {
//     backgroundColor: '#F5F5F5',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     height: '60%', // Adjust height as needed
//     padding: 16,
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   detailContainer: {
//     marginTop: 20,
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 10,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 5,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
// });

// export default TaskDetailScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TaskDetailScreen = ({ route, navigation }) => {
    const { task } = route.params;

    return (
        <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>

                <Text style={styles.headerText}>Task Detail</Text>

                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <Ionicons name="reader-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Task Name:</Text>
                            <Text style={styles.detailText}>{task.name}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="reader-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Description:</Text>
                            <Text style={styles.detailText}>{task.description}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="book-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Course:</Text>
                            <Text style={styles.detailText}>{task.course}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="flag-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Priority:</Text>
                            <Text style={styles.detailText}>{task.priority}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="calendar-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Deadline:</Text>
                            <Text style={styles.detailText}>{new Date(task.deadline).toLocaleString()}</Text>
                        </View>
                    </View>

                    {task.reminder && (
                        <View style={styles.detailRow}>
                            <Ionicons name="notifications-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailLabel}>Reminder:</Text>
                                <Text style={styles.detailText}>{new Date(task.reminder).toLocaleString()}</Text>
                            </View>
                        </View>
                    )}


                    {task.attachments && task.attachments.length > 0 && (
                        <View style={styles.detailRow}>
                            <Ionicons name="attach-outline" size={24} color="#4CAF50" style={styles.detailIcon} />
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailLabel}>Attachments:</Text>
                                {task.attachments.map((attachment, index) => (
                                    <Text key={index} style={styles.detailText}>
                                        {attachment.name}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="close-circle" size={32} color="#4CAF50" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '60%',
        padding: 16,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    detailContainer: {
        marginTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15,
    },
    detailIcon: {
        marginRight: 10,
    },
    detailTextContainer: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default TaskDetailScreen;