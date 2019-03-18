import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainerEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default styles;
