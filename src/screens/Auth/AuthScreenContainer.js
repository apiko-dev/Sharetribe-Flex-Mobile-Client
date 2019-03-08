import {
  compose,
  hoistStatics,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import AuthScreenView from './AuthScreenView';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    inject('auth'),

    withStateHandlers(
      {
        tabIndex: 0,
        tabRoutes: [
          { key: 'signIn', title: 'Sign In' },
          { key: 'signUp', title: 'Sign Up' },
        ],
      },
      {
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
      },
    ),

    withHandlers({
      onSkip: () => () => NavigationService.navigateToAuthorizedApp(),
    }),
  ),
)(AuthScreenView);
