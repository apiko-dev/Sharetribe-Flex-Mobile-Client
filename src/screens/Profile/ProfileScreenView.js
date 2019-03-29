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
  TextTouchable,
} from '../../components';
import i18n from '../../i18n';
import { ListingsView } from './components';
import { dimensions } from '../../styles';

const ProfileScreen = ({
  user,
  selectedTabIndex,
  onChangeTabIndex,
  listings,
}) => (
  <ScrollView style={s.container}>
    <View style={s.top}>
      <Avatar user={user} large />
      <Text xmediumSize style={s.userName}>
        {`${user.firstName} ${user.lastName}`}
      </Text>
      <View style={s.rating}>
        <Rating value={4} />
      </View>
      <Text style={s.bio}>{i18n.t('profile.testTextBio')}</Text>
      <TextTouchable style={s.moreButton}>More</TextTouchable>
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
          <ListingsView listings={listings} />
        </Tab>
        <Tab>
          <View>
            <Text>Reviews</Text>
          </View>
        </Tab>
      </TabView>
    </View>
  </ScrollView>
);

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('userName', 'User profile'),
});

ProfileScreen.propTypes = {
  user: T.object,
  selectedTabIndex: T.number,
  onChangeTabIndex: T.func,
  listings: T.array,
};

export default ProfileScreen;
