import React from 'react';
import { View, FlatList } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import { UserInfo, EmptyFlatList } from '..';
import RatingTable from './components/RatingTable/RatingTable';
import i18n from '../../i18n';
import s from './styles';

const ReviewsView = ({ reviews, averageRating, ratingForTable }) => {
  const isReviews = reviews.length > 0;

  return (
    <View style={s.container}>
      <FlatList
        data={reviews}
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
          isReviews && (
            <RatingTable
              ratings={ratingForTable}
              averageRating={averageRating}
            />
          )
        }
        contentContainerStyle={
          !isReviews && s.flatListContentContainer
        }
        ListEmptyComponent={() => (
          <EmptyFlatList message={i18n.t('profile.noReviews')} />
        )}
      />
    </View>
  );
};

ReviewsView.propTypes = {
  reviews: T.array,
  averageRating: T.number,
  ratingForTable: T.array,
};

export default observer(ReviewsView);
