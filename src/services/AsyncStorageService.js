import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserSession = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user session', e);
  }
};

export const getUserSession = async () => {
  try {
    const userSession = await AsyncStorage.getItem('user');
    return userSession != null ? JSON.parse(userSession) : null;
  } catch (e) {
    console.error('Failed to fetch user session', e);
  }
};

export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.error('Failed to clear user session', e);
  }
};
