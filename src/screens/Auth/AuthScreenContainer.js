import { compose, withHandlers, hoistStatics } from 'recompose';
import { inject } from 'mobx-react';
import AuthScreenView from './AuthScreenView';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    inject('store'),
    withHandlers({
      singIn: (props) => () => {
        props.store.Auth.singIn({
          id: '1234a',
          lastName: 'Last name of user',
          firstName: 'Apiko Flex',
          email: 'email@apiko.com',
        });
        props.navigation.navigate(screens.AuthorizedApp);
      },
    }),
  ),
)(AuthScreenView);
