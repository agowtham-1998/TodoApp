import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const TaskItem = ({ task, onDelete, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.taskContainer}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
      <FontAwesome name="trash" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  taskContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskItem;
