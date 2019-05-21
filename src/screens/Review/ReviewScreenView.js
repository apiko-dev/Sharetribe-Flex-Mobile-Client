import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import {
  Text,
  Avatar,
  Rating,
  InputForm,
  Button,
} from '../../components';
import i18n from '../../i18n';
import s from './styles';

const ReviewScreen = ({
  displayName,
  user,
  onChange,
  review,
  activeField,
  onSentReview,
}) => {
  return (
    <KeyboardAwareScrollView style={s.container}>
      <View style={s.profileContainer}>
        <Avatar user={user} large />
        <Text xmediumSize style={s.userName}>
          {displayName}
        </Text>
        <View style={s.rating}>
          <Rating value={4} imageSize={34} showOnlyRating />
        </View>
      </View>
      <View style={s.reviewContainer}>
        <InputForm
          containerStyle={[
            s.inputContainer,
            s.descriptionInputContainer,
          ]}
          labelStyle={s.descriptionLabel}
          inputStyle={s.descriptionInput}
          placeholder={i18n.t('review.writeReview')}
          value={review}
          active={activeField === 'review'}
          onFocus={() => onChange('activeField', 'review')}
          onBlur={() => onChange('activeField', '')}
          onChangeText={(text) => onChange('review', text)}
          multiline
          maxLength={1200}
        />
      </View>
      <Button
        primary
        title={i18n.t('review.publishReview')}
        containerStyle={s.publishContainer}
        onPress={onSentReview}
      />
    </KeyboardAwareScrollView>
  );
};

ReviewScreen.navigationOptions = () => ({
  title: 'Add review',
});

ReviewScreen.propTypes = {
  displayName: T.func,
  user: T.object,
  onChange: T.func,
  review: T.string,
  activeField: T.string,
  onSentReview: T.func,
};

export default ReviewScreen;
