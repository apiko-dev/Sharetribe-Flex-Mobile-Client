import React from 'react';
import { View } from 'react-native';
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

const MyListingsScreen = ({
  listings,
  goToAddNewItem,
  goToProduct,
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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RenderProductButton goToProduct={goToProduct} item={item} />
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
};

export default MyListingsScreen;
