import { compose, hoistStatics, withStateHandlers } from 'recompose';
import { LayoutAnimation } from 'react-native';

import ChatScreen from './ChatScreenView';

export default hoistStatics(
  compose(
    withStateHandlers(
      {
        isShowDetails: false,
      },
      {
        setShowDetails: (props) => () => ({
          // LayoutAnimation.easeInEaseOut();
          isShowDetails: !props.isShowDetails,
        }),
      },
    ),
  ),
)(ChatScreen);
