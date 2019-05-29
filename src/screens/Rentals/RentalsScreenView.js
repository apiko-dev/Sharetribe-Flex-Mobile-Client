/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { TabView, Tab } from 'react-native-easy-tabs';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { Text } from '../../components';
import i18n from '../../i18n';
import {} from './components';

const RentalsScreen = () => (
  <View>
    <Text>Rentals</Text>
  </View>
);

RentalsScreen.navigationOptions = () => ({
  // headerLeft: navigation.getParam('isDrawerButton') ? (
  //   <DrawerButton />
  // ) : (
  //   <HeaderBackButton />
  // ),
  // title: navigation.getParam('userName', 'User profile'),
});

RentalsScreen.propTypes = {};

export default observer(RentalsScreen);
