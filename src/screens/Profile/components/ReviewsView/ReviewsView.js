import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  FlatListVertical,
  RenderProductButton,
} from '../../../../components';
import i18n from '../../../../i18n';
import s from './styles';

const ReviewsView = ({ reviews }) => (
  <View style={s.container}>
    <FlatListVertical
      data={reviews}
      numColumns={2}
      emptyListMessage={i18n.t('profile.noReviews')}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RenderProductButton item={item} forTwoColumns />
      )}
    />
  </View>
);

ReviewsView.propTypes = {
  reviews: T.array,
};

export default ReviewsView;
