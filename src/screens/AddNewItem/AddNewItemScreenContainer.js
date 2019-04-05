import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import R from 'ramda';
import ImagePicker from 'react-native-image-crop-picker';
import { inject } from 'mobx-react';
import uuid from 'uuid/v4';
import i18n from '../../i18n';

import AddNewItemScreen from './AddNewItemScreenView';
import {
  NavigationService,
  PermissionService,
  AlertService,
} from '../../services';
import GoogleApi from '../../libs/google-autocomplete/GoogleAutocompleteApi';
import {
  withDebounce,
  withParamsToProps,
} from '../../utils/enhancers';

const getPublicData = (props) => (name) =>
  R.pathOr('', ['product', 'publicData', name], props);

const getImages = (product) =>
  R.pathOr([], ['relationships', 'getImages'], product).map(
    ({ id, variants }) => ({
      id,
      uri: R.path(['default', 'url'], variants),
    }),
  );

export default hoistStatics(
  compose(
    withParamsToProps('product', 'isEditing'),
    inject(({ listings }, { product }) => ({
      listings,
      isLoading:
        listings.createListing.inProgress ||
        R.path('product', 'update', 'inProgress'),
    })),

    withStateHandlers(
      (props) => {
        const getPublic = getPublicData(props);

        return {
          id: getPublic('id'),
          photos: getImages(props.product),
          title: R.pathOr('', ['product', 'title'], props),
          category: getPublic('category'),
          subCategory: getPublic('subCategory'),
          brand: getPublic('subCategory'),
          level: getPublic('subCategory'),
          description: R.pathOr(
            '',
            ['product', 'description'],
            props,
          ),
          price: R.pathOr(
            '',
            ['product', 'price', 'amount'],
            props,
          ).toString(),
          location: getPublic('location'),
          locationList: [],
          activeField: '',
          isValidFields: false,
        };
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        addPhoto: (props) => (image) => ({
          photos: props.photos.concat({
            id: uuid(),
            uri: image.path,
            name: `image_${uuid()}.jpg`,
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

      updateProduct: (props) => async () => {
        try {
          await props.product.update.run({
            id: props.id,
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
          AlertService.showAlert(
            i18n.t('alerts.updateProductSuccess.title'),
            i18n.t('alerts.updateProductSuccess.message'),
            [
              {
                text: i18n.t('common.ok'),
                onPress: () => NavigationService.navigateToHome(),
              },
            ],
          );
        } catch (err) {
          console.log(err);
          AlertService.showAlert(
            i18n.t('alerts.updateProductError.title'),
            i18n.t('alerts.updateProductError.message'),
          );
        }
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
            props.price.toString().trim().length > 0 &&
            props.location.trim().length > 0,
        );
      },
    ),
  ),
)(AddNewItemScreen);
