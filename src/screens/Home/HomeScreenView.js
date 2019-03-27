/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { DrawerButton, TabContainer } from '../../components';
import { ListView, MapView, TabBar, SearchInput } from './components';
import i18n from '../../i18n';

const HomeScreen = ({
  goToCategory,
  category,
  subCategory,
  selectedTabIndex,
  onChangeTabIndex,
  search,
  chooseCategory,
}) => (
  <View style={s.container}>
    <TabBar
      goToCategory={goToCategory}
      category={category}
      subCategory={subCategory}
      selectedTabIndex={selectedTabIndex}
      onChangeTabIndex={onChangeTabIndex}
    />
    <TabContainer tabIndex={0} selectedTabIndex={selectedTabIndex}>
      <ListView
        category={category}
        subCategory={subCategory}
        search={search}
        chooseCategory={chooseCategory}
      />
    </TabContainer>
    <TabContainer
      tabIndex={1}
      selectedTabIndex={selectedTabIndex}
      lazy
    >
      <MapView />
    </TabContainer>
  </View>
);

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: <DrawerButton />,
  headerTitle: (
    <SearchInput
      placeholder={`${i18n.t('home.search')}...`}
      value={navigation.getParam('value')}
      onChangeText={navigation.getParam('onChangeSearch')}
    />
  ),
});

HomeScreen.propTypes = {
  selectedTabIndex: T.number,
  onChangeTabIndex: T.func,
  goToCategory: T.func,
  category: T.string,
  subCategory: T.string,
  search: T.string,
  chooseCategory: T.func,
};

export default HomeScreen;
