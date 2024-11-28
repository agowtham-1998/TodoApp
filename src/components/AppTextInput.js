import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

const AppTextInput = ({ 
  label, 
  error, 
  style, 
  labelStyle, 
  errorStyle, 
  ...props 
}) => (
  <View style={styles.container}>
    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    <TextInput 
      {...props} 
      style={[styles.input, error && styles.errorInput, style]} 
      accessibilityLabel={label || 'Input Field'}
    />
    {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

export default AppTextInput;
