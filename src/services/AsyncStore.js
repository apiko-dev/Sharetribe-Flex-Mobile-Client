import { AsyncStorage } from 'react-native';

const generateKey = (clientId, namespace) =>
  `${namespace}-${clientId}-token`;

const createStore = ({ clientId }) => {
  const namespace = 'st';
  const key = generateKey(clientId, namespace);

  const getToken = async () => {
    const token = await AsyncStorage.getItem(key);
    return token;
  };

  const setToken = (tokenData) => {
    AsyncStorage.setItem(key, tokenData);
  };
  const removeToken = () => {
    AsyncStorage.removeItem(key);
  };
  console.log(getToken());

  return {
    getToken,
    setToken,
    removeToken,
  };
};

export default createStore;
