import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import { inject } from 'mobx-react';
import { withParamsToProps } from '../../utils/enhancers';
import RentalsScreenView from './RentalsScreenView';
import {} from '../../components';

const filterTransactions = (value, bool) => {
  return value.list.asArray.filter(
    (i) =>
      i.isViewer === bool && i.lastTransition === 'transition/accept',
  );
};

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    inject(({ transaction }) => ({
      fetchTransactions: transaction.fetchTransactions,
      borrowingTransactions: filterTransactions(transaction, false),
      lendingTransactions: filterTransactions(transaction, true),
      totalSpend: transaction.countAmount,
      totalEarnings: transaction.countAmount,
    })),
    withStateHandlers(
      {
        tabIndex: 0,
      },
      {
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
      },
    ),
    lifecycle({
      async componentDidMount() {
        await this.props.fetchTransactions.run({
          lastTransitions: ['transition/accept'],
          perPage: 100,
          page: 1,
        });
      },
    }),
  ),
)(RentalsScreenView);
