/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { View, RefreshControl } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  Text,
  FlatListVertical,
  Button,
  DrawerButton,
  RenderProductButton,
} from '../../components';
import i18n from '../../i18n';
import { colors } from '../../styles';

const MyListingsScreen = ({
  listings,
  goToAddNewItem,
  goToProduct,
  isRefreshing,
  fetchAllListings,
}) => (
  <View style={s.container}>
    <FlatListVertical
      ListHeaderComponent={() => (
        <Text xmediumSize bold style={s.header}>
          {`${i18n.t('myListings.youHave')} ${
            listings.length
          } ${i18n.t('myListings.listings')}`}
        </Text>
      )}
      data={listings}
      numColumns={2}
      emptyListMessage={i18n.t('myListings.noListings')}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RenderProductButton
          goToProduct={goToProduct}
          item={item}
          forTwoColumns
        />
      )}
      ListFooterComponent={() => (
        <Button
          containerStyle={s.buttonContainer}
          title={`+${i18n.t('myListings.addNewItem')}`}
          primary
          onPress={goToAddNewItem}
          buttonStyle={s.button}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={fetchAllListings}
          tintColor={colors.loader.secondary}
        />
      }
    />
  </View>
);

MyListingsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('myListings.myListings'),
});

MyListingsScreen.propTypes = {
  listings: T.array,
  goToAddNewItem: T.func,
  goToProduct: T.func,
  fetchAllListings: T.func,
  isRefreshing: T.bool,
};

export default MyListingsScreen;
