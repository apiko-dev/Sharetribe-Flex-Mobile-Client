/* eslint-disable max-len */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '../../components';
import Accordion from './components/Accordion/Accordion';
import i18n from '../../i18n';
import s from './styles';

const data = [
  {
    id: 1,
    title: 'About us',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 2,
    title: 'Profile',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 3,
    title: 'Settings',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 4,
    title: 'Some',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
];

function HomeScreen() {
  return (
    <ScrollView style={s.container}>
      <View style={s.headerContainer}>
        <Text largeSize bold>
          {`${i18n.t('helpScreen.helpCenter')}`}
        </Text>
        <Text style={s.headerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Text>
      </View>
      {data.map((item) => (
        <Accordion {...item} key={item.id} />
      ))}
      <Text light gray style={s.footerText}>
        {`${i18n.t('helpScreen.privacyPolicy')}`}
      </Text>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = () => ({
  title: 'Help',
});

export default HomeScreen;
