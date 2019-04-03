import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product, Image } from './ListingsStore';
import { User } from './UserStore';

const EntitiesStore = createEntitiesStore({
  listing: Product,
  image: Image,
  user: User,
});

export default EntitiesStore;
