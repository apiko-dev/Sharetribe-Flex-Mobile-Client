import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import T from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import s from './styles';
import { Text } from '../../components';

const dataItems = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
];
const { width, height } = Dimensions.get('window');

const ProductScreen = ({ id }) => (
  <View style={s.container}>
    {/* <Text>{id}</Text */}
    <Carousel
      // ref={(c) => {
      //   this._carousel = c;
      // }}
      data={dataItems}
      renderItem={({ item }) => (
        <View style={s.slide}>
          <Image
            source={{ uri: item.illustration }}
            style={s.image}
          />
        </View>
      )}
      sliderWidth={width}
      // sliderHeight={325}
      itemWidth={width}
    />
  </View>
);

ProductScreen.navigationOptions = () => ({
  title: 'Product name',
});

ProductScreen.propTypes = {
  id: T.string,
};

export default ProductScreen;
