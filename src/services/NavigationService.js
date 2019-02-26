class NavigationService {
  navigation = null;

  init(ref) {
    this._ref = ref;
    this.navigation = this._ref._navigation;
  }

  navigate(screen, params) {
    const route = typeof params !== 'object'
      ? screen
      : { routeName: screen, params };

    this.navigation.navigate(route);
  }
}

export default new NavigationService();