import { compose, withHandlers, withStateHandlers } from 'recompose';
import { LayoutAnimation } from 'react-native';
import DescriptionTabView from './DescriptionTabView';

export default compose(
  withStateHandlers(
    {
      isVisible: false,
    },
    {
      setVisible: (props) => () => ({
        isVisible: !props.isVisible,
      }),
    },
  ),
  withHandlers({
    onPress: (props) => () => {
      LayoutAnimation.easeInEaseOut();
      props.setVisible();
    },
  }),
)(DescriptionTabView);
