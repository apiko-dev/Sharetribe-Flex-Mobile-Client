import {
  compose,
  hoistStatics,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose';
import { inject } from 'mobx-react';
import SoftInputMode from 'react-native-set-soft-input-mode';
import AuthScreenView from './AuthScreenView';
import { NavigationService } from '../../services';

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
        SoftInputMode.set(SoftInputMode.ADJUST_PAN);
      },
      componentWillUnmount() {
        SoftInputMode.set(SoftInputMode.ADJUST_RESIZE);
      },
    }),
  ),
)(AuthScreenView);
