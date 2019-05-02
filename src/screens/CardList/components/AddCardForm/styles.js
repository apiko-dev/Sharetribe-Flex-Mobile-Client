import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRight: {
    marginLeft: dimensions.indent,
  },
  button: {
    paddingHorizontal: dimensions.indent * 1.8,
  },
  buttons: {
    marginTop: dimensions.indent * 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
  },
  secondShadowContainer: {
    flex: 1,
    borderRadius: 10,
    marginLeft: 1,
    shadowColor: colors.authScreen.shadowColor,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: dimensions.indent * 1.1,
  },
  inputContainerCardDadeAndCVC: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLeft: {
    width: dimensions.indent * 6.9,
    marginRight: dimensions.indent,
  },
  inputRight: {
    width: dimensions.indent * 5.3,
  },
  formHeaderStyle: {
    marginTop: dimensions.indent,
    marginBottom: 0,
  },
});
