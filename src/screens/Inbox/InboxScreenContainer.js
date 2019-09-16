import {
  compose,
  hoistStatics,
  lifecycle,
  withHandlers,
  withStateHandlers,
  branch,
  renderComponent,
} from 'recompose';

import { inject } from 'mobx-react/custom';
import InboxScreenView from './InboxScreenView';
import { ScreenLoader } from '../../components';

export default hoistStatics(
  compose(
    inject((stores) => {
      return {
        transactions: stores.transaction.list.asArray,
        transactionStore: stores.transaction,
        fetchTransactions: stores.transaction.fetchTransactions,
        isLoading: stores.transaction.fetchTransactions.inProgress,
      };
    }),
    withStateHandlers(
      {
        isRefreshing: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),
    withHandlers({
      fetchMoreTransactions: (props) => () => {
        props.transactionStore.fetchMoreTransactions.run();
      },
      firstFetchTransactions: (props) => async () => {
        props.onChange('isRefreshing', true);
        await props.fetchTransactions.run();
        props.onChange('isRefreshing', false);
      },
    }),
    lifecycle({
      async componentDidMount() {
        await this.props.transactionStore.fetchTransactions.run();
      },
    }),
    branch(
      (props) => !props.isRefreshing && props.isLoading,
      renderComponent(ScreenLoader),
    ),
  ),
)(InboxScreenView);
