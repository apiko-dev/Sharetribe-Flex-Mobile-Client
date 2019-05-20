import React from 'react';
import { View } from 'react-native';

import { Text } from '../../components';

import s from './styles';

const ReviewScreen = () => {
  return (
    <View style={s.container}>
      <Text>Some review</Text>
    </View>
  );
};

ReviewScreen.navigationOptions = () => ({
  title: 'Add review',
});

ReviewScreen.propTypes = {};

export default ReviewScreen;
