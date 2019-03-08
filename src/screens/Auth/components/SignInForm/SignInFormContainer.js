import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import SignInFormView from './SignInFormView';
import { isValidEmail } from '../../../../utils/regExp';

export default compose(
  inject((stores) => ({
    auth: stores.auth,
    isSigningIn: stores.auth.loginUser.inProgress,
  })),

  withStateHandlers(
    {
      email: '',
      password: '',
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
    signIn: (props) => () => {
      props.auth.loginUser.run({
        email: props.email,
        password: props.password,
      });
    },
  }),

  withPropsOnChange(['email', 'password'], (props) => {
    props.onChange(
      'isValidFields',
      props.password.trim().length > 8 && isValidEmail(props.email),
    );
  }),
)(SignInFormView);
