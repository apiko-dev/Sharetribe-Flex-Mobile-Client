import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import ImagePicker from 'react-native-image-crop-picker';
import {} from 'mobx-react';
import AddNewItemScreen from './AddNewItemScreenView';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withStateHandlers(
      {
        photos: [],
        title: '',
        category: '',
        subCategory: '',
        brand: '',
        level: '',
        description: '',
        price: '',
        location: '',
        activeField: '',
        actionSheetRef: null,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        addPhoto: (props) => (src) => ({
          photos: props.photos.concat({
            id: Math.random(),
            src,
          }),
        }),

        removePhoto: (props) => (id) => ({
          photos: props.photos.filter((item) => item.id !== id),
        }),

        chooseCategory: () => (category, subCategory) => ({
          category,
          subCategory,
        }),
      },
    ),

    withHandlers({
      addPhotoByCamera: (props) => async () => {
        const images = await ImagePicker.openCamera({
          cropping: true,
        });

        props.addPhoto(images.path);
      },
      addPhotoFormLibrary: (props) => async () => {
        const images = await ImagePicker.openPicker({
          multiple: true,
          maxFiles: 6 - props.photos.length,
          cropping: true,
        });

        // Some devices can return object if they haven't got multiple support
        if (Array.isArray(images)) {
          // Android doesn't support maxFiles
          if (images.length > 6) {
            images.length = 6 - props.photos.length;
          }
          images.forEach((image) => props.addPhoto(image.path));
        } else {
          props.addPhoto(images.path);
        }
      },
    }),

    withHandlers({
      goToCategory: (props) => () => {
        NavigationService.navigateToCategory({
          chooseCategory: (category, subCategory) => {
            props.chooseCategory(category, subCategory);
            NavigationService.goBack();
          },
        });
      },

      addPhoto: (props) => (index) => {
        if (index === 0) {
          props.addPhotoFormLibrary();
        } else if (index === 1) {
          props.addPhotoByCamera();
        }
      },
    }),
  ),
)(AddNewItemScreen);
