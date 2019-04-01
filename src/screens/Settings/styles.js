import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.homeScreen.backgroundColor,
  },
  tabView: {
    flex: 1,
    width: '100%',
  },
});
