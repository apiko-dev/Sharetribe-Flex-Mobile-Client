import { compose, hoistStatics } from 'recompose';
import SettingsScreenView from './SettingsScreenView';

export default hoistStatics(compose())(SettingsScreenView);
