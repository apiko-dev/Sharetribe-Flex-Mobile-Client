import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { observer } from 'mobx-react/custom';
import ProductButton from '../ProductButton/ProductButton';
import IconAppLogo from '../../assets/png/icon-app-logo.png';

const RenderProductButton = ({ item, goToProduct, ...props }) => (
  <ProductButton
    onPress={() => goToProduct(item)}
    id={item.id}
    title={item.title}
    price={item.price.amount}
    src={R.pathOr(
      IconAppLogo,
      [
        'relationships',
        'getImages',
        [0],
        'variants',
        'default',
        'url',
      ],
      item,
    )}
    {...props}
  />
);

RenderProductButton.propTypes = {
  item: T.object,
  goToProduct: T.func,
};

export default observer(RenderProductButton);
