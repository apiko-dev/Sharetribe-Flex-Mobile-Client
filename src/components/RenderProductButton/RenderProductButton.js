import React from 'react';
import T from 'prop-types';
import ProductButton from '../ProductButton/ProductButton';
import IconAppLogo from '../../assets/png/icon-app-logo.png';

const RenderProductButton = ({ item, goToProduct, ...props }) => (
  <ProductButton
    onPress={() => goToProduct(item)}
    id={item.id}
    title={item.title}
    price={item.price.amount}
    src={
      item.relationships.getImages[0]
        ? item.relationships.getImages[0].variants.default.url
        : IconAppLogo
    }
    {...props}
  />
);

RenderProductButton.propTypes = {
  item: T.object,
  goToProduct: T.func,
};

export default RenderProductButton;
