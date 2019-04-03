import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import { MapView } from '../../../../components';
import s from './styles';

const Location = () => (
  <View style={s.container}>
    <MapView liteMode />
    <View pointerEvents="box-only" style={s.bannerContainer}>
      <View style={s.banner}>
        <Text>Lviv</Text>
      </View>
    </View>
  </View>
);

Location.propTypes = {};

export default Location;
