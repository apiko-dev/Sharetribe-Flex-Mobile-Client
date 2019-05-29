import { compose, hoistStatics } from 'recompose';
import { inject } from 'mobx-react';
import { withParamsToProps } from '../../utils/enhancers';
import RentalsScreenView from './RentalsScreenView';
import {} from '../../components';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    inject((stores) => ({})),
  ),
)(RentalsScreenView);
