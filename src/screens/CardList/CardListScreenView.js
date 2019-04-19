import React from 'react';
import { View } from 'react-native';
// import T from 'prop-types';
import s from './styles';
import i18n from '../../i18n';
import { Text } from '../../components';

const CardListScreenView = () => (
  <View style={s.container}>
    <Text xlargeSize>Your cards</Text>
  </View>
);

CardListScreenView.navigationOptions = () => ({
  title: i18n.t('cardList.cardList'),
});

CardListScreenView.propTypes = {};

export default CardListScreenView;
