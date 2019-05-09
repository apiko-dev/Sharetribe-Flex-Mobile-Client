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
    mst({
      filter: (event) => !event.name.includes('@APPLY_SNAPSHOT'),
    }),
    asyncStorage(),
    trackGlobalErrors(),
  ) // plus some custom made plugin.
  .connect();
