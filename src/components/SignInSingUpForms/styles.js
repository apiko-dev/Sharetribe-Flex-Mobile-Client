import { StyleSheet } from 'react-native';
import { fontSizes, colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.signInSingUpForm.backgroundColor,
    paddingHorizontal: 20,
  },
  heading: {
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: fontSizes.signInSignUp.heading,
    color: colors.signInSingUpForm.heading,
  },
  smallFontSize: {
    fontSize: fontSizes.signInSignUp.textSmall,
  },
  text: {
    fontSize: fontSizes.signInSignUp.text,
    textAlign: 'center',
    color: colors.signInSingUpForm.textGray,
  },
  textWithTouchableContainer: {
    flexDirection: 'row',
  },
  bottom: {
    marginTop: 12,
    marginBottom: 22,
  },
  signInInputContainerEmail: {
    marginBottom: 32,
  },
  signInInputContainerPassword: {
    marginBottom: 12,
  },
  signInButtonContainer: {
    marginVertical: 24,
  },
  signUpInputContainerEmail: {
    marginBottom: 20,
  },
  signUpInputContainerPassword: {
    marginBottom: 12,
  },
  signUpInputContainerFirstAndLastNames: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  signUpInputContainer: {
    flex: 1,
  },
  singUpInputLeft: {
    marginRight: 20,
  },
  signUpButtonContainer: {
    marginVertical: 16,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
