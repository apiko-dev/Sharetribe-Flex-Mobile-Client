import { StyleSheet } from 'react-native';
import { fontSizes, colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.signInSingUpForm.backgroundColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginLeft: 16,
    marginRight: 16,
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
  },
  textWithTouchableContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
