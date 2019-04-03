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

    inject(({ listings }) => ({
      listings: listings.particularUserList.asArray,
      isLoadingListings:
        listings.fetchParticularUserListings.inProgress,
      fetchParticularUserListings:
        listings.fetchParticularUserListings,
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
