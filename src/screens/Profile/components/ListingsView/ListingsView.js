import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  FlatListVertical,
  RenderProductButton,
} from '../../../../components';
import i18n from '../../../../i18n';
import s from './styles';

const ListingsView = ({ listings, goToProduct }) => (
  <View style={s.container}>
    <FlatListVertical
      data={listings}
      numColumns={2}
      emptyListMessage={i18n.t('profile.noListings')}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RenderProductButton
          goToProduct={goToProduct}
          item={item}
          forTwoColumns
        />
      )}
    />
  </View>
);

ListingsView.propTypes = {
  listings: T.array,
  goToProduct: T.func,
};

export default ListingsView;
