import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import T from 'prop-types';
import R from 'ramda';
import { observer } from 'mobx-react/custom';

import s from './styles';
import {
  Text,
  ShadowContainer,
  Touchable,
  ScreenLoader,
} from '../../../../components';
import i18n from '../../../../i18n';
import { NavigationService } from '../../../../services';

const placeholderImage = require('../../../../assets/png/Group.png');

function CarouselItem({ item, isLoading }) {
  const image = R.pathOr(
    placeholderImage,
    ['relationships', 'getImages', [0], 'getTitleImage'],
    item,
  );
  if (isLoading) {
    return (
      <View style={s.containerLoader}>
        <ScreenLoader />
      </View>
    );
  }
  return (
    <ShadowContainer>
      <Touchable
        onPress={() =>
          NavigationService.navigateToProduct({ product: item })
        }
      >
        <View style={s.container}>
          <View style={s.imageContainer}>
            <ImageBackground
              source={placeholderImage}
              style={s.carouselBackgroundImage}
            >
              <Image source={{ uri: image }} style={s.image} />
            </ImageBackground>
          </View>
          <View style={s.infoContainer}>
            <View style={s.priceAndLease}>
              <View style={s.priceContainer}>
                <Text xmedium bold>
                  {`$${item.price.amount}`}
                </Text>
                <Text xmedium gray style={s.day}>
                  {`/${i18n.t('home.day')}`}
                </Text>
              </View>
              {item.leaseStatus && (
                <View style={s.leaseContainer}>
                  <Text bold red>
                    {i18n.t('common.nowOnLease')}
                  </Text>
                </View>
              )}
            </View>
            <View style={s.titleTextContainer}>
              <Text xxmedium black>
                {item.title}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    </ShadowContainer>
  );
}

CarouselItem.propTypes = {
  item: T.object,
  isLoading: T.bool,
};

export default observer(CarouselItem);
