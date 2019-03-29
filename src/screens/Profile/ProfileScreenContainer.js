import { compose, hoistStatics } from 'recompose';
import { inject } from 'mobx-react';
import ProfileScreenView from './ProfileScreenView';

export default hoistStatics(
  compose(
    inject(({ viewer }) => ({
      user: viewer.user,
    })),
  ),
)(ProfileScreenView);
