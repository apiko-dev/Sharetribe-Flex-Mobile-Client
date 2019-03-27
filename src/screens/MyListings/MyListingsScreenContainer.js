import {
  compose,
  hoistStatics,
  lifecycle,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose';
import { inject } from 'mobx-react';
import MyListingsScreenView from './MyListingsScreenView';
import { NavigationService } from '../../services';
import { categories as c } from '../../constants';
import { ScreenLoader } from '../../components';

const categories = c.map((i) => i.title);

export default hoistStatics(
  compose(
    inject(({ listings }) => ({
      listings: listings.ownList.asArray,
      fetchOwnListings: listings.fetchOwnListings,
      isLoading: listings.fetchOwnListings.inProgress,
    })),

    withHandlers({
      goToAddNewItem: () => () =>
        NavigationService.navigateToAddNewItem(),
      goToProduct: () => (productId) =>
        NavigationService.navigateToProduct({ productId }),
    }),

    withHandlers({
      goToProduct: () => (productId) =>
        NavigationService.navigateToProduct({ productId }),
    }),

    lifecycle({
      componentDidMount() {
        this.props.fetchOwnListings.run({
          categories,
        });
      },
    }),

    branch((props) => props.isLoading, renderComponent(ScreenLoader)),
  ),
)(MyListingsScreenView);
