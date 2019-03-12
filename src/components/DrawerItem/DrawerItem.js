import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import IconFonts from '../IconFonts/IconFonts';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable'; // eslint-disable-line
import s from './styles';
import { NavigationService } from '../../services';

const DrawerItem = ({ iconName, title, screen, onPress }) => {
  const onPressTouchable = () => {
    if (onPress) {
      onPress();
    }

    NavigationService.navigateTo(screen);
    NavigationService.closeDrawer();
  };

  return (
    <Touchable onPress={onPressTouchable}>
      <View style={s.item}>
        <IconFonts name={iconName} size={25} />
        <Text mediumSize style={s.text}>
          {title}
        </Text>
      </View>
    </Touchable>
  );
};

DrawerItem.propTypes = {
  iconName: T.string,
  title: T.string,
  screen: T.string,
  onPress: T.func,
};

export default DrawerItem;
