import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import { inject } from 'mobx-react';
import HomeScreenComponent from './HomeScreenView';

export default hoistStatics(
  compose(
    inject((stores) => ({
      listings: stores.listings,
    })),

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
      },
    ),

    lifecycle({
      componentDidMount() {
        this.props.listings.fetchListings.run();
      },
    }),
  ),
)(HomeScreenComponent);
