import {
  compose,
  withHandlers,
  branch,
  renderComponent,
  defaultProps,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import ListView from './ListView';
import { NavigationService } from '../../../../services';
import { ScreenLoader } from '../../../../components';
import { categories } from '../../../../constants';

export default compose(
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
    goToProduct: () => (productId) =>
      NavigationService.navigateToProduct({ productId }),
  }),

  branch(
    (props) => props.isLoading || props.isSearching,
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

  withPropsOnChange(
    ['category', 'subCategory', 'search'],
    (props) => ({
      // Filter by sub category
      data: props.listings.filter(
        (i) => i.publicData.subCategory === props.subCategory && i,
      ),

      // Form section list by category
      // When we have selected category we form section list by subcategory
      sectionList: props.category
        ? categories[
            categories.findIndex((i) => i.title === props.category)
          ].data
        : categories.map((i) => i.title),
    }),
  ),
)(ListView);
