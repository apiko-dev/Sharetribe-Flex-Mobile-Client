import React from 'react';
import { View } from 'react-native';
import Loader from '../Loader/Loader';
import s from './styles';

const ScreenLoader = () => (
  <View style={s.container}>
    <Loader large />
  </View>
);

export default ScreenLoader;
