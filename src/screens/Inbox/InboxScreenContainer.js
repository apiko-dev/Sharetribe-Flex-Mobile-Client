import {
  compose,
  hoistStatics,
  lifecycle,
  withHandlers,
} from 'recompose';

import { inject } from 'mobx-react/custom';
import R from 'ramda';
import InboxScreenView from './InboxScreenView';

export default hoistStatics(
  compose(
    inject((stores) => {
      return {
        transactions: stores.transaction.list.asArray,
        transactionStore: stores.transaction,
        isLoading: stores.transaction.fetchTransactions.inProgress,
      };
    }),
    withHandlers({
      fetchMoreTransactions: (props) => () => {
        props.transactionStore.fetchMoreTransactions.run();
      },
    }),
    lifecycle({
      async componentDidMount() {
        await this.props.transactionStore.fetchTransactions.run();
      },
    }),
  ),
)(InboxScreenView);
