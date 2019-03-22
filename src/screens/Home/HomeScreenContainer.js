import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withHandlers,
  defaultProps,
} from 'recompose';
import { inject } from 'mobx-react';
import HomeScreenComponent from './HomeScreenView';
import { NavigationService } from '../../services';
import { categories as categoriesConstants } from '../../constants';
import { withCategoriesContext } from '../../utils/enhancers/withCategoriesHocs';

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
            key: 'mapVIew',
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

    withHandlers({
      goToCategory: (props) => ({ onlyCategory }) => {
        NavigationService.navigateToCategory({
          onlyCategory,
          chooseCategory: (category, subCategory) => {
            props.chooseCategory(category, subCategory);
            NavigationService.goBack();
          },
        });
      },
    }),

    withCategoriesContext,

    lifecycle({
      componentDidUpdate(nextProps) {
        if (this.props.category !== nextProps.category) {
          this.props.listings.fetchListings.run({
            categoriesList: this.props.category || categories,
          });
        }
      },

      componentDidMount() {
        this.props.listings.fetchListings.run({
          categoriesList: this.props.category || categories,
        });
      },
    }),
  ),
)(HomeScreenComponent);
