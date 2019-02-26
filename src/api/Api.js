import { AsyncStorage } from 'react-native';

export const setUser = async (user) => {
  try {
    await AsyncStorage.getItem('user', user);
  } catch (error) {
    console.log('ERROR: SET USER: ', error);
  }
};