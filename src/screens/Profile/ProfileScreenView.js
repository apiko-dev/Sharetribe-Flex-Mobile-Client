import React from 'react';
import { ScrollView, View } from 'react-native';
import T from 'prop-types';
import { TabView, Tab } from 'react-native-easy-tabs';
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
import { dimensions, fontSizes } from '../../styles';

const ProfileScreen = ({
  user,
  selectedTabIndex,
  onChangeTabIndex,
  listings,
  goToProduct,
}) => (
  <ScrollView style={s.container}>
    <View style={s.top}>
      <Avatar user={user} large />
      <Text xmediumSize style={s.userName}>
        {user.profile.displayName}
      </Text>
      <View style={s.rating}>
        <Rating value={4} />
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
            text: `${i18n.t('profile.listings')} (${
              listings.length
            })`,
          },
          {
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
          <ReviewsView reviews={[]} />
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
  onChangeTabIndex: T.func,
  listings: T.array,
  goToProduct: T.func,
};

export default ProfileScreen;
