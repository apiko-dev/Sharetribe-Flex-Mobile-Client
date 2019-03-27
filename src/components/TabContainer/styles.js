import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  show: {
    left: 0,
    right: 0,
  },
  hide: {
    left: 90000, // over the screen,
    right: -90000, // over the screen,
  },
});
