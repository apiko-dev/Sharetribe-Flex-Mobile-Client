import { Linking } from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import screens from '../navigation/screens';
import { isAndroid } from '../utils';

class NavigationService {
  _navigation = null;

  init(navigation) {
    if (this._navigation) {
      return;
    }

    this._navigation = navigation;
  }

  navigate(screen, params) {
    const route = { routeName: screen, params };

    this._navigation.dispatch(NavigationActions.navigate(route));
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

  navigateToVerifyEmail(props) {
    this.navigate(screens.VerifyEmail, props);
  }

  navigateToAddNewItem(props) {
    this.navigate(screens.AddNewItem, props);
  }

  navigateToCategory(props) {
    this.navigate(screens.Category, props);
  }

  goBack() {
    this._navigation.dispatch(NavigationActions.back());
  }

  openDrawer() {
    this._navigation.dispatch(DrawerActions.openDrawer());
  }

  closeDrawer() {
    this._navigation.dispatch(DrawerActions.closeDrawer());
  }

  navigateTo(screen, props) {
    this.navigate(screen, props);
  }

  navigateToProduct(props) {
    this.navigate(screens.Product, props);
  }

  navigateToProfile(props) {
    this.navigate(screens.Profile, props);
  }

  navigateToHelp(props) {
    this.navigate(screens.Home, props);
  }

  navigateToChat(props) {
    this.navigate(screens.Chat, props);
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

    if (routeName === 'verify-email') {
      const token = route.match(/t=([^&]*)/)[1];

      this.navigateToVerifyEmail({ token });
    }
  }
}

export default new NavigationService();
