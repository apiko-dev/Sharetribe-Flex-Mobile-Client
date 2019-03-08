import { AsyncStorage } from 'react-native';

const generateKey = (clientId, namespace) =>
  `${namespace}-${clientId}-token`;

const createStore = ({ clientId }) => {
  const namespace = 'st';
  const key = generateKey(clientId, namespace);

  const getToken = async () =>
    JSON.parse(await AsyncStorage.getItem(key));

  const setToken = async (tokenData) =>
    AsyncStorage.setItem(key, JSON.stringify(tokenData));

  const removeToken = () => AsyncStorage.removeItem(key);

  return {
    getToken,
    setToken,
    removeToken,
  };
};

export default createStore;
