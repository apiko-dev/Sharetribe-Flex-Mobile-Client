import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import {} from 'mobx-react';
import AddNewItemScreen from './AddNewItemScreenView';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withStateHandlers(
      {
        title: '',
        category: '',
        description: '',
        price: '',
        location: '',
        activeField: '',
        photos: [],
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        addPhoto: (props) => () => ({
          photos: props.photos.concat('photo'), // for test
        }),
      },
    ),

    withHandlers({
      goToCategory: (props) => () => {
        NavigationService.navigateToCategory({
          chooseCategory: (category) => {
            props.onChange('category', category);
            NavigationService.goBack();
          },
        });
      },
    }),
  ),
)(AddNewItemScreen);
