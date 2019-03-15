import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';
import pWaitFor from 'p-wait-for';
import i18n from '../i18n';
import { AlertService, AppStateService } from './index';
import { isAndroid } from '../utils/detectDevice';
import { PermissionDeniedError } from '../errors';
import delay from '../utils/delay';

class PermissionService {
  Location = 'location';

  Camera = 'camera';

  CameraRoll = 'photo';

  Notifications = 'notification';

  constructor() {
    this.permissionsTitles = {
      [this.Location]: i18n.t('permissions.titles.location'),
    };
  }

  /**
   * Ask for Location permission async
   *
   * @param {boolean} [waitForSet=false] wait for resolving permission
   * from settings
   * @returns Promise
   * @memberof PermissionService
   */
  getLocationPermission(waitForSet = true) {
    return this._askForPermission(
      this.Location,
      undefined,
      this._showDeniedAlert(
        i18n.t('permissions.titles.location'),
        i18n.t('permissions.location'),
      ),
      waitForSet,
    );
  }

  getCameraPermission(waitForSet = true) {
    return this._askForPermission(
      this.Camera,
      undefined,
      this._showDeniedAlert(
        i18n.t('permissions.titles.camera'),
        i18n.t('permissions.camera'),
      ),
      waitForSet,
    );
  }

  getCameraRollPermission(waitForSet = true) {
    return this._askForPermission(
      this.CameraRoll,
      undefined,
      this._showDeniedAlert(
        i18n.t('permissions.titles.cameraRoll'),
        i18n.t('permissions.cameraRoll'),
      ),
      waitForSet,
    );
  }

  getPushNotificationPermission(waitForSet = true) {
    return this._askForPermission(
      this.Notifications,
      undefined,
      this._showDeniedAlert(
        i18n.t('permissions.titles.notifications'),
        i18n.t('permissions.notifications'),
      ),
      waitForSet,
    );
  }

  /**
   * Asking for some permission.
   * Trying to get permission and if it not granted ask for it.
   * Then gonna show denied alerts and wait for user to set it via settings
   *
   * @param {any} permission Permission name (PermissionService.*)
   * @param {any} options permission options
   * @param {any} onDenied callback if user has denied permission
   * @param {any} waitForSet flag if we want to wait for user to set permission
   * in the settings
   * @returns Promise
   * @memberof PermissionService
   */
  async _askForPermission(permission, options, onDenied, waitForSet) {
    try {
      if (isAndroid() && permission === this.Notifications) {
        return true;
      }

      // trying to get exist permission
      let permissionResult = await Permissions.check(
        permission,
        options,
      );

      // check if permission hasn't been asked before
      // if never asked, show only native permission dialog
      if (permissionResult === 'undetermined') {
        permissionResult = await this._askPermissionNatively(
          permission,
        );

        // check if permission was denied
      } else if (permissionResult === 'denied') {
        // on android show native permission dialog
        if (isAndroid()) {
          permissionResult = await this._askPermissionNatively(
            permission,
          );
        } else {
          // on ios, if user has denied permission at least once,
          // user will not be prompted with native dialog again
          // show custom permission dialog if needed
          permissionResult = await this._askPermissionManually(
            permission,
            onDenied,
            waitForSet,
          );
        }
      } else if (permissionResult === 'restricted') {
        // on Android 'restricted' - means that the user has selected
        // 'Never ask me again' while denying permission
        // show custom permission dialog
        if (isAndroid()) {
          permissionResult = await this._askPermissionManually(
            permission,
            onDenied,
            waitForSet,
          );

          // on iOS 'restricted' - means user is not able to grant this permission,
          // either because it's not supported by the device or because
          // it has been blocked by parental controls
          // show restricted dialog
        } else {
          this._showIosRestrictedDialog(permission);
        }
      }

      return permissionResult === 'authorized';
    } catch (err) {
      throw new PermissionDeniedError(permission);
    }
  }

  async _askPermissionNatively(permission) {
    const permissionResult = await Permissions.request(permission);

    if (permissionResult !== 'authorized') {
      throw new PermissionDeniedError(permission);
    }

    return permissionResult;
  }

  async _askPermissionManually(permission, onDenied, waitForSet) {
    if (typeof onDenied !== 'undefined') {
      // if we gonna show denied alert – showing it
      await onDenied();

      // if we really need to user set the permission
      // before we gonna do some stuff
      // just waiting for user to set it in the settings
      if (waitForSet) {
        await this._waitForPermission();
      }

      // checking permission again
      const permissionResult = await Permissions.check(permission);

      // if user hasn't allow it via settings throw the error
      if (permissionResult !== 'authorized') {
        throw new PermissionDeniedError(permission);
      }

      return permissionResult;
    }

    return false;
  }

  _showDeniedAlert(title, subtitle) {
    return () =>
      new Promise((res, rej) => {
        const onPress = () => {
          // try to navigate to specific settings route
          if (!isAndroid() && Permissions.canOpenSettings()) {
            Permissions.openSettings();
          } else if (isAndroid()) {
            OpenAppSettings.open();
          }
          // and resolve the promise
          res();
        };

        const showAlert = () =>
          AlertService.permissionDenied(
            title,
            subtitle,
            rej,
            onPress,
          );

        setTimeout(showAlert, 100);
      });
  }

  _showIosRestrictedDialog(permission) {
    AlertService.iosRestrictedPermission(
      this.permissionsTitles[permission],
    );

    throw new PermissionDeniedError(permission);
  }

  /**
   * Waiting for user to set permission in the settings
   *
   * @memberof PermissionService
   */
  async _waitForPermission() {
    // waiting for the app to go background
    await delay(1000);
    // waiting for the app to go foreground (active)
    await pWaitFor(() => !AppStateService.isActive);
    // waiting a little bit for animation
    await delay(1000);
  }
}

const permissionService = new PermissionService();

export default permissionService;
