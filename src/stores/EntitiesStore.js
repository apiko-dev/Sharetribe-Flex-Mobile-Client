import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product } from './ListingsStore';
import { User } from './UserStore';
import { Image } from './ImageStore';
import { Transaction } from './TransactionStore';
import { Message } from './MessagesStore';
import { Booking } from './BookingStore';

const EntitiesStore = createEntitiesStore({
  listing: Product,
  image: Image,
  user: User,
  transaction: Transaction,
  message: Message,
  booking: Booking,
});

export default EntitiesStore;
