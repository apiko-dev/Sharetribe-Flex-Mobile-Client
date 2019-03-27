import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import T from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import s from './styles';
import { Text } from '../../components';
import i18n from '../../i18n';
import { colors } from '../../styles';
import { width, height } from '../../styles/dimensions';
import { NavigationButton, Rating } from '../../components';

const placeholderImage = require('../../assets/png/icon-app-logo.png');

const ProductScreen = ({
  onChangeIndex,
  currentIndex,
  product,
  images,
}) => (
  <View style={s.container}>
    <View style={s.carouselContainer}>
      <Carousel
        data={images}
        layout="default"
        renderItem={({ item }) => (
          <View style={s.slide}>
            <ImageBackground
              source={placeholderImage}
              style={s.carouselBackgroundImage}
            >
              <Image source={{ uri: item }} style={s.image} />
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
        dotsLength={images.length}
        containerStyle={s.paginationContainerStyle}
        dotStyle={s.dotStyle}
      />
    </View>
    <View style={s.headerContainer}>
      <View style={s.priceContainer}>
        <Text xlargeSize bold>${product.price.amount}</Text>
        <Text xmediumSize gray >/{i18n.t('home.day')}</Text>
      </View>
      <View style={s.availabilityContainer}>
        <Text mediumSize red>
          lease
        </Text>
      </View>
    </View>
    <View style={s.titleTextContainer}>
      <Text largeSize bold black>{product.title}</Text>
    </View>
    <View style={s.rating}>
      <Rating value={4} />
    </View>
    <View>
      
    </View>
  </View>
);

ProductScreen.navigationOptions = () => ({
  headerTransparent: true,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerRight: (
    <NavigationButton
      name="outline-edit-24px"
      color="white"
      right
      // onPress={}
      circled
    />
  ),
  headerLeft: <NavigationButton goBack color="white" circled />,
});

ProductScreen.propTypes = {
  onChangeIndex: T.func,
  currentIndex: T.number,
};

export default ProductScreen;
