import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { getUserSession } from '../services/AsyncStorageService';  // Importing AsyncStorage service
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import AppButton from '../components/AppButton';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from AsyncStorage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userSession = await getUserSession();
        if (userSession) {
          // Get tasks from AsyncStorage
          const storedTasks = await AsyncStorage.getItem(`tasks_${userSession.uid}`);
          const tasksList = storedTasks ? JSON.parse(storedTasks) : [];
          setTasks(tasksList);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        Alert.alert('Error', 'Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Save task to AsyncStorage
  const handleAddTask = async (task) => {
    try {
      const userSession = await getUserSession();
      if (userSession) {
        // Retrieve existing tasks from AsyncStorage
        const storedTasks = await AsyncStorage.getItem(`tasks_${userSession.uid}`);
        const tasksList = storedTasks ? JSON.parse(storedTasks) : [];
        
        // Add new task
        tasksList.push({
          ...task,
          userId: userSession.uid,
          createdAt: new Date(),
        });

        // Save updated tasks back to AsyncStorage
        await AsyncStorage.setItem(`tasks_${userSession.uid}`, JSON.stringify(tasksList));
        
        Alert.alert('Success', 'Task added successfully');
        setTasks(tasksList);  // Update state with new tasks
      }
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  // Delete task from AsyncStorage
  const handleDeleteTask = async (taskId) => {
    try {
      const userSession = await getUserSession();
      if (userSession) {
        // Retrieve existing tasks from AsyncStorage
        const storedTasks = await AsyncStorage.getItem(`tasks_${userSession.uid}`);
        const tasksList = storedTasks ? JSON.parse(storedTasks) : [];
        
        // Filter out the task to delete
        const updatedTasks = tasksList.filter(task => task.id !== taskId);

        // Save updated tasks to AsyncStorage
        await AsyncStorage.setItem(`tasks_${userSession.uid}`, JSON.stringify(updatedTasks));
        
        setTasks(updatedTasks);  // Update state with deleted task removed
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="Add Task"
        onPress={() => navigation.navigate('TaskDetails', { onSave: handleAddTask })}
        style={styles.addButton}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => handleDeleteTask(item.id)}
              onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No tasks found. Add your first task!</Text>
      )}
      <AppButton title="Logout" onPress={handleLogout} style={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  addButton: {
    marginBottom: 16,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888888',
    fontSize: 16,
  },
});

export default HomeScreen;
