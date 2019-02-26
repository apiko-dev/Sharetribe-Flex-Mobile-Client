import { compose, hoistStatics } from 'recompose';
import { inject } from 'mobx-react';
import HomeScreenComponent from './HomeScreenView';

export default hoistStatics(
  compose(
    inject('store'),
  ),
)(HomeScreenComponent);