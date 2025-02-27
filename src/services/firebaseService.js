// import { db } from "./../../configs/firebaseConfig";
// import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// // Add a new task
// export const addTask = async (task) => {
//   try {
//     await addDoc(collection(db, "tasks"), task);
//   } catch (error) {
//     console.error("Error adding task:", error);
//   }
// };

// // Fetch all tasks
// export const fetchTasks = async () => {
//   try {
//     const snapshot = await getDocs(collection(db, "tasks"));
//     return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return [];
//   }
// };

// // Update a task
// export const updateTask = async (taskId, updatedTask) => {
//   try {
//     const taskRef = doc(db, "tasks", taskId);
//     await updateDoc(taskRef, updatedTask);
//   } catch (error) {
//     console.error("Error updating task:", error);
//   }
// };

// // Delete a task
// export const deleteTask = async (taskId) => {
//   try {
//     const taskRef = doc(db, "tasks", taskId);
//     await deleteDoc(taskRef);
//   } catch (error) {
//     console.error("Error deleting task:", error);
//   }
// };

import { db } from "./../../configs/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Add a new task
export const addTask = async (task) => {
  try {
    await addDoc(collection(db, "tasks"), task);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const snapshot = await getDocs(collection(db, "tasks"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Update a task
export const updateTask = async (taskId, updatedTask) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};