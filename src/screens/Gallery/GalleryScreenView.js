import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Pagination } from 'react-native-snap-carousel';

import { NavigationButton } from '../../components';
import { colors } from '../../styles';
import s from './styles';

const GalleryScreen = ({
  navigation,
  onChangeIndex,
  currentIndex,
}) => {
  const images = navigation.getParam('images');
  return (
    <View style={s.container}>
      <ImageViewer
        imageUrls={images}
        onChange={(index) => onChangeIndex(index)}
        index={currentIndex}
        renderIndicator={() => null}
      />
      <Pagination
        activeDotIndex={currentIndex}
        dotsLength={images.length}
        containerStyle={s.paginationContainerStyle}
        dotStyle={s.dotStyle}
      />
    </View>
  );
};

GalleryScreen.navigationOptions = () => ({
  title: 'Photo',
  headerTransparent: true,
  headerStyle: s.headerStyle,
  headerLeft: (
    <NavigationButton goBack circled tintColor={colors.text.white} />
  ),
});

GalleryScreen.propTypes = {
  navigation: T.any,
  onChangeIndex: T.func,
  currentIndex: T.number,
};

export default GalleryScreen;
