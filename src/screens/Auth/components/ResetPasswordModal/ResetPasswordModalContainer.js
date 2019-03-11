import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import ResetPasswordModal from './ResetPasswordModalView';
import { isValidEmail } from '../../../../utils/regExp';

export default compose(
  inject((stores) => ({
    auth: stores.auth,
    isLoading: stores.auth.resetPassword.inProgress,
    isError: stores.auth.resetPassword.isError,
  })),

  withStateHandlers(
    {
      email: '',
      activeField: '',
      isValidEmail: false,
      isSuccess: false,
    },
    {
      onChange: () => (field, value) => ({
        [field]: value,
      }),
    },
  ),

  withHandlers({
    onCloseModal: (props) => () => {
      props.onCloseModal();
      props.auth.resetPassword.cleanError();
      props.onChange('isSuccess', false);
      props.onChange('email', '');
    },

    resetPassword: (props) => async () => {
      await props.auth.resetPassword.run({
        email: props.email,
      });

      if (!props.isError) {
        props.onChange('isSuccess', true);
      }

      props.onChange('activeField', '');
    },
  }),

  withPropsOnChange(['email'], (props) => {
    props.onChange('isValidEmail', isValidEmail(props.email));
  }),
)(ResetPasswordModal);
