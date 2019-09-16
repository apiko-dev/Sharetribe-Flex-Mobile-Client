import {
  compose,
  withHandlers,
  branch,
  renderComponent,
  defaultProps,
  hoistStatics,
} from 'recompose';
import { inject } from 'mobx-react';
import ListView from './ListView';
import { NavigationService } from '../../../../services';
import { ScreenLoader } from '../../../../components';
import { categories } from '../../../../constants';

export default hoistStatics(
  compose(
    inject(({ listings }) => ({
      listings: listings.list.asArray,
      isLoading: listings.fetchListings.inProgress,
      isSearching: listings.searchListings.inProgress,
      searchListings: listings.searchList.asArray,
    })),

    defaultProps({
      categories,
    }),

    withHandlers({
      goToProduct: () => (product) =>
        NavigationService.navigateToProduct({ product }),
    }),

    branch(
      (props) =>
        !props.isRefreshing && (props.isLoading || props.isSearching),
      renderComponent(ScreenLoader),
    ),

    withHandlers({
      // Filter products by category or if we've selected category
      // filter by category and sub category
      listingsFilter: (props) => (listings, categoryItem) =>
        listings.filter((i) =>
          props.category
            ? categoryItem &&
              i.publicData.category === props.category &&
              i.publicData.subCategory === categoryItem
            : categoryItem && i.publicData.category === categoryItem,
        ),
    }),
  ),
)(ListView);
