import {
  compose,
  hoistStatics,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
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

    withHandlers({
      goToApp: () => () => NavigationService.navigateToApp(),
    }),

    lifecycle({
      componentDidMount() {
        this.props.verifyEmail.run(this.props.token);
      },
    }),

    branch((props) => props.isVerify, renderComponent(ScreenLoader)),
  ),
)(VerifyEmailScreen);
