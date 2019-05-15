import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  modal: {
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: dimensions.indent,
  },
  container: {
    height: dimensions.indent * 22,
    backgroundColor: colors.requestToRentModal.backgroundColor,
    paddingHorizontal: dimensions.indent,
    borderRadius: dimensions.borderRadius,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: dimensions.indent * 0.8,
    marginBottom: dimensions.indent,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent,
    zIndex: 1,
  },
  button: {
    marginTop: dimensions.indent * 1.8,
    marginBottom: dimensions.indent,
    paddingHorizontal: dimensions.indent * 2,
  },
  buttonContainer: {
    marginBottom: dimensions.indent * 3.1,
  },
  buttonResultContainer: {
    marginTop: dimensions.indent * 3.1,
    marginLeft: dimensions.indent * 1.5,
    marginRight: dimensions.indent * 1.5,
  },
  alignCenter: {
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    marginTop: dimensions.indent * 3,
    marginBottom: dimensions.indent * 0.8,
  },
});
