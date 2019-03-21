import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import ImagePicker from 'react-native-image-crop-picker';
import { inject } from 'mobx-react';
import AddNewItemScreen from './AddNewItemScreenView';
import { NavigationService, PermissionService } from '../../services';
import GoogleApi from '../../libs/google-autocomplete/GoogleAutocompleteApi';
import { withDebounce } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    inject((stores) => ({
      listings: stores.listings,
      isCreatingListing: stores.listings.createListing.inProgress,
    })),

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
        locationList: [],
        activeField: '',
        isValidFields: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        addPhoto: (props) => (image) => ({
          photos: props.photos.concat({
            id: Math.random(),
            uri: image.path,
            name: `image_${Math.floor(Math.random() * 100)}.jpg`,
            type: image.mime,
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
        try {
          if (await PermissionService.getCameraPermission()) {
            const images = await ImagePicker.openCamera({
              cropping: true,
            });

            props.addPhoto(images);
          }
        } catch (error) {
          if (error.code === 'E_PICKER_CANCELLED') {
            // do nothing;
          }
        }
      },

      addPhotoFormLibrary: (props) => async () => {
        try {
          if (await PermissionService.getCameraRollPermission()) {
            const images = await ImagePicker.openPicker({
              multiple: true,
              maxFiles: 6 - props.photos.length,
              cropping: true,
            });
            // Some devices can return object if they haven't got multiple support
            if (Array.isArray(images)) {
              // Android doesn't support maxFiles
              images.length = 6 - props.photos.length;
              images.forEach((image) => props.addPhoto(image));
            } else {
              props.addPhoto(images);
            }
          }
        } catch (error) {
          if (error.code === 'E_PICKER_CANCELLED') {
            // do nothing;
          }
        }
      },

      createListing: (props) => () => {
        props.listings.createListing.run({
          images: props.photos,
          title: props.title,
          category: props.category,
          subCategory: props.subCategory,
          brand: props.brand,
          level: props.level,
          description: props.description,
          price: props.price,
          location: props.location,
        });
      },

      getPredictions: (props) => async () => {
        try {
          const res = await GoogleApi.getPredictions({
            text: props.location,
          });
          props.onChange('locationList', res.data.predictions);
        } catch (error) {
          props.onChange('locationList', []);
        }
      },
    }),

    withDebounce('getPredictions', 300),

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

      onChangeLocation: (props) => (text) => {
        props.onChange('location', text);
        props.getPredictions();
      },
    }),

    withPropsOnChange(
      [
        'photos',
        'title',
        'category',
        'subCategory',
        'brand',
        'level',
        'description',
        'price',
        'location',
      ],
      (props) => {
        props.onChange(
          'isValidFields',
          props.photos.length > 0 &&
            props.title.trim().length > 0 &&
            props.category.trim().length > 0 &&
            props.subCategory.trim().length > 0 &&
            props.brand.trim().length > 0 &&
            props.level.trim().length > 0 &&
            props.description.trim().length > 0 &&
            props.price.trim().length > 0 &&
            props.location.trim().length > 0,
        );
      },
    ),
  ),
)(AddNewItemScreen);
