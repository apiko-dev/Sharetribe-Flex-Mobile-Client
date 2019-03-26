import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
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

const placeholderImage = require('../../assets/png/icon-app-logo.png');

const ProductScreen = ({ id }) => (
  <View style={s.container}>
    <Carousel
      data={dataItems}
      renderItem={({ item }) => (
        <View style={s.slide}>
          <ImageBackground
            source={placeholderImage}
            style={{ height: 325, width: '100%' }}
          >
            <Image
              source={{ uri: item.illustration }}
              style={s.image}
            />
          </ImageBackground>
        </View>
      )}
      sliderWidth={width}
      sliderHeight={325}
      itemWidth={width}
    />
  </View>
);

ProductScreen.navigationOptions = () => ({
  headerTransparent: true,
  headerStyle: {
    // position: 'absolute',
    // zIndex: 100,
    // top: 0,
    // left: 0,
    // right: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});

ProductScreen.propTypes = {
  id: T.string,
};

export default ProductScreen;
