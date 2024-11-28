import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { getUserSession } from '../services/AsyncStorageService';
import AppButton from '../components/AppButton';
import { firestore } from '../services/firebaseConfig'; // Make sure this file correctly initializes Firebase

const TaskDetailsScreen = ({ route, navigation }) => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch task details if editing an existing task
  useEffect(() => {
    const { taskId } = route.params || {};
    if (taskId) {
      setIsEditing(true);
      fetchTaskDetails(taskId);
    }
  }, [route.params]);

  // Function to fetch task details
  const fetchTaskDetails = async (taskId) => {
    try {
      const doc = await firestore.collection('tasks').doc(taskId).get();
      if (doc.exists) {
        setTask(doc.data());
      } else {
        Alert.alert('Error', 'Task not found.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading task:', error);
      Alert.alert('Error', 'Failed to load task details.');
    }
  };

  // Handle save or update of task
  const handleSave = async () => {
    if (!task.title.trim()) {
      Alert.alert('Validation Error', 'Task title cannot be empty.');
      return;
    }

    if (!task.description.trim()) {
      Alert.alert('Validation Error', 'Task description cannot be empty.');
      return;
    }

    const userSession = await getUserSession();
    if (!userSession) {
      Alert.alert('Error', 'User session expired. Please log in again.');
      navigation.replace('Login');
      return;
    }

    try {
      if (isEditing) {
        await updateTask(userSession.uid);
      } else {
        await addNewTask(userSession.uid);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save task. Please try again.');
    }
  };

  // Function to update existing task
  const updateTask = async (userId) => {
    try {
      await firestore.collection('tasks').doc(route.params.taskId).update({
        title: task.title,
        description: task.description,
        updatedAt: firestore.FieldValue.serverTimestamp(), // Track update time
      });
      Alert.alert('Success', 'Task updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  // Function to add new task
  const addNewTask = async (userId) => {
    try {
      await firestore.collection('tasks').add({
        title: task.title,
        description: task.description,
        userId,
        createdAt: firestore.FieldValue.serverTimestamp(), // Use Firestore server timestamp
      });
      Alert.alert('Success', 'Task added successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Task Description"
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
        multiline
      />
      <AppButton
        title={isEditing ? 'Update Task' : 'Add Task'}
        onPress={handleSave}
        style={styles.saveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
  },
});

export default TaskDetailsScreen;
