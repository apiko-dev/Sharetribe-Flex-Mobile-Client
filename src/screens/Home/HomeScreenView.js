import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { TabView, SceneMap } from 'react-native-tab-view';
import s from './styles';
import { DrawerButton } from '../../components';
import { ListView, MapView, TabBar } from './components';
import i18n from '../../i18n';

const HomeScreen = ({ onChangeTabIndex, tabRoutes, tabIndex }) => (
  <View style={s.container}>
    <View>
      <TabView
        swipeEnabled={false}
        navigationState={{
          index: tabIndex,
          routes: tabRoutes,
        }}
        renderScene={SceneMap({
          listView: ListView,
          mapVIew: MapView,
        })}
        onIndexChange={(index) => onChangeTabIndex(index)}
        style={s.tabView}
        renderTabBar={(props) => <TabBar {...props} />}
      />
    </View>
  </View>
);

HomeScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('home.home'),
});

HomeScreen.propTypes = {
  onChangeTabIndex: T.func,
  tabRoutes: T.array,
  tabIndex: T.number,
};

export default HomeScreen;
