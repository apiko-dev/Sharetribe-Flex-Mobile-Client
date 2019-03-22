import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import T from 'prop-types';
import { IconFonts, TextPicker } from '../../../../components';
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
      <TextPicker
        onPress={() => goToCategory({ onlyCategory: true })}
        iconNameRight="baseline-arrow_drop_down-24px"
      >
        {category || i18n.t('home.category')}
      </TextPicker>
      {!!category && (
        <TextPicker
          onPress={goToCategory}
          iconNameRight="baseline-arrow_drop_down-24px"
        >
          {subCategory || i18n.t('home.subCategory')}
        </TextPicker>
      )}
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
