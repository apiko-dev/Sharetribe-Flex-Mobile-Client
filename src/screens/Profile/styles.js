import { StyleSheet, StatusBar } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: '100%',
    alignItems: 'center',
    paddingTop: dimensions.indent * 1.3,
  },
  userName: {
    margin: dimensions.indent * 0.8,
  },
  rating: {
    marginBottom: dimensions.indent * 0.8,
  },
  bio: {
    textAlign: 'center',
    paddingHorizontal: dimensions.indent,
    marginBottom: dimensions.indent * 0.8,
  },
  moreButton: {
    marginTop: dimensions.indent * 0.4,
    marginBottom: dimensions.indent * 0.4,
  },
  containerTabView: {
    marginTop: StatusBar.currentHeight,
  },
});
