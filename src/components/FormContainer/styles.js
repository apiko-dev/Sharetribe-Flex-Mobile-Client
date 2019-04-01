import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  formContainer: {
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    marginBottom: dimensions.indent * 0.5,
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  firstShadowContainer: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  secondShadowContainer: {
    borderRadius: 10,
    shadowColor: colors.authScreen.shadowColor,
    elevation: 3,
    paddingHorizontal: dimensions.indent,
    paddingTop: dimensions.indent * 1.5,
    paddingBottom: dimensions.indent * 1.5,
    backgroundColor: colors.formContainer.backgroundColor,
  },
  header: {
    marginTop: dimensions.indent * 0.7,
    marginBottom: dimensions.indent * 0.5,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
