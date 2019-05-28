import React from 'react';
import { View, FlatList } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import { UserInfo, Text } from '..';
import RatingTable from './components/RatingTable/RatingTable';
import i18n from '../../i18n';
import s from './styles';

const ReviewsView = ({ reviews, averageRating, ratingForTable }) => (
  <View style={s.container}>
    <FlatList
      data={reviews}
      emptyListMessage={i18n.t('profile.noReviews')}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserInfo
          rating={item.rating}
          textReview={item.content}
          user={item.relationships.author}
          styleContainer={s.userInfoContainer}
        />
      )}
      ListHeaderComponent={() =>
        ratingForTable ? (
          <RatingTable
            ratings={ratingForTable}
            averageRating={averageRating}
          />
        ) : (
          <View style={s.emptyReviewsContainer}>
            <Text gray largeSize>
              {i18n.t('review.emptyReview')}
            </Text>
          </View>
        )
      }
    />
  </View>
);

ReviewsView.propTypes = {
  reviews: T.array,
  averageRating: T.number,
  ratingForTable: T.array,
};

export default observer(ReviewsView);
