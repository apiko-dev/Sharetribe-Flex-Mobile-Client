import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import IconFonts from '../../../IconFonts/IconFonts';
import Text from '../../../Text/Text';
import Touchable from '../../../Touchable/Touchable';
import s from './styles';
import { NavigationService } from '../../../../services';
import { colors } from '../../../../styles';

const DrawerItem = ({ iconName, title, screen, onPress }) => (
  <Touchable
    onPress={() => onPress(screen)}
    rippleColor={colors.drawerItem.rippleColor}
  >
    <View style={s.item}>
      <IconFonts name={iconName} size={25} />
      <Text mediumSize style={s.text}>
        {title}
      </Text>
    </View>
  </Touchable>
);

DrawerItem.defaultProps = {
  onPress: (screen) => {
    NavigationService.navigateTo(screen);
    NavigationService.closeDrawer();
  },
};

DrawerItem.propTypes = {
  iconName: T.string,
  title: T.string,
  screen: T.string,
  onPress: T.func,
};

export default DrawerItem;
