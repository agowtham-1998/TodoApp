import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AppButton = ({
  title,
  onPress,
  mode = 'contained',
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      mode === 'text' && styles.textButton,
      disabled && styles.disabledButton,
      style,
    ]}
    onPress={!disabled ? onPress : null}
    accessibilityLabel={accessibilityLabel || title}
    activeOpacity={disabled ? 1 : 0.7}
  >
    <Text
      style={[
        styles.buttonText,
        mode === 'text' && styles.textButtonText,
        disabled && styles.disabledText,
        textStyle,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButtonText: {
    color: '#6200EE',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  disabledText: {
    color: '#A1A1A1',
  },
});

export default AppButton;
