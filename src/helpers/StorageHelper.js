import AsyncStorage from '@react-native-community/async-storage';
const USER_TOKEN_KEY = 'USER_TOKEN_KEY';
const USER_ROLE_KEY = 'USER_ROLE_KEY';

export default class StorageHelpers {
  static setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${key}:key`, `${value}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  static getData = async key => {
    try {
      const value = await AsyncStorage.getItem(`@${key}:key`);
      if (value !== null) {
        return value;
      }
      return '';
    } catch (error) {
      return '';
    }
  };

  static setToken = value => StorageHelpers.setData(USER_TOKEN_KEY, value);

  static getToken = () => StorageHelpers.getData(USER_TOKEN_KEY);

  static setRole = value => StorageHelpers.setData(USER_ROLE_KEY, value);

  static getRole = () => StorageHelpers.getData(USER_ROLE_KEY);
}
