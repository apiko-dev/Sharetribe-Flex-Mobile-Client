import { compose, withHandlers } from 'recompose';
import AuthScreenComponent from './AuthScreenComponent';
import screens from '../../navigation/screens';

export default compose(
  withHandlers({
    singIn: props => () => props.navigation.navigate(screens.AuthorizedApp),
  }),
)(AuthScreenComponent);