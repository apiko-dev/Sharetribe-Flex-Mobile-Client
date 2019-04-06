import {
  compose,
  hoistStatics,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
  withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import VerifyEmailScreen from './VerifyEmailScreenView';
import { ScreenLoader } from '../../components';
import { withParamsToProps } from '../../utils/enhancers';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withParamsToProps('token'),

    inject(({ viewer }) => ({
      isVerify: viewer.verifyEmail.inProgress,
      verifyEmail: viewer.verifyEmail,
    })),

    withStateHandlers(
      {
        isError: false,
      },
      {
        setError: () => (value) => ({
          isError: value,
        }),
      },
    ),

    withHandlers({
      sendTokenToVerifyEmail: ({
        verifyEmail,
        token,
        setError,
      }) => () => {
        try {
          setError(false);
          verifyEmail.run(token);
        } catch (err) {
          setError(true);
        }
      },
    }),

    withHandlers({
      goToApp: () => () => NavigationService.navigateToApp(),
      tryAgain: (props) => () => props.sendTokenToVerifyEmail(),
    }),

    lifecycle({
      componentDidMount() {
        this.props.sendTokenToVerifyEmail();
      },
    }),

    branch((props) => props.isVerify, renderComponent(ScreenLoader)),
  ),
)(VerifyEmailScreen);
