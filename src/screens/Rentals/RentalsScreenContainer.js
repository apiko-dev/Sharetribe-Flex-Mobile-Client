import { compose, hoistStatics, withStateHandlers } from 'recompose';
import { inject } from 'mobx-react';
import { withParamsToProps } from '../../utils/enhancers';
import RentalsScreenView from './RentalsScreenView';
import {} from '../../components';

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    // inject((stores) => ({})),
    withStateHandlers(
      {
        tabIndex: 0,
      },
      {
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),
  ),
)(RentalsScreenView);
