import React from 'react';
import { View, Image, ImageBackground, ScrollView } from 'react-native';
import T from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Tab, TabView } from 'react-native-easy-tabs';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import s from './styles';
import i18n from '../../i18n';
import { width, height } from '../../styles/dimensions';
import { NavigationButton, Rating, Text, Touchable, TabHeader } from '../../components';
// import Label from './components/Label/LabelView';
import DescriptionTab from './components/DescriptionTab/DescriptionTabContainer';

const placeholderImage = require('../../assets/png/Group.png');

const textMs = "1sdsdsdsdsd 2sdsdsdsdsd 3sdsdsdsdsd 4sdsdsdsdsd 5sdsdsdsdsd 6sdsdsdsdsd 7sdsdsdsdsd s8dsdsdsdsd 9sdsdsdsdsd 10sdsdsdsdsd 111111 22222 33333 4444 555 666 777"


const ProductScreen = ({
  onChangeIndex,
  currentIndex,
  product,
  images,
  labels,
  user,
  onChangeTabIndex,
  tabIndex
}) => (
  <ScrollView style={s.container}>
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
    <View style={s.containerTabView}>
      <TabHeader
        currentTabIndex={tabIndex}
        onChangeTabIndex={onChangeTabIndex}
      />

      <TabView selectedTabIndex={tabIndex}>
        <View style={s.tab1}>
          <Tab>
            <DescriptionTab text={textMs} />
          </Tab>
        </View>
        <Tab lazy>
          <View style={s.tab2}>
            <Text style={s.paragraph}>Second tab</Text>
          </View>
        </Tab>
      </TabView>
    </View>
    <View style={s.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={s.map}
        // Test region
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Text>Lviv</Text>
      </MapView>
    </View>
  </ScrollView>
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
