import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    borderRadius: 10,
    backgroundColor: colors.formContainer.backgroundColor,
  },
  firstShadowContainer: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.7,
  },
  secondShadowContainer: {
    flex: 1,
    borderRadius: 10,
    marginLeft: 1,
    marginBottom: 3,
    shadowColor: colors.authScreen.shadowColor,
    elevation: 3,
    paddingHorizontal: dimensions.indent,
  },
});
