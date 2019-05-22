/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import T from 'prop-types';
import { TabView, Tab } from 'react-native-easy-tabs';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  Text,
  Avatar,
  TabHeader,
  Rating,
  DrawerButton,
  HeaderBackButton,
  ExpandableText,
} from '../../components';
import i18n from '../../i18n';
import { ListingsView, ReviewsView } from './components';
import { dimensions, fontSizes, colors } from '../../styles';

const ProfileScreen = ({
  user,
  selectedTabIndex,
  onChangeTabIndex,
  listings,
  goToProduct,
  isRefreshing,
  refresh,
  reviews,
  averageRating,
}) => (
  <ScrollView
    style={s.container}
    refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={refresh}
        tintColor={colors.loader.secondary}
      />
    }
  >
    <View style={s.top}>
      <Avatar user={user} large />
      <Text xmediumSize style={s.userName}>
        {user.profile.displayName}
      </Text>
      <View style={s.rating}>
        <Rating value={averageRating} />
      </View>
      <ExpandableText
        containerStyle={s.bio}
        numberOfLines={5}
        fontSize={fontSizes.medium}
        lineHeight={fontSizes.medium}
        ellipsizeMode="tail"
      >
        {user.profile.bio || i18n.t('profile.noBio')}
      </ExpandableText>
    </View>
    <View style={s.containerTabView}>
      <TabHeader
        currentTabIndex={selectedTabIndex}
        onChangeTabIndex={onChangeTabIndex}
        tabs={[
          {
            id: 1,
            text: `${i18n.t('profile.listings')} (${
              listings.length
            })`,
          },
          {
            id: 2,
            text: i18n.t('profile.reviews'),
          },
        ]}
      />
      <TabView
        selectedTabIndex={selectedTabIndex}
        layoutWidth={dimensions.width}
      >
        <Tab>
          <ListingsView
            listings={listings}
            goToProduct={goToProduct}
          />
        </Tab>
        <Tab>
          <ReviewsView
            reviews={reviews}
            averageRating={averageRating}
          />
        </Tab>
      </TabView>
    </View>
  </ScrollView>
);

ProfileScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: navigation.getParam('isDrawerButton') ? (
    <DrawerButton />
  ) : (
    <HeaderBackButton />
  ),
  title: navigation.getParam('userName', 'User profile'),
});

ProfileScreen.propTypes = {
  user: T.object,
  selectedTabIndex: T.number,
  averageRating: T.number,
  onChangeTabIndex: T.func,
  listings: T.array,
  reviews: T.array,
  goToProduct: T.func,
  isRefreshing: T.bool,
  refresh: T.func,
};

export default observer(ProfileScreen);
