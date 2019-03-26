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

export default compose(
  inject((stores) => ({
    isAuthorized: stores.auth.isAuthorized,
    logout: stores.auth.logout,
    user: stores.viewer.user,
  })),

  withState('items', 'setItems', []),

  withHandlers({
    logout: (props) => () =>
      AlertService.logOut(() => props.logout.run()),
    goToLogin: () => () => NavigationService.navigateToAuth(),
    goToAddNewItem: () => () =>
      NavigationService.navigateTo(screens.AddNewItem),
  }),

  withPropsOnChange(['isAuthorized'], (props) => {
    const unauthorizedItems = [
      {
        screen: screens.Home,
        title: i18n.t('drawer.home'),
        iconName: 'homepage',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.help'),
        iconName: 'help-lifeguard-symbol',
      },
      {
        screen: screens.Auth,
        title: i18n.t('drawer.login'),
        iconName: 'baseline-exit_to_app-24px',
        onPress: () => props.goToLogin(),
      },
    ];

    const authorizedItems = [
      {
        screen: screens.Home,
        title: i18n.t('drawer.home'),
        iconName: 'homepage',
      },
      {
        screen: screens.MyListings,
        title: i18n.t('drawer.myListings'),
        iconName: 'list',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.inbox'),
        iconName: 'message-closed-envelope',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.rentals'),
        iconName: 'stats',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.settings'),
        iconName: 'settings',
      },
      {
        screen: screens.Home,
        title: i18n.t('drawer.help'),
        iconName: 'help-lifeguard-symbol',
      },
      {
        screen: 'LogOut',
        title: i18n.t('drawer.logOut'),
        iconName: 'baseline-exit_to_app-24px',
        onPress: () => props.logout(),
      },
    ];

    if (props.isAuthorized) {
      props.setItems(authorizedItems);
    } else {
      props.setItems(unauthorizedItems);
    }
  }),
)(DrawerView);
