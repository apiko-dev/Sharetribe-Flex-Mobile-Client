import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.productScreen.black,
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },

  paginationContainerStyle: {
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 0,
    backgroundColor: colors.switch.activeIcon,
  },
});

export default styles;
