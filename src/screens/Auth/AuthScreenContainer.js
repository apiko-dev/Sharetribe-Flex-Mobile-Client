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
  ),
)(AuthScreenView);
