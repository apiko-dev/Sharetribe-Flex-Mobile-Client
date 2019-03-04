import { compose, hoistStatics, withHandlers } from 'recompose';
import { inject } from 'mobx-react';
import HomeScreenComponent from './HomeScreenView';

export default hoistStatics(
  compose(
    inject((stores) => ({
      user: stores.viewer.user,
      auth: stores.auth,
    })),
    withHandlers({
      singOut: (props) => () => {
        props.auth.logout();
      },
    }),
  ),
)(HomeScreenComponent);
