/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { View, ScrollView } from 'react-native';
import T from 'prop-types';
import { TabView, Tab } from 'react-native-easy-tabs';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { Text, TabHeader } from '../../components';
import i18n from '../../i18n';

const tabs = [
  {
    id: '1',
    text: i18n.t('rentals.dashboard'),
  },
  {
    id: '2',
    text: i18n.t('rentals.borrowing'),
  },
  {
    id: '3',
    text: i18n.t('rentals.lending'),
  },
];

const RentalsScreen = ({ tabIndex, onChangeTabIndex }) => (
  <View style={s.container}>
    <View style={s.tabHeaderContainer}>
      <TabHeader
        currentTabIndex={tabIndex}
        onChangeTabIndex={onChangeTabIndex}
        tabs={tabs}
        activeTabStyle={s.activeTabStyle}
        inactiveTabStyle={s.inactiveTabStyle}
        inactiveTextStyle={s.inactiveTextStyle}
        activeTextStyle={s.activeTextStyle}
        containerTabStyle={s.containerTabStyle}
      />
    </View>
    <View style={s.containerTabView}>
      <TabView selectedTabIndex={tabIndex}>
        <Tab>
          <View style={s.tabHeader}>
            <Text>Tab1</Text>
          </View>
        </Tab>
        <Tab>
          <View style={s.tabHeader}>
            <Text>Tab2</Text>
          </View>
        </Tab>
        <Tab>
          <View style={s.tabHeader}>
            <Text>Tab3</Text>
          </View>
        </Tab>
      </TabView>
    </View>
  </View>
);

RentalsScreen.navigationOptions = () => ({
  title: 'Rentals',
});

RentalsScreen.propTypes = {
  onChangeTabIndex: T.func,
  tabIndex: T.number,
};

export default observer(RentalsScreen);
