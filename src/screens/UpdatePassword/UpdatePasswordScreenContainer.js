import {
  compose,
  hoistStatics,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import UpdatePasswordScreen from './UpdatePasswordScreenView';

export default hoistStatics(
  compose(
    inject((stores) => ({
      auth: stores.auth,
      isUpdating: stores.auth.updatePassword.inProgress,
    })),

    withStateHandlers(
      {
        newPassword: '',
        replyPassword: '',
        activeField: '',
        isValidFields: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      updatePassword: (props) => () => {
        props.auth.updatePassword.run({
          email: props.navigation.getParam('email'),
          token: props.navigation.getParam('token'),
          newPassword: props.newPassword,
        });
      },
    }),

    withPropsOnChange(['newPassword', 'replyPassword'], (props) => {
      props.onChange(
        'isValidFields',
        props.newPassword.trim().length >= 8 &&
          props.newPassword === props.replyPassword,
      );
    }),
  ),
)(UpdatePasswordScreen);
