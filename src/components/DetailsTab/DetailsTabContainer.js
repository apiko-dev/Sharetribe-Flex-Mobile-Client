import { compose, withStateHandlers } from 'recompose';
import Details from './DetailsTabView';

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
)(Details);
