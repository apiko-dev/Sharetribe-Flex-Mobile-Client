/* eslint-disable no-unused-expressions */
import {
  compose,
  hoistStatics,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose';
import { inject } from 'mobx-react';
import { Platform } from 'react-native';
import SoftInputMode from 'react-native-set-soft-input-mode';
import AuthScreenView from './AuthScreenView';
import { NavigationService } from '../../services';

const isAndroid = () => Platform.OS === 'android';

export default hoistStatics(
  compose(
    inject('auth'),

    withStateHandlers(
      {
        selectedTabIndex: 0,
      },
      {
        onChangeTabIndex: () => (index) => ({
          selectedTabIndex: index,
        }),
      },
    ),

    withHandlers({
      onSkip: () => () => NavigationService.navigateToApp(),
    }),
    lifecycle({
      componentDidMount() {
        isAndroid() && SoftInputMode.set(SoftInputMode.ADJUST_PAN);
      },
      componentWillUnmount() {
        isAndroid() && SoftInputMode.set(SoftInputMode.ADJUST_RESIZE);
      },
    }),
  ),
)(AuthScreenView);
