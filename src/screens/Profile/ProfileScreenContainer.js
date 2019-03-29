import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose';
import { inject } from 'mobx-react';
import ProfileScreenView from './ProfileScreenView';
import { ScreenLoader } from '../../components';

export default hoistStatics(
  compose(
    inject(({ viewer, listings }) => ({
      user: viewer.user,
      listings: listings.list.asArray,
      getUserById: viewer.getUserById,
      viewer,
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

    branch(
      (props) => props.isLoadingListings,
      renderComponent(ScreenLoader),
    ),

    lifecycle({
      componentDidMount() {
        console.log(
          'userId: ',
          this.props.navigation.getParam('userId'),
        );
        this.props.getUserById.run(
          this.props.navigation.getParam('userId'),
        );
        this.props.navigation.setParams({
          userName: `${this.props.user.firstName} ${
            this.props.user.lastName
          }`,
        });
      },
    }),
  ),
)(ProfileScreenView);
