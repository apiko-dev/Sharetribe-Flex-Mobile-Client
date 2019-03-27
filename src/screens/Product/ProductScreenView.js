import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import T from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import s from './styles';
// import { Text } from '../../components';
import { width, height } from '../../styles/dimensions';

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

const placeholderImage = require('../../assets/png/icon-app-logo.png');

const ProductScreen = ({ onChangeIndex, currentIndex }) => (
  <View style={s.container}>
    <Carousel
      data={dataItems}
      layout="default"
      renderItem={({ item }) => (
        <View style={s.slide}>
          <ImageBackground
            source={placeholderImage}
            style={s.carouselBackgroundImage}
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
      onSnapToItem={(index) => onChangeIndex(index)}
    />
    <Pagination
      activeDotIndex={currentIndex}
      dotsLength={dataItems.length}
      containerStyle={s.paginationContainerStyle}
      dotStyle={s.dotStyle}
    />
  </View>
);

ProductScreen.navigationOptions = () => ({
  headerTransparent: true,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});

ProductScreen.propTypes = {
  onChangeIndex: T.func,
  currentIndex: T.number,
};

export default ProductScreen;
