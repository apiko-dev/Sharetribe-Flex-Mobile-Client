/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { TabView, Tab } from 'react-native-easy-tabs';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { TabHeader, DrawerButton } from '../../components';
import i18n from '../../i18n';
import {
  BorrowingView,
  LendingView,
  DashboardView,
} from './components';

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

const RentalsScreen = ({
  tabIndex,
  onChangeTabIndex,
  borrowingTransactions,
  lendingTransactions,
  totalEarnings,
  totalSpend,
}) => (
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
            <DashboardView
              totalEarnings={totalEarnings}
              totalSpend={totalSpend}
              lendingRentals={lendingTransactions.length}
              borrowingRentals={borrowingTransactions.length}
            />
          </View>
        </Tab>
        <Tab lazy>
          <View style={s.tabHeader}>
            <BorrowingView
              borrowingTransactions={borrowingTransactions}
            />
          </View>
        </Tab>
        <Tab lazy>
          <View style={s.tabHeader}>
            <LendingView lendingTransactions={lendingTransactions} />
          </View>
        </Tab>
      </TabView>
    </View>
  </View>
);

RentalsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: 'Rentals',
});

RentalsScreen.propTypes = {
  onChangeTabIndex: T.func,
  tabIndex: T.number,
  borrowingTransactions: T.array,
  lendingTransactions: T.array,
  totalEarnings: T.func,
  totalSpend: T.func,
};

export default observer(RentalsScreen);
