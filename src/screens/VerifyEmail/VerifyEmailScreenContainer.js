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
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('token'),

    inject(({ viewer }) => ({
      isVerify: viewer.verifyEmail.inProgress,
      verifyEmail: viewer.verifyEmail,
    })),

    withStateHandlers(
      {
        isError: true,
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
      }) => async () => {
        try {
          setError(false);
          await verifyEmail.run(token);
        } catch (err) {
          setError(true);
        }
      },
    }),

    withHandlers({
      goToSettings: () => () =>
        NavigationService.navigateTo(screens.Settings),
    }),

    lifecycle({
      componentDidMount() {
        this.props.sendTokenToVerifyEmail();
      },
    }),

    branch((props) => props.isVerify, renderComponent(ScreenLoader)),
  ),
)(VerifyEmailScreen);
