import { colors } from '../styles';
import { HeaderBackButton } from '../components';

export const defaultNavigationOptions = {
  headerMode: 'screen',
  headerTintColor: colors.header.tintColor,
  headerStyle: {
    backgroundColor: colors.header.backgroundColor,
    elevation: 0,
  },
  headerLeft: HeaderBackButton,
};
