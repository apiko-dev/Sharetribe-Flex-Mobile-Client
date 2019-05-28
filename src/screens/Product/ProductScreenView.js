import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import T from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Tab, TabView } from 'react-native-easy-tabs';
import { observer } from 'mobx-react/custom';
import s from './styles';
import i18n from '../../i18n';
import { width } from '../../styles/dimensions';
import {
  NavigationButton,
  Rating,
  Text,
  Touchable,
  TabHeader,
  Footer,
  ReviewsList,
} from '../../components';
import Label from './components/Label/Label';
import DescriptionTab from './components/DescriptionTab/DescriptionTabContainer';

import { colors } from '../../styles';

const placeholderImage = require('../../assets/png/Group.png');

const tabs = [
  {
    id: '1',
    text: i18n.t('addNewItem.description'),
  },
  {
    id: '2',
    text: i18n.t('addNewItem.reviews'),
  },
];

const ProductScreen = ({
  onChangeIndex,
  currentIndex,
  product,
  author,
  images,
  onChangeTabIndex,
  tabIndex,
  navigateToImageScreen,
  gallery,
  isLoadingDates,
  isSending,
  navigationToRequestToRent,
  navigationToCalendar,
  phoneNumber,
  onCall,
  onSend,
  averageRatingForUser,
  averageRatingForListing,
  reviews,
}) => (
  <ScrollView style={s.container} bounces={false}>
    <View style={s.carouselContainer}>
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <Touchable
            activeOpacity={1}
            style={s.slide}
            onPress={() =>
              navigateToImageScreen(gallery, currentIndex)
            }
          >
            <ImageBackground
              source={placeholderImage}
              style={s.carouselBackgroundImage}
            >
              <Image source={{ uri: item }} style={s.image} />
            </ImageBackground>
          </Touchable>
        )}
        sliderWidth={width}
        sliderHeight={325}
        itemWidth={width}
        onSnapToItem={(index) => onChangeIndex(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
      <Pagination
        activeDotIndex={currentIndex}
        dotsLength={images.length}
        containerStyle={s.paginationContainerStyle}
        dotStyle={s.dotStyle}
      />
    </View>
    <View style={s.infoContainer}>
      <View style={s.headerContainer}>
        <View style={s.priceContainer}>
          <Text xbigSize bold>
            {`$${product.price.amount}`}
          </Text>
          <Text xmediumSize gray style={s.day}>
            {`/${i18n.t('home.day')}`}
          </Text>
        </View>
        {product.leaseStatus && (
          <View style={s.leaseContainer}>
            <Text bold red>
              {i18n.t('common.nowOnLease')}
            </Text>
          </View>
        )}
      </View>
      <View style={s.titleTextContainer}>
        <Text largeSize black>
          {product.title}
        </Text>
      </View>
      <View style={s.rating}>
        <Rating value={averageRatingForListing} />
      </View>
    </View>
    <Label.Row style={s.labelContainer}>
      <Label text={product.publicData.brand} title="Brand" />
      <Label
        text={product.publicData.subCategory}
        title="Subcategory"
      />
      <Label text={product.publicData.category} title="Category" />
    </Label.Row>
    <View style={s.containerTabView}>
      <TabHeader
        currentTabIndex={tabIndex}
        onChangeTabIndex={onChangeTabIndex}
        tabs={tabs}
      />

      <TabView selectedTabIndex={tabIndex}>
        <Tab>
          <View style={s.tabDescription}>
            <DescriptionTab
              text={product.description}
              user={author}
              location={product.publicData.location}
              geolocation={product.geolocation}
              isLoadingDates={isLoadingDates}
              navigationToCalendar={navigationToCalendar}
              isOnLease={product.leaseStatus}
              nearestAvailableDate={product.nearestAvailableDate}
              averageRatingForUser={averageRatingForUser}
            />
          </View>
        </Tab>
        <Tab lazy>
          <View style={s.tabReviews}>
            <ReviewsList reviews={reviews} />
          </View>
        </Tab>
      </TabView>
    </View>
    {!product.canEdit && (
      <Footer
        phone={phoneNumber}
        onCall={onCall}
        navigationToRequestToRent={navigationToRequestToRent}
        onSend={onSend}
        isSending={isSending}
      />
    )}
  </ScrollView>
);

ProductScreen.navigationOptions = ({ navigation }) => ({
  headerTransparent: true,
  headerStyle: s.headerStyle,
  headerRight: navigation.getParam('navigateToProductEdit') ? (
    <NavigationButton
      name="edit"
      tintColor={colors.text.white}
      right
      onPress={navigation.getParam('navigateToProductEdit')}
      circled
    />
  ) : null,
  headerLeft: (
    <NavigationButton goBack tintColor={colors.text.white} circled />
  ),
});

ProductScreen.propTypes = {
  onChangeIndex: T.func,
  currentIndex: T.number,
  product: T.object,
  author: T.object,
  images: T.array,
  onChangeTabIndex: T.func,
  tabIndex: T.number,
  navigateToImageScreen: T.func,
  onCall: T.func,
  gallery: T.array,
  isLoadingDates: T.bool,
  navigationToRequestToRent: T.func,
  navigationToCalendar: T.func,
  phoneNumber: T.string,
  onSend: T.func,
  isSending: T.bool,
  averageRatingForUser: T.number,
  averageRatingForListing: T.number,
  reviews: T.array,
};
export default observer(ProductScreen);
