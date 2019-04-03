import { compose, withHandlers } from 'recompose';
import { LayoutAnimation } from 'react-native';
import DescriptionTabView from './DescriptionTabView';

export default compose(
  withHandlers({
    onPress: (props) => () => {
      LayoutAnimation.easeInEaseOut();
      props.setVisible();
    },
  }),
)(DescriptionTabView);
