import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.indent,
  },
  view: {
    backgroundColor: colors.button.backgroundColor,
    borderColor: colors.button.borderColor,
    borderWidth: 1,
    height: dimensions.indent * 8,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: dimensions.indent * 1.3,
  },
  notSelected: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 1,
    borderColor: colors.cardItem.iconCheckBorder,
  },
  formContainerStyle: {
    marginTop: 0,
    marginBottom: 0,
  },
  formHeaderStyle: {
    marginTop: dimensions.indent,
    marginBottom: 0,
  },
  containerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  cardExpiration: {
    marginTop: dimensions.indent * 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  validThru: {
    marginRight: 3,
  },
});
