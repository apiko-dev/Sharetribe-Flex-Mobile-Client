import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  tabBar: {
    zIndex: 1,
    paddingHorizontal: dimensions.indent,
    flexDirection: 'row',
    backgroundColor: colors.homeScreen.tabBar,
    height: dimensions.indent * 2.8,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  switch: {
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.switch.borderColor,
    width: dimensions.indent * 4,
    height: dimensions.indent * 2,
    borderRadius: (dimensions.indent * 2) / 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.indent * 2,
    width: dimensions.indent * 2,
  },
  activeTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.indent * 2.1,
    width: dimensions.indent * 2.1,
    borderRadius: (dimensions.indent * 2.1) / 2,
    backgroundColor: colors.switch.activeBackgroundColor,
  },
});
