import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import Logo from '../Logo/Logo';
import { DrawerItem } from './components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import TextTouchable from '../TextTouchable/TextTouchable';
import s from './styles';
import i18n from '../../i18n';
import Avatar from '../Avatar/Avatar';

const Drawer = ({
  isAuthorized,
  user,
  items,
  goToAddNewItem,
  goToProfile,
}) => (
  <SafeAreaView style={s.container} forceInset={{ bottom: 'never' }}>
    <View style={s.drawerContainer}>
      <View style={s.header}>
        <Logo size="small" style={s.logoHeader} />
      </View>
      <View style={s.userContainer}>
        <Avatar user={user} />
        <View style={s.userProfileContainer}>
          {isAuthorized ? (
            <View>
              <Text bold black>
                {`${i18n.t('common.hello')}, ${user.firstName}`}
              </Text>
              <TextTouchable
                onPress={() => goToProfile(user.id)}
                style={s.viewProfileButton}
              >
                {i18n.t('common.viewProfile')}
              </TextTouchable>
            </View>
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
            <DrawerItem
              {...item}
              screen={item.screen}
              key={item.iconName}
            />
          ))}
        </View>
        {isAuthorized && (
          <View style={s.addGoodsButtonContainer}>
            <Button
              primary
              title={`+ ${i18n.t('drawer.addYourGoods')}`}
              onPress={() => goToAddNewItem()}
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
  goToAddNewItem: T.func,
  goToProfile: T.func,
};

export default Drawer;
