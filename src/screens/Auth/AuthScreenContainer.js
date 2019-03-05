import {
  compose,
  withHandlers,
  hoistStatics,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import { Keyboard } from 'react-native';
import { inject } from 'mobx-react';
import AuthScreenView from './AuthScreenView';

export default hoistStatics(
  compose(
    inject('auth'),
    withStateHandlers(
      {
        tabIndex: 0,
        tabRoutes: [
          { key: 'signIn', title: 'Sign In' },
          { key: 'signUp', title: 'Sign Up' },
        ],
      },
      {
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
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
      keyboardDidShowHandler: () => () => {},
      keyboardDidHideHandler: () => () => {},
    }),
    lifecycle({
      componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          this.props.keyboardDidShowHandler,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          this.props.keyboardDidHideHandler,
        );
      },
    }),
  ),
)(AuthScreenView);
