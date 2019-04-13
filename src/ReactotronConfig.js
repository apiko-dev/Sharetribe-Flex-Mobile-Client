import Reactotron, {
  asyncStorage,
  trackGlobalErrors,
} from 'reactotron-react-native';
import { mst } from 'reactotron-mst';

export default Reactotron.configure({
  name: 'React Native Demo',
})
  .useReactNative({
    asyncStorage: true,
  }) // add all built-in react native plugins
  .use(
    mst({ queryMode: 'live' }),
    asyncStorage(),
    trackGlobalErrors(),
  ) // plus some custom made plugin.
  .connect();
