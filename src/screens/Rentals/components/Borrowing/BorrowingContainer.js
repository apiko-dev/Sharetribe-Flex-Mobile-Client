import {
  compose,
  hoistStatics,
  withHandlers,
  lifecycle,
} from 'recompose';
import { inject } from 'mobx-react';
import BorrowingView from './BorrowingView';
import {} from '../../../../components';

export default hoistStatics(
  compose(
    inject(({ transaction }) => ({
      fetchOrderTransaction: transaction.fetchTransactions,
      fetchMoreTransactions: transaction.fetchMoreTransactions,
      transactions: transaction.list.asArray,
    })),
    withHandlers({
      fetchMoreTransactions: (props) => () => {
        props.fetchMoreTransactions.run({
          lastTransitions: ['transition/accept'],
          only: 'order',
        });
      },
    }),
    lifecycle({
      componentDidMount() {
        this.props.fetchOrderTransaction.run({
          lastTransitions: ['transition/accept'],
          only: 'order',
        });
      },
    }),
  ),
)(BorrowingView);
