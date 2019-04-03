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
        selectedTabIndex: 0,
      },
      {
        onChangeTabIndex: () => (index) => ({
          selectedTabIndex: index,
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

    lifecycle({
      componentDidMount() {
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
