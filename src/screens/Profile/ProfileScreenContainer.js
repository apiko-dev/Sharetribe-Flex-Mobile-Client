import {
  compose,
  hoistStatics,
  withStateHandlers,
  branch,
  renderComponent,
  withPropsOnChange,
  withHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import { withParamsToProps } from '../../utils/enhancers';
import ProfileScreenView from './ProfileScreenView';
import { ScreenLoader } from '../../components';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    inject(({ listings }, { user }) => ({
      listings: user.isViewer
        ? listings.ownList.asArray
        : listings.particularUserList.asArray,
      isLoadingListings:
        listings.fetchParticularUserListings.inProgress,
      fetchParticularUserListings:
        listings.fetchParticularUserListings,
      fetchOwnListings: listings.fetchOwnListings,
    })),

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

    withPropsOnChange(['user'], async (props) => {
      try {
        props.navigation.setParams({
          userName: props.user.profile.displayName,
        });

        if (props.user.isViewer) {
          props.fetchOwnListings.run();

          return;
        }

        props.fetchParticularUserListings.run(props.user.id);
      } catch (error) {
        console.log(error);
      }
    }),

    withHandlers({
      goToProduct: () => (product) =>
        NavigationService.navigateToProduct({ product }),
    }),

    branch(
      (props) => props.isLoadingListings,
      renderComponent(ScreenLoader),
    ),
  ),
)(ProfileScreenView);
