import { compose, withHandlers } from 'recompose';
import { inject } from 'mobx-react';
import MapView from './MapView';

export default compose(
  inject((stores) => ({ ...stores })),

  withHandlers({
    singOut: (props) => () => {
      props.auth.logout.run();
    },
  }),
)(MapView);
