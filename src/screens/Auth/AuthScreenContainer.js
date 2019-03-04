import {
  compose,
  withHandlers,
  hoistStatics,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import AuthScreenView from './AuthScreenView';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    inject('auth'),
    withStateHandlers(
      {
        tabIndex: 0,
        tabRoutes: [
          { key: screens.TabViews.Auth.SingIn, title: 'Sign In' },
          { key: screens.TabViews.Auth.SingUp, title: 'Sign Up' },
        ],
      },
      {
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
      },
    ),
    withStateHandlers(
      {
        emailSignIn: '',
        passwordSignIn: '',
        emailSignUp: '',
        passwordSignUp: '',
        firstName: '',
        lastName: '',
        activeField: '',
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
    withPropsOnChange(
      [
        'emailSignIn',
        'passwordSignIn',
        'emailSignUp',
        'passwordSignUp',
        'firstName',
        'lastName',
      ],
      () => {},
    ),
  ),
)(AuthScreenView);
