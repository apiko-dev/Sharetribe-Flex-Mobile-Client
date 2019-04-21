import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product } from './ListingsStore';
import { User } from './UserStore';
import { Image } from './ImageStore';
import { Transaction } from './TransactionStore';
import { Message } from './MessagesStore';

const EntitiesStore = createEntitiesStore({
  listing: Product,
  image: Image,
  user: User,
  transaction: Transaction,
  message: Message,
});

export default EntitiesStore;
