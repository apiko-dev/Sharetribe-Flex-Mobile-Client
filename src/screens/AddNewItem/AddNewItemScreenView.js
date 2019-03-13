import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import { Text, Button, InputForm } from '../../components';
import { AddPhotoButton } from './components';
import s from './styles';
import i18n from '../../i18n';
import SelectButton from '../../components/SelectButton/SelectButton';

const AddNewItemScreenView = ({
  title,
  category,
  description,
  price,
  location,
  activeField,
  onChange,
  photos,
  addPhoto,
  goToCategory,
}) => (
  <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={30}>
    <View style={s.container}>
      <Text xxsmallSize gray>
        {i18n.t('addNewItem.photos')}
      </Text>
      <View style={s.photos}>
        {photos.map(() => (
          <AddPhotoButton />
        ))}
        <AddPhotoButton onPress={() => addPhoto()} />
      </View>
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.title')}
        value={title}
        active={activeField === 'title'}
        onFocus={() => onChange('activeField', 'title')}
        onChangeText={(text) => onChange('title', text)}
      />
      <SelectButton
        label={i18n.t('addNewItem.category')}
        containerStyle={s.inputContainer}
        value={category}
        onPress={() => goToCategory()}
      />
      <InputForm
        containerStyle={[
          s.inputContainer,
          s.descriptionInputContainer,
        ]}
        placeholder={i18n.t('addNewItem.description')}
        value={description}
        active={activeField === 'description'}
        onFocus={() => onChange('activeField', 'description')}
        onChangeText={(text) => onChange('description', text)}
        multiline
      />
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.priceADay')}
        value={price}
        active={activeField === 'price'}
        onFocus={() => onChange('activeField', 'price')}
        onChangeText={(text) => onChange('price', text)}
      />
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.location')}
        value={location}
        active={activeField === 'location'}
        onFocus={() => onChange('activeField', 'location')}
        onChangeText={(text) => onChange('location', text)}
      />
      <Button
        primary
        title={i18n.t('addNewItem.publishListing')}
        containerStyle={s.buttonContainer}
      />
    </View>
  </KeyboardAwareScrollView>
);

AddNewItemScreenView.navigationOptions = () => ({
  title: i18n.t('addNewItem.addGoods'),
});

AddNewItemScreenView.propTypes = {
  title: T.string,
  category: T.string,
  description: T.string,
  price: T.string,
  location: T.string,
  activeField: T.string,
  onChange: T.func,
  photos: T.array,
  addPhoto: T.func,
  goToCategory: T.func,
};

export default AddNewItemScreenView;
