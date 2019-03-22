import { Linking } from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import screens from '../navigation/screens';
import { isAndroid } from '../utils';

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

  navigateToApp(props) {
    this.navigate(screens.App, props);
  }

  navigateToAuth(props) {
    this.navigate(screens.Auth, props);
  }

  navigateToHome(props) {
    this.navigate(screens.Home, props);
  }

  navigateToUpdatePassword(props) {
    this.navigate(screens.UpdatePassword, props);
  }

  navigateToAddNewItem(props) {
    this.navigate(screens.AddNewItem, props);
  }

  navigateToCategory(props) {
    this.navigate(screens.Category, props);
  }

  goBack() {
    this.navigation.dispatch(NavigationActions.back());
  }

  openDrawer() {
    this.navigation.dispatch(DrawerActions.openDrawer());
  }

  closeDrawer() {
    this.navigation.dispatch(DrawerActions.closeDrawer());
  }

  navigateTo(screen, props) {
    this.navigate(screen, props);
  }

  navigateToProduct(props) {
    this.navigate(screens.Product, props);
  }

  initDeepLinking() {
    if (isAndroid()) {
      Linking.getInitialURL().then((url) => {
        this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', (e) =>
        this.handleOpenURL(e.url),
      );
    }
  }

  handleOpenURL(url) {
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('?')[0];

    if (routeName === 'update-password') {
      const token = route.match(/t=([^&]*)/)[1];
      const email = route.match(/e=([^&]*)/)[1].replace('%40', '@');

      this.navigateToUpdatePassword({ token, email });
    }
  }
}

export default new NavigationService();
