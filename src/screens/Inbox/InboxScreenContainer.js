import { compose, hoistStatics } from 'recompose';

import { inject } from 'mobx-react/custom';
import InboxScreenView from './InboxScreenView';

export default hoistStatics(
  compose(
    inject((stores) => {
      return {
        transactions: stores.transaction.list.asArray,
      };
    }),
  ),
)(InboxScreenView);
