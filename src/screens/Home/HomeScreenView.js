import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { TabView, Tab } from 'react-native-easy-tabs';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { DrawerButton } from '../../components';
import { ListView, TabBar, SearchInput, MapBox } from './components';
import i18n from '../../i18n';
import { dimensions } from '../../styles';
import { width } from '../../styles/dimensions';

const HomeScreen = ({
  goToCategory,
  category,
  subCategory,
  selectedTabIndex,
  onChangeTabIndex,
  search,
  chooseCategory,
  fetchAllListings,
  isRefreshing,
  markers,
  products,
  selectedMarkerIndex,
  onPressMarker,
}) => (
  <View style={s.container}>
    <TabBar
      goToCategory={goToCategory}
      category={category}
      subCategory={subCategory}
      selectedTabIndex={selectedTabIndex}
      onChangeTabIndex={onChangeTabIndex}
    />
    <View style={s.tabView}>
      <TabView
        selectedTabIndex={selectedTabIndex}
        layoutWidth={dimensions.width}
      >
        <Tab>
          <ListView
            category={category}
            subCategory={subCategory}
            search={search}
            chooseCategory={chooseCategory}
            fetchAllListings={fetchAllListings}
            isRefreshing={isRefreshing}
          />
        </Tab>
        <Tab lazy>
          <MapBox
            markers={markers}
            items={products}
            currentWidth={width}
            currentHeight={200}
            selectedMarkerIndex={selectedMarkerIndex}
            onPressMarker={onPressMarker}
          />
        </Tab>
      </TabView>
    </View>
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
  fetchAllListings: T.func,
  isRefreshing: T.bool,
  markers: T.array,
  products: T.array,
  selectedMarkerIndex: T.number,
  onPressMarker: T.func,
};

export default observer(HomeScreen);
