import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withHandlers,
  defaultProps,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import HomeScreenComponent from './HomeScreenView';
import { NavigationService } from '../../services';
import { categories as categoriesConstants } from '../../constants';
import { withCategoriesContext } from '../../utils/enhancers/withCategoriesHocs';
import { withDebounce } from '../../utils/enhancers';

const categories = categoriesConstants.map((item) => item.title);

export default hoistStatics(
  compose(
    inject((stores) => ({
      listings: stores.listings,
    })),

    defaultProps({
      categories: categoriesConstants,
    }),

    withStateHandlers(
      {
        tabIndex: 0,
        tabRoutes: [
          {
            key: 'listView',
            title: 'List View',
            iconName: 'plitka',
          },
          {
            key: 'mapView',
            title: 'Map View',
            iconName: 'baseline-map-24px',
          },
        ],
      },
      {
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
      },
    ),

    withStateHandlers(
      {
        category: '',
        subCategory: '',
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        chooseCategory: () => (category, subCategory) => ({
          category,
          subCategory,
        }),
      },
    ),

    withStateHandlers(
      {
        search: '',
      },
      {
        onChangeSearch: () => (search) => {
          return {
            search,
          };
        },
      },
    ),

    withHandlers({
      goToCategory: (props) => ({
        onlyCategory,
        showAllCategoriesButton,
        showCategoriesAsButton,
      }) => {
        NavigationService.navigateToCategory({
          onlyCategory,
          showAllCategoriesButton,
          showCategoriesAsButton,
          chooseCategory: (category, subCategory) => {
            props.chooseCategory(category, subCategory);
            NavigationService.goBack();
            props.onChangeSearch('');
          },
        });
      },

      getListingsBySearch: (props) => (title) => {
        props.listings.searchListings.run({
          title,
          categories,
        });
      },
    }),

    withDebounce('getListingsBySearch', 300),

    withCategoriesContext,

    lifecycle({
      componentDidMount() {
        this.props.listings.fetchListings.run({
          categories: this.props.category || categories,
        });

        this.props.navigation.setParams({
          onChangeSearch: this.props.onChangeSearch,
          value: this.props.search,
        });
      },
    }),

    withPropsOnChange(['category', 'subCategory'], (props) => {
      props.listings.fetchListings.run({
        categories: props.category || categories,
        subCategories: props.subCategory,
      });

      props.onChangeSearch('');
    }),

    withPropsOnChange(['search'], (props) => {
      props.getListingsBySearch(props.search);
      props.navigation.setParams({
        value: props.search,
      });
    }),
  ),
)(HomeScreenComponent);
