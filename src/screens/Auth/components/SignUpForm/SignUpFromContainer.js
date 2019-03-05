import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import SignUpFormView from './SignUpFormView';

export default compose(
  inject('auth'),

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
      props.auth.signUp({
        id: '1234a',
        lastName: 'Last name of user',
        firstName: 'Apiko Flex',
        email: 'email@apiko.com',
      });
    },
  }),
  withPropsOnChange(
    ['email', 'password', 'firstName', 'lastName'],
    (props) => {
      const isValidFields =
        props.email.trim().includes('@') &&
        props.password.trim().length > 8 &&
        props.firstName.trim().length > 0 &&
        props.lastName.trim().length > 0;

      props.onChange('isValidFields', isValidFields);
    },
  ),
)(SignUpFormView);
