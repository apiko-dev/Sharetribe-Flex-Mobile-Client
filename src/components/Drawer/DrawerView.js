import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import Logo from '../Logo/Logo';
import { DrawerItem } from './components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import TextTouchable from '../TextTouchable/TextTouchable';
import s from './styles';
import i18n from '../../i18n';
import IconAppLogo from '../../assets/png/icon-app-logo.png';

const Drawer = ({ isAuthorized, user, items }) => (
  <SafeAreaView style={s.container} forceInset={{ bottom: 'never' }}>
    <View style={s.drawerContainer}>
      <View style={s.header}>
        <Logo size="small" style={s.logoHeader} />
      </View>
      <View style={s.userContainer}>
        <ImageBackground
          source={IconAppLogo}
          style={s.logoImageBackground}
          imageStyle={s.logoBackground}
        >
          {user && user.image && <Image source={user.image} />}
        </ImageBackground>
        <View style={s.userProfileContainer}>
          {isAuthorized ? (
            <React.Fragment>
              <Text bold black>
                {`${i18n.t('common.hello')}, ${user.firstName}`}
              </Text>
              <TextTouchable>
                {i18n.t('common.viewProfile')}
              </TextTouchable>
            </React.Fragment>
          ) : (
            <Text bold black>
              {`${i18n.t('common.hello')}, ${i18n.t(
                'common.joinToUs',
              )}`}
            </Text>
          )}
        </View>
      </View>
      <View style={s.drawerMain}>
        <View>
          {items.map((item) => (
            <DrawerItem {...item} screen={item.screen} />
          ))}
        </View>
        {isAuthorized && (
          <View style={s.addGoodsButtonContainer}>
            <Button
              primary
              title={`+ ${i18n.t('drawer.addYourGoods')}`}
            />
          </View>
        )}
      </View>
    </View>
  </SafeAreaView>
);

Drawer.propTypes = {
  isAuthorized: T.bool,
  user: T.any,
  items: T.array,
};

export default Drawer;
