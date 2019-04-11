/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  FlatListVertical,
  RenderProductButton,
} from '../../../../components';
import FlatListHorizontal from '../FlatListHorizontal/FlatListHorizontal';
import i18n from '../../../../i18n';
import { colors } from '../../../../styles';

const ListView = React.memo(
  ({
    listings,
    chooseCategory,
    category,
    subCategory,
    goToProduct,
    search,
    searchListings,
    data,
    sectionList,
    listingsFilter,
    isRefreshing,
    fetchAllListings,
  }) => (
    <View style={s.container}>
      {!!search && (
        <FlatListVertical
          data={searchListings}
          keyExtractor={(item) => item.id}
          numColumns={2}
          emptyListIconName="search"
          emptyListMessage={i18n.t('home.nothingWasFound')}
          renderItem={({ item }) => (
            <RenderProductButton
              item={item}
              goToProduct={goToProduct}
              forTwoColumns
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
      )}
      {!search && !!category && !!subCategory && (
        <FlatListVertical
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          emptyListMessage={i18n.t('home.emptyList')}
          renderItem={({ item }) => (
            <RenderProductButton
              item={item}
              goToProduct={goToProduct}
              forTwoColumns
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
      )}
      {!search && !(!!category && !!subCategory) && (
        <FlatList
          style={s.listContainer}
          data={sectionList}
          keyExtractor={(item) => item}
          emptyListMessage={i18n.t('home.emptyList')}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchAllListings}
              tintColor={colors.loader.secondary}
            />
          }
          renderItem={({ item: categoryItem }) =>
            !!listingsFilter(listings, categoryItem).length && (
              <FlatListHorizontal
                data={listingsFilter(listings, categoryItem)}
                isRefreshing={isRefreshing}
                fetchAllListings={fetchAllListings}
                headerTitle={categoryItem}
                headerTitleTextTouchable={i18n.t('home.seeAll')}
                headerOnPressTextTouchable={() =>
                  chooseCategory(
                    category || categoryItem,
                    category && categoryItem,
                  )
                }
                keyExtractor={(item) => item.id}
                emptyListMessage={i18n.t('home.emptyList')}
                renderItem={({ item }) => (
                  <RenderProductButton
                    item={item}
                    goToProduct={goToProduct}
                  />
                )}
              />
            )
          }
        />
      )}
    </View>
  ),
);

ListView.propTypes = {
  listings: T.array,
  chooseCategory: T.func,
  category: T.string,
  subCategory: T.string,
  goToProduct: T.func,
  search: T.string,
  searchListings: T.array,
  data: T.array,
  sectionList: T.array,
  listingsFilter: T.func,
  fetchAllListings: T.func,
  isRefreshing: T.bool,
};

export default observer(ListView);
