import { compose, withHandlers, hoistStatics } from 'recompose';
import { inject } from 'mobx-react';
import AuthScreenView from './AuthScreenView';

export default hoistStatics(
  compose(
    inject('auth'),
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
  ),
)(AuthScreenView);
