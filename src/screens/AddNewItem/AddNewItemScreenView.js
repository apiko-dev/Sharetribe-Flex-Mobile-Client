/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Text, Button, InputForm } from '../../components';
import { AddPhotoButton, PhotoItem } from './components';
import s from './styles';
import i18n from '../../i18n';
import SelectButton from '../../components/SelectButton/SelectButton';
import { colors } from '../../styles';

const AddNewItemScreenView = ({
  title,
  category,
  description,
  price,
  brand,
  level,
  location,
  activeField,
  onChange,
  photos,
  addPhoto,
  goToCategory,
  subCategory,
  removePhoto,
  isValidFields,
}) => (
  <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={30}>
    <View style={s.container}>
      <Text xxsmallSize gray style={s.textPhotos}>
        {i18n.t('addNewItem.photos')}
      </Text>
      <View style={s.photos}>
        {photos.map((item) => (
          <PhotoItem
            src={item.src}
            onPress={() => removePhoto(item.id)}
            key={item.id}
          />
        ))}
        {photos.length < 6 && (
          <AddPhotoButton
            onPress={() => {
              this.actionSheetRef.show();
            }}
          />
        )}
      </View>
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.title')}
        value={title}
        active={activeField === 'title'}
        onFocus={() => onChange('activeField', 'title')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('title', text)}
      />
      <SelectButton
        label={i18n.t('addNewItem.category')}
        containerStyle={s.inputContainer}
        value={
          category && subCategory && `${category} > ${subCategory}`
        }
        onPress={goToCategory}
      />
      {!!category && !!subCategory && (
        <React.Fragment>
          <InputForm
            containerStyle={s.inputContainer}
            placeholder={i18n.t('addNewItem.brand')}
            value={brand}
            active={activeField === 'brand'}
            onFocus={() => onChange('activeField', 'brand')}
            onBlur={() => onChange('activeField', '')}
            onChangeText={(text) => onChange('brand', text)}
          />
          <InputForm
            containerStyle={s.inputContainer}
            placeholder={i18n.t('addNewItem.level')}
            value={level}
            active={activeField === 'level'}
            onFocus={() => onChange('activeField', 'level')}
            onBlur={() => onChange('activeField', '')}
            onChangeText={(text) => onChange('level', text)}
          />
        </React.Fragment>
      )}
      <InputForm
        containerStyle={[
          s.inputContainer,
          s.descriptionInputContainer,
        ]}
        inputStyle={s.descriptionInput}
        placeholder={i18n.t('addNewItem.description')}
        value={description}
        active={activeField === 'description'}
        onFocus={() => onChange('activeField', 'description')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('description', text)}
        multiline
      />
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.priceADay')}
        value={price}
        active={activeField === 'price'}
        onFocus={() => onChange('activeField', 'price')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('price', text)}
        keyboardType="numeric"
      />
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.location')}
        value={location}
        active={activeField === 'location'}
        onFocus={() => onChange('activeField', 'location')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('location', text)}
      />
      <Button
        disabled={!isValidFields}
        primary
        title={i18n.t('addNewItem.publishListing')}
        containerStyle={s.buttonContainer}
      />
    </View>
    <ActionSheet
      ref={(ref) => {
        this.actionSheetRef = ref;
      }}
      title={i18n.t('common.select')}
      message={i18n.t(
        'addNewItem.choosePhotosFromLibraryOrMakeNewPhoto',
      )}
      tintColor={colors.addNewItemScreen.actionSheetTintColor}
      options={[
        i18n.t('addNewItem.choosePhotosFromLibrary'),
        i18n.t('addNewItem.makeNewPhoto'),
        i18n.t('common.cancel'),
      ]}
      onPress={(index) => {
        setTimeout(() => addPhoto(index), 500);
      }}
      cancelButtonIndex={2}
    />
  </KeyboardAwareScrollView>
);

AddNewItemScreenView.navigationOptions = () => ({
  title: i18n.t('addNewItem.addGoods'),
});

AddNewItemScreenView.propTypes = {
  title: T.string,
  category: T.string,
  brand: T.string,
  level: T.string,
  subCategory: T.string,
  description: T.string,
  price: T.string,
  location: T.string,
  activeField: T.string,
  onChange: T.func,
  photos: T.array,
  addPhoto: T.func,
  goToCategory: T.func,
  removePhoto: T.func,
  isValidFields: T.bool,
};

export default AddNewItemScreenView;
