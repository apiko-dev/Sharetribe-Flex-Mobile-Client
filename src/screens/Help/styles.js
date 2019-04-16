import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.helpScreen.backgroundColor,
  },
  headerContainer: {
    padding: dimensions.indent,
    justifyContent: 'center',
    paddingHorizontal: dimensions.indent,
    alignItems: 'center',
  },
  headerText: {
    marginTop: dimensions.indent,
    width: '90%',
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    padding: dimensions.indent,
  },
});

export default styles;
