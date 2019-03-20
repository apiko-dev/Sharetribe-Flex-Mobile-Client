import { compose } from 'recompose';
import { inject } from 'mobx-react';
import ListView from './ListView';

export default compose(
  inject((stores) => ({
    listings: stores.listings.getListings,
  })),
)(ListView);
