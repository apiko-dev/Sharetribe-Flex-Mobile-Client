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
    withParamsToProps('userId'),

    inject(({ viewer, listings }) => ({
      listings: listings.particularUserList.asArray,
      getUserById: viewer.getUserById,
      isLoadingUser: viewer.getUserById.inProgress,
      isLoadingListings:
        listings.fetchParticularUserListings.inProgress,
      fetchParticularUserListings:
        listings.fetchParticularUserListings,
    })),

    withStateHandlers(
      {
        userToReview: {},
      },
      {
        onChangeUser: () => (user) => ({
          userToReview: user,
        }),
      },
    ),

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

    withPropsOnChange(['userId', 'user'], async (props) => {
      try {
        const user = await props.getUserById.run(props.userId);
        props.onChangeUser(user);

        props.navigation.setParams({
          userName: user.displayName,
        });

        props.fetchParticularUserListings.run(props.userId);
      } catch (error) {
        console.log(error);
      }
    }),

    withHandlers({
      goToProduct: () => (product) =>
        NavigationService.navigateToProduct({ product }),
    }),

    branch(
      (props) => props.isLoadingUser || props.isLoadingListings,
      renderComponent(ScreenLoader),
    ),
  ),
)(ProfileScreenView);
