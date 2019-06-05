import { compose, withHandlers, hoistStatics } from 'recompose';
import { LayoutAnimation } from 'react-native';
import DescriptionTabView from './DescriptionTabView';

export default hoistStatics(
  compose(
    withHandlers({
      onPress: (props) => () => {
        LayoutAnimation.easeInEaseOut();
        props.setVisible();
      },
    }),
  ),
)(DescriptionTabView);
