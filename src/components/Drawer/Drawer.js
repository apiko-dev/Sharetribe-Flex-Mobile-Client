import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { inject } from 'mobx-react/native';
import Logo from '../Logo/Logo';
import DrawerItem from '../DrawerItem/DrawerItem';
import Button from '../Button/Button';
import Text from '../Text/Text';
import TextTouchable from '../TextTouchable/TextTouchable';
import s from './styles';
import screens from '../../navigation/screens';
import i18n from '../../i18n';
import { AlertService } from '../../services';

const Drawer = ({ isAuthorized, user, logout }) => {
  let items;

  // TODO: Change screens
  const unauthorizedItems = [
    {
      screen: screens.Home,
      title: i18n.t('drawer.home'),
      iconName: 'homepage',
    },
    {
      screen: screens.Home,
      title: i18n.t('drawer.help'),
      iconName: 'help-lifeguard-symbol',
    },
    {
      screen: screens.Auth,
      title: i18n.t('drawer.login'),
      iconName: 'baseline-exit_to_app-24px',
    },
  ];

  const authorizedItems = [
    {
      screen: screens.Home,
      title: i18n.t('drawer.home'),
      iconName: 'homepage',
    },
    {
      screen: screens.Home,
      title: i18n.t('drawer.myListings'),
      iconName: 'list',
    },
    {
      screen: screens.Home,
      title: i18n.t('drawer.inbox'),
      iconName: 'message-closed-envelope',
    },
    {
      screen: screens.Home,
      title: i18n.t('drawer.rentals'),
      iconName: 'stats',
    },
    {
      screen: screens.Home,
      title: i18n.t('drawer.settings'),
      iconName: 'settings',
    },
    {
      screen: screens.Home,
      title: i18n.t('drawer.help'),
      iconName: 'help-lifeguard-symbol',
    },
    {
      screen: 'LogOut',
      title: i18n.t('drawer.logOut'),
      iconName: 'baseline-exit_to_app-24px',
      onPress: () => logout(),
    },
  ];

  if (isAuthorized) {
    items = authorizedItems;
  } else {
    items = unauthorizedItems;
  }

  return (
    <View>
      <View style={s.header}>
        <Logo size="small" />
      </View>
      {isAuthorized && (
        <View style={s.userContainer}>
          {/* TODO: Change temp circle by avatar */}
          <View style={s.tmpCircle} />
          <View style={s.userProfileContainer}>
            <Text bold black>
              {`${i18n.t('common.hello')}, ${user.firstName}`}
            </Text>
            <TextTouchable>
              {i18n.t('common.viewProfile')}
            </TextTouchable>
          </View>
        </View>
      )}
      {items.map((item) => (
        <DrawerItem {...item} screen={item.screen} />
      ))}
      {isAuthorized && (
        <View style={s.addGoodsButtonContainer}>
          <Button primary>
            {'+ '}
            {i18n.t('drawer.addYourGoods')}
          </Button>
        </View>
      )}
    </View>
  );
};

Drawer.propTypes = {
  isAuthorized: T.bool,
  user: T.any,
  logout: T.func,
};

export default compose(
  inject((stores) => ({
    isAuthorized: stores.auth.isAuthorized,
    logout: stores.auth.logout,
    user: stores.viewer.user,
  })),

  withHandlers({
    logout: (props) => () =>
      AlertService.logOut(() => props.logout.run()),
  }),
)(Drawer);
