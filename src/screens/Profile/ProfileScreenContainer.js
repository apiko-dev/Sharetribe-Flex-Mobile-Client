import {
  compose,
  hoistStatics,
  withStateHandlers,
  branch,
  renderComponent,
  withPropsOnChange,
  withHandlers,
  lifecycle,
} from 'recompose';
import { inject } from 'mobx-react';
import { withParamsToProps } from '../../utils/enhancers';
import ProfileScreenView from './ProfileScreenView';
import { ScreenLoader } from '../../components';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    inject(({ listings, reviews }, { user }) => ({
      listings: user.isViewer
        ? listings.ownList.asArray
        : listings.particularUserList.asArray,
      isLoadingListings:
        listings.fetchParticularUserListings.inProgress,
      fetchParticularUserListings:
        listings.fetchParticularUserListings,
      fetchOwnListings: listings.fetchOwnListings,
      fetchReviews: reviews.fetchReviews,
    })),

    withStateHandlers(
      {
        isRefreshing: false,
        selectedTabIndex: 0,
      },
      {
        onChangeTabIndex: () => (index) => ({
          selectedTabIndex: index,
        }),

        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withPropsOnChange(['user'], async (props) => {
      try {
        props.navigation.setParams({
          userName: props.user.profile.displayName,
        });

        if (props.user.isViewer) {
          await props.fetchOwnListings.run();

          return;
        }

        await props.fetchParticularUserListings.run(props.user.id);
      } catch (error) {
        console.log(error);
      }
    }),

    withHandlers({
      goToProduct: () => (product) =>
        NavigationService.navigateToProduct({ product }),

      refresh: (props) => async () => {
        try {
          props.onChange('isRefreshing', true);

          if (props.user.isViewer) {
            await props.fetchOwnListings.run();

            return;
          }

          await props.fetchParticularUserListings.run(props.user.id);

          props.onChange('isRefreshing', false);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    branch(
      (props) => !props.isRefreshing && props.isLoadingListings,
      renderComponent(ScreenLoader),
    ),
    lifecycle({
      componentDidMount() {
        this.props.fetchReviews.run({
          subjectId: this.props.user.id,
        });
      },
    }),
  ),
)(ProfileScreenView);
