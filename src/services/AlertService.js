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

  permissionAsk(title, subtitle, onCancel, onPress) {
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

  permissionError(title) {
    this.showAlert(title, i18n.t('permissions.error'));
  }

  iosRestrictedPermission(title) {
    this.showAlert(
      title,
      i18n.t('permissions.iosRestrictedPermission'),
    );
  }

  logOut(onPress) {
    this.showAlert(
      i18n.t('drawer.logOut'),
      i18n.t('common.areYouSure'),
      [
        { text: i18n.t('common.ok'), onPress },
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
      ],
    );
  }
}

export default new AlertService();
