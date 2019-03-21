import { createEntitiesStore } from './utils/createEntitiesStore';
import ListingsStore from './ListingsStore';

const EntitiesStore = createEntitiesStore({
  listings: ListingsStore,
});

export default EntitiesStore;
