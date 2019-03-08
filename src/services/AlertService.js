import { Alert } from 'react-native';
import i18n from '../i18n';

class AlertService {
  showAlert(title, subTitle, buttons, options) {
    Alert.alert(title, subTitle, buttons, options);
  }

  showAlertWithTimeout(title, subtitle, timeout) {
    setTimeout(() => this.showAlert(title, subtitle), timeout);
  }

  showErrorAlert(err) {
    this.showAlert('Oops', err, [{ text: 'Ok', style: 'cancel' }]);
  }

  showErrorAlertWithTimeout(err) {
    setTimeout(() => this.showErrorAlert(err), 700);
  }

  permissionDenied(title, subtitle, onCancel, onPress) {
    this.showAlert(
      title,
      subtitle,
      [
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
          onPress: onCancel,
        },
        { text: i18n.t('common.settings'), onPress },
      ],
      { cancelable: false },
    );
  }

  iosRestrictedPermission(title) {
    this.showAlert(
      title,
      i18n.t('permissions.iosRestrictedPermission'),
    );
  }

  showSignInError() {
    this.showAlert(
      i18n.t('alerts.signInError.title'),
      i18n.t('alerts.signInError.message'),
    );
  }

  showSignUpError() {
    this.showAlert(
      i18n.t('alerts.signUpError.title'),
      i18n.t('alerts.signUpError.message'),
    );
  }

  showSignOutError() {
    this.showAlert(
      i18n.t('alerts.signOutError.title'),
      i18n.t('alerts.signOutError.message'),
    );
  }
}

export default new AlertService();
