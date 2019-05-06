import {
  compose,
  hoistStatics,
  lifecycle,
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
      };
    }),
    lifecycle({
      async componentDidMount() {
        await this.props.transactionStore.fetchTransactions.run();
      },
    }),
  ),
)(InboxScreenView);
