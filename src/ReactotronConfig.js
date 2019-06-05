import Reactotron, {
  asyncStorage,
  trackGlobalErrors,
} from 'reactotron-react-native';
import { mst } from 'reactotron-mst';

const filterRegex = /(entities\.(.*)\.add\(\))|(@APPLY_SNAPSHOT)|(afterAttach)/;

export default Reactotron.configure({
  name: 'React Native Demo',
})
  .useReactNative({
    asyncStorage: true,
  }) // add all built-in react native plugins
  .use(
    mst({
      filter: (event) => !event.name.match(filterRegex),
    }),
    asyncStorage(),
    trackGlobalErrors(),
  ) // plus some custom made plugin.
  .connect();
