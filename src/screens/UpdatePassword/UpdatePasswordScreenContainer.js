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
          password: props.newPassword,
        });
      },
    }),

    withPropsOnChange(['newPassword', 'replyPassword'], (props) => {
      props.onChange(
        'isValidFields',
        props.newPassword.trim().length > 8 &&
          props.newPassword === props.replyPassword,
      );
    }),
  ),
)(UpdatePasswordScreen);
