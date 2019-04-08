import { compose, withStateHandlers, hoistStatics } from 'recompose';

import GalleryScreenView from './GalleryScreenView';

export default hoistStatics(
  compose(
    withStateHandlers(
      (props) => ({
        currentIndex: props.navigation.getParam('currentIndex'),
      }),
      {
        onChangeIndex: () => (index) => ({
          currentIndex: index,
        }),
      },
    ),
  ),
)(GalleryScreenView);
