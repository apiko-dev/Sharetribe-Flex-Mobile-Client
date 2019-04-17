import { compose, hoistStatics } from 'recompose';

import ChatScreen from './ChatScreenView';

export default hoistStatics(compose())(ChatScreen);
