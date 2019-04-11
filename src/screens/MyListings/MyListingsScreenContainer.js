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
import { ScreenLoader } from '../../components';

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
      goToProduct: () => (product) =>
        NavigationService.navigateToProduct({ product }),
    }),

    lifecycle({
      componentDidMount() {
        this.props.fetchOwnListings.run();
      },
    }),

    branch((props) => props.isLoading, renderComponent(ScreenLoader)),
  ),
)(MyListingsScreenView);
