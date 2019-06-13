import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
  lifecycle,
} from 'recompose';
import { Keyboard } from 'react-native';
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
import screens from '../../navigation/screens';

const getPublicData = (props) => (name) =>
  R.pathOr('', ['product', 'publicData', name], props);

const getImages = (product) =>
  R.pathOr([], ['relationships', 'getImages'], product).map(
    ({ id, variants }) => ({
      id,
      uri: R.path(['default', 'url'], variants),
    }),
  );

const transformEntries = (entries) =>
  entries.map(({ key }) => ({
    dayOfWeek: key,
    seats: 1,
  }));

export default hoistStatics(
  compose(
    withParamsToProps('product', 'isEditing'),
    inject(({ listings, viewer, userInterface }, { product }) => ({
      listings,
      user: viewer.user,
      isLoading:
        listings.createListing.inProgress ||
        R.pathOr(false, ['update', 'inProgress'], product),
      isUpdateDay: R.pathOr(
        false,
        ['getOwnFields', 'inProgress'],
        product,
      ),
      userInterface,
    })),

    withStateHandlers(
      (props) => {
        const getPublic = getPublicData(props);

        return {
          id: R.pathOr('', ['product', 'id'], props),
          photos: getImages(props.product),
          title: R.pathOr('', ['product', 'title'], props),
          category: getPublic('category'),
          subCategory: getPublic('subCategory'),
          brand: getPublic('brand'),
          level: getPublic('level'),
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
          defaultLocation: '',
          geolocation: R.pathOr(
            {},
            ['product', 'geolocation'],
            props,
          ),
          locationList: [],
          activeField: '',
          isValidFields: false,
          isLoadingPlaceDetails: false,
          isErrorPlaceDetails: false,
          placeid: '',
          entries: [],
        };
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
        setEntries: (props) => (option) => {
          if (Array.isArray(option)) {
            return {
              entries: option,
            };
          }

          const entries = [...props.entries];

          const index = entries.findIndex(
            (i) => i.key === option.key,
          );
          if (index > -1) {
            entries.splice(index, 1);
          } else {
            entries.push(option);
          }

          return {
            entries,
          };
        },

        addPhoto: (props) => (image) => ({
          photos: props.photos.concat({
            id: uuid(),
            uri: image.path,
            name: `image_${uuid()}`,
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
        setLocation: () => ({ lat, lng } = {}) => ({
          geolocation: {
            lat,
            lng,
          },
        }),
      },
    ),

    withHandlers({
      setGeolocation: (props) => async (item) => {
        try {
          props.onChange('isErrorPlaceDetails', false);
          props.onChange('isLoadingPlaceDetails', true);

          const res = await GoogleApi.getPlaceDetails({
            placeid: R.pathOr(props.placeid, ['place_id'], item),
            language: 'eng',
          });

          const location = R.path(
            ['data', 'result', 'geometry', 'location'],
            res,
          );
          const text = R.path(
            ['data', 'result', 'formatted_address'],
            res,
          );

          if (typeof location === 'undefined') {
            throw new Error(
              'Cannot get location from google autocomplete',
            );
          }

          props.setLocation(location);
          props.onChange('defaultLocation', text);
          props.onChange('location', text);
        } catch (err) {
          console.log(err.message);
        } finally {
          props.onChange('isErrorPlaceDetails', true);
          props.onChange('isLoadingPlaceDetails', false);
          props.onChange('isErrorPlaceDetails', false);
        }
      },
    }),
    withHandlers({
      addPhotoByCamera: (props) => async () => {
        try {
          if (await PermissionService.getCameraPermission()) {
            const images = await ImagePicker.openCamera({
              compressImageQuality: 1,
              width: 2500,
              height: 2500,
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

      addPhotoFromLibrary: (props) => async () => {
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

      createListing: (props) => async () => {
        Keyboard.dismiss();

        try {
          if (props.defaultLocation !== props.location) {
            props.onChange('isErrorPlaceDetails', true);
            throw new Error();
          }

          await props.listings.createListing.run({
            images: props.photos,
            title: props.title,
            category: props.category,
            subCategory: props.subCategory,
            brand: props.brand,
            level: props.level,
            description: props.description,
            price: props.price,
            location: props.location,
            geolocation: props.geolocation,
            entriesDay: transformEntries(props.entries),
          });

          const title = props.userInterface.shouldShowVerifyModal
            ? i18n.t('stripeVerifyInstructions.attention')
            : i18n.t('alerts.createListingSuccess.title');

          const content = props.userInterface.shouldShowVerifyModal
            ? i18n.t('stripeVerifyInstructions.message')
            : i18n.t('alerts.createListingSuccess.message');
          AlertService.showAlert(title, content, [
            {
              text: i18n.t('common.ok'),
              onPress: () => {
                props.userInterface.setShouldShowVerifyModal(false);
                NavigationService.navigateToHome();
              },
            },
          ]);
          props.onChange('defaultLocation', '');
        } catch (err) {
          if (props.isErrorPlaceDetails) {
            AlertService.showAlert(
              i18n.t('alerts.createListingError.title'),
              i18n.t('alerts.createListingError.message'),
            );
          }
        }
      },

      updateProduct: (props) => async () => {
        Keyboard.dismiss();

        try {
          if (props.defaultLocation !== props.location) {
            props.onChange('isErrorPlaceDetails', true);
            throw new Error();
          }

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
            geolocation: props.geolocation,
            entriesDay: transformEntries(props.entries),
          });
          AlertService.showAlert(
            i18n.t('alerts.updateProductSuccess.title'),
            i18n.t('alerts.updateProductSuccess.message'),
            [
              {
                text: i18n.t('common.ok'),
                onPress: () => NavigationService.goBack(),
              },
            ],
          );
          props.onChange('defaultLocation', '');
        } catch (err) {
          props.onChange('isErrorPlaceDetails', true);
          console.log(err);
          if (props.isErrorPlaceDetails) {
            AlertService.showAlert(
              i18n.t('alerts.updateProductError.title'),
              i18n.t('alerts.updateProductError.message'),
            );
          }
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

    // to reduce the number of requests
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
          props.addPhotoFromLibrary();
        } else if (index === 1) {
          props.addPhotoByCamera();
        }
      },

      onChangeLocation: (props) => (text) => {
        props.onChange('location', text);
        props.getPredictions();
      },

      publishListing: (props) => () => {
        if (!props.user.stripeConnected) {
          NavigationService.navigateTo(screens.PayoutPreferences, {
            onContinue: props.createListing,
          });
        } else {
          props.createListing();
        }
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
    lifecycle({
      async componentDidMount() {
        if (this.props.isEditing) {
          await this.props.product.getOwnFields.run();

          const entries = R.pathOr(
            [],
            ['availabilityPlan', 'entries'],
            this.props.product,
          ).map((i) => ({ key: i.dayOfWeek }));

          this.props.setEntries(entries);
        }
      },
    }),
  ),
)(AddNewItemScreen);
