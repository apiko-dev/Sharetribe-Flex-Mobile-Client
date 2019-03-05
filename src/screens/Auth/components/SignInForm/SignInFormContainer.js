import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import SignInFormView from './SignInFormView';

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
    singIn: (props) => () => {
      props.auth.login({
        id: '1234a',
        lastName: 'Last name of user',
        firstName: 'Apiko Flex',
        email: 'email@apiko.com',
      });
    },
  }),
  withPropsOnChange(['email', 'password'], (props) => {
    const isValidFields =
      props.email.trim().includes('@') &&
      props.password.trim().length > 8;

    props.onChange('isValidFields', isValidFields);
  }),
)(SignInFormView);
