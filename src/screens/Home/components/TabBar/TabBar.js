import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import T from 'prop-types';
import { Text, IconFonts } from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';
import { colors } from '../../../../styles';

const TabBar = ({
  navigationState,
  jumpTo,
  goToCategory,
  category,
  subCategory,
}) => (
  <View style={s.tabBar}>
    <View style={s.categoryContainer}>
      <Text onPress={goToCategory}>
        {category || subCategory || i18n.t('home.category')}
      </Text>
    </View>
    <View style={s.switch}>
      {navigationState.routes.map((route, i) => {
        const isActive = navigationState.index === i;

        return (
          <TouchableOpacity
            key={route.key}
            style={[s.tabItem, isActive && s.activeTabItem]}
            onPress={() => jumpTo(route.key)}
          >
            <IconFonts
              name={route.iconName}
              tintColor={
                isActive
                  ? colors.switch.activeIcon
                  : colors.switch.icon
              }
              size={isActive ? 16 : 20}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

TabBar.propTypes = {
  navigationState: T.any,
  jumpTo: T.func,
  goToCategory: T.func,
  category: T.string,
  subCategory: T.string,
};

export default TabBar;
