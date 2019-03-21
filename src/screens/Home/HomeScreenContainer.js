import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import HomeScreenComponent from './HomeScreenView';
import { NavigationService } from '../../services';
import { categories } from '../../constants';

const categoriesList = categories.map((item) => item.title);

export default hoistStatics(
  compose(
    inject((stores) => ({
      listings: stores.listings,
    })),

    withStateHandlers(
      {
        categoriesList,
      },
      {
        onChange: () => (index) => ({
          tabIndex: index,
        }),
      },
    ),

    withStateHandlers(
      {
        tabIndex: 0,
        tabRoutes: [
          { key: 'listView', title: 'List View', iconName: 'plitka' },
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
      goToCategory: (props) => () => {
        NavigationService.navigateToCategory({
          chooseCategory: (category, subCategory) => {
            props.chooseCategory(category, subCategory);
            NavigationService.goBack();
          },
        });
      },
    }),

    lifecycle({
      componentDidMount() {
        this.props.listings.fetchListings.run({
          categoriesList,
        });
      },
    }),
  ),
)(HomeScreenComponent);
