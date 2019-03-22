import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product } from './ListingsStore';

const EntitiesStore = createEntitiesStore({
  listings: Product,
});

export default EntitiesStore;
