import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { Text, Avatar } from '../../components';
import i18n from '../../i18n';

const ProfileScreen = ({ user }) => (
  <View style={s.container}>
    <View style={s.top}>
      <Avatar user={user} large />
      <Text xmediumSize style={s.userName}>
        {`${user.firstName} ${user.lastName}`}
      </Text>
      <Text>{i18n.t('profile.testTextBio')}</Text>
    </View>
  </View>
);

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('userName', 'User profile'),
});

ProfileScreen.propTypes = {
  user: T.object,
};

export default ProfileScreen;
