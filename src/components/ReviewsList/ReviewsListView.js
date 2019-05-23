import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import { FlatListVertical, UserInfo } from '..';
import RatingTable from './components/RatingTable/RatingTable';
import i18n from '../../i18n';
import s from './styles';

const ReviewsView = ({ reviews, averageRating }) => (
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
      ListHeaderComponent={() => (
        <RatingTable
          ratings={ratings}
          averageRating={averageRating}
        />
      )}
    />
  </View>
);

ReviewsView.propTypes = {
  reviews: T.array,
  averageRating: T.number,
};

export default observer(ReviewsView);
