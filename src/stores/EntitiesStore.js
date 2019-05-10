import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product } from './ListingsStore';
import { User } from './UserStore';
import { Image } from './ImageStore';
import { Transaction } from './TransactionStore';

const EntitiesStore = createEntitiesStore({
  listing: Product,
  image: Image,
  user: User,
  transaction: Transaction,
});

export default EntitiesStore;
