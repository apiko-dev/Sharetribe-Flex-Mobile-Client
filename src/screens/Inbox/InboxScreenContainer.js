import { compose, hoistStatics } from 'recompose';

import InboxScreenView from './InboxScreenView';

export default hoistStatics(compose())(InboxScreenView);
