import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeaderContainer: {
    height: dimensions.smallIndent * 3.5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  containerTabView: {
    flex: 1,
  },

  containerTabStyle: {
    flex: 1,
    backgroundColor: colors.rentalsTab.activeColor,
    borderTopWidth: 0,
    borderColor: colors.rentalsTab.activeColor,
  },

  tabHeader: {
    flex: 1,
    justifyContent: 'center',
  },

  activeTabStyle: {
    backgroundColor: colors.rentalsTab.backgroundColor,
    borderBottomWidth: 3 * StyleSheet.hairlineWidth,
    borderColor: colors.rentalsTab.white,

    padding: 0,
  },
  inactiveTabStyle: {
    backgroundColor: colors.rentalsTab.backgroundColor,
    padding: 0,
  },
  inactiveTextStyle: {
    color: colors.rentalsTab.text,
    opacity: 0.7,
    fontSize: 16,
  },
  activeTextStyle: {
    color: colors.rentalsTab.text,
    opacity: 1,
  },
});
