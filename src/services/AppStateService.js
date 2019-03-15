import { AppState } from 'react-native';

class AppStateService {
  get appCurrentState() { //eslint-disable-line
    return AppState.currentState;
  }

  get isActive() {
    return this.appCurrentState === 'active';
  }

  get isBackground() {
    return this.appCurrentState === 'background';
  }

  get isInactive() {
    return this.appCurrentState === 'inactive';
  }

  addChangeListener(handler) {
    AppState.addEventListener('change', handler);
  }

  removeChangeListener(handler) {
    AppState.removeEventListener('change', handler);
  }
}

const appStateService = new AppStateService();

export default appStateService;
