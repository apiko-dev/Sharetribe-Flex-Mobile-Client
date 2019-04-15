import {
  compose,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose';
import { inject } from 'mobx-react/native';
import DrawerView from './DrawerView';
import { AlertService, NavigationService } from '../../services';
import i18n from '../../i18n';
import screens from '../../navigation/screens';
import { withLoadingModal } from '../../utils/enhancers';

export default compose(
  inject((stores) => ({
    isAuthorized: stores.auth.isAuthorized,
    logout: stores.auth.logout,
    user: stores.viewer.user,
    isLogout: stores.auth.logout.inProgress,
  })),

  withState('items', 'setItems', []),

  withHandlers({
    logout: (props) => () =>
      AlertService.logOut(() => props.logout.run()),
    goToLogin: () => () => NavigationService.navigateToAuth(),
    goToAddNewItem: () => () =>
      NavigationService.navigateTo(screens.AddNewItem),
    goToProfile: () => (user) => {
      NavigationService.navigateToProfile({
        user,
        isDrawerButton: true,
      });
      NavigationService.closeDrawer();
    },
  }),

  withPropsOnChange(['isAuthorized'], (props) => {
    const unauthorizedItems = [
      {
        screen: screens.Home,
        title: i18n.t('drawer.home'),
        iconName: 'home',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.help'),
        iconName: 'help',
      },
      {
        screen: screens.Auth,
        title: i18n.t('drawer.login'),
        iconName: 'log-out',
        onPress: () => props.goToLogin(),
      },
    ];

    const authorizedItems = [
      {
        screen: screens.Home,
        title: i18n.t('drawer.home'),
        iconName: 'home',
      },
      {
        screen: screens.MyListings,
        title: i18n.t('drawer.myListings'),
        iconName: 'list',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.inbox'),
        iconName: 'message',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.rentals'),
        iconName: 'rentals',
      },
      {
        screen: screens.Settings,
        title: i18n.t('drawer.settings'),
        iconName: 'settings',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.help'),
        iconName: 'help',
      },
      {
        screen: 'LogOut',
        title: i18n.t('drawer.logOut'),
        iconName: 'log-out',
        onPress: () => props.logout(),
      },
    ];

    if (props.isAuthorized) {
      props.setItems(authorizedItems);
    } else {
      props.setItems(unauthorizedItems);
    }
  }),

  withLoadingModal((props) => props.isLogout),
)(DrawerView);
