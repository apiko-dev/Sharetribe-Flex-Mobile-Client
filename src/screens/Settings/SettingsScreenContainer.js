import { compose, hoistStatics, withHandlers } from 'recompose';
import SettingsScreenView from './SettingsScreenView';

export default hoistStatics(
  compose(
    withHandlers({
      goToMyProfile: () => () => {
        // Navigate to my profile screen
      },
      resendVerificationEmail: () => () => {
        // Resend verification email
      },
    }),
  ),
)(SettingsScreenView);
