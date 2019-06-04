import React from 'react';
import RNCarousel from 'react-native-snap-carousel';
import { withProps, hoistStatics } from 'recompose';
import PlaceholderCard from './PlaceholderCard';

const Carousel = (props) => <RNCarousel {...props} />;

Carousel.PlaceholderCard = PlaceholderCard;

const enhancer = withProps((props) => ({
  data: props.showFooter
    ? props.data.concat({
        key: 'footer',
        renderItem: () => props.footerComponent,
      })
    : props.data,

  keyExtractor: (item) => item.key || props.keyExtractor(item),

  renderItem: (itemProps) =>
    itemProps.item.renderItem
      ? itemProps.item.renderItem(itemProps)
      : props.renderItem(itemProps),
}));

export default hoistStatics(enhancer)(Carousel);
