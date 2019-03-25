import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product, Image } from './ListingsStore';

const EntitiesStore = createEntitiesStore({
  listings: Product,
  images: Image,
});

export default EntitiesStore;
