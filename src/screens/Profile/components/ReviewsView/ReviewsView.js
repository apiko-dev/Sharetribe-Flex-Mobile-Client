import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { FlatListVertical, UserInfo } from '../../../../components';
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
        <UserInfo
          rating={item.rating}
          textReview={item.content}
          user={item.relationships.author}
        />
      )}
    />
  </View>
);

ReviewsView.propTypes = {
  reviews: T.array,
};

export default ReviewsView;
