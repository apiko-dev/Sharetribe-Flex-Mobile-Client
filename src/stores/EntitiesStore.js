import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product } from './ListingsStore';
import { User } from './UserStore';
import { Image } from './ImageStore';

const EntitiesStore = createEntitiesStore({
  listing: Product,
  image: Image,
  user: User,
});

export default EntitiesStore;
