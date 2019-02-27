import screens from '../navigation/screens';

class NavigationService {
  navigation = null;

  init(ref) {
    this._ref = ref;
    this.navigation = this._ref._navigation;
  }

  navigate(screen, params) {
    const route =
      typeof params !== 'object'
        ? screen
        : { routeName: screen, params };

    this.navigation.navigate(route);
  }

  navigateToUnauthorizedApp(props) {
    this.navigate(screens.UnauthorizedApp, props);
  }

  navigateToAuthorizedApp(props) {
    this.navigate(screens.AuthorizedApp, props);
  }
}

export default new NavigationService();
