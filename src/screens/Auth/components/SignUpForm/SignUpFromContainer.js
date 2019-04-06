import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import SignUpFormView from './SignUpFormView';
import { isValidEmail } from '../../../../utils/regExp';

export default compose(
  inject((stores) => ({
    auth: stores.auth,
    isSigningUp: stores.auth.registerUser.inProgress,
  })),

  withStateHandlers(
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
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
    signUp: (props) => () => {
      props.auth.registerUser.run({
        lastName: props.lastName,
        firstName: props.firstName,
        email: props.email,
        password: props.password,
      });
    },
  }),

  withPropsOnChange(
    ['email', 'password', 'firstName', 'lastName'],
    (props) => {
      props.onChange(
        'isValidFields',
        isValidEmail(props.email) &&
          props.password.trim().length >= 8 &&
          props.firstName.trim().length > 0 &&
          props.lastName.trim().length > 0,
      );
    },
  ),
)(SignUpFormView);
