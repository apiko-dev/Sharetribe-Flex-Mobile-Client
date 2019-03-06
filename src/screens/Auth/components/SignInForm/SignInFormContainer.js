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
  inject('auth'),

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
      props.auth.login({
        id: Math.random(),
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
