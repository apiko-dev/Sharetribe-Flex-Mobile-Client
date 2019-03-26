/* eslint-disable consistent-return */
import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { FlatListVertical } from '../../../../components';
import FlatListHorizontal from '../FlatListHorizontal/FlatListHorizontal';
import i18n from '../../../../i18n';
import RenderProductButton from './components/RenderProductButton';

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
  }) => (
    <View style={s.container}>
      {search.length && (
        <FlatListVertical
          data={searchListings}
          keyExtractor={(item) => item.id}
          numColumns={2}
          emptyListIconName="outline-search-24px"
          emptyListMessage={i18n.t('home.nothingWasFound')}
          renderItem={({ item }) => (
            <RenderProductButton
              item={item}
              goToProduct={goToProduct}
            />
          )}
        />
      )}

      {category && subCategory && (
        <FlatListVertical
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          emptyListMessage={i18n.t('home.emptyList')}
          renderItem={({ item }) => (
            <RenderProductButton
              item={item}
              goToProduct={goToProduct}
            />
          )}
        />
      )}

      {!search.length && !(category && subCategory) && (
        <FlatListVertical
          style={s.listContainer}
          data={sectionList}
          keyExtractor={(item) => item}
          emptyListMessage={i18n.t('home.emptyList')}
          renderItem={({ item: categoryItem }) => (
            <FlatListHorizontal
              data={listingsFilter(listings, categoryItem)}
              showHeader
              headerStyle={s.section}
              headerTitle={categoryItem}
              headerTitleTextTouchable={i18n.t('home.seeAll')}
              headerOnPressTextTouchable={() =>
                chooseCategory(
                  category || categoryItem,
                  category && categoryItem,
                )
              }
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              emptyListMessage={i18n.t('home.emptyList')}
              renderItem={({ item }) => (
                <RenderProductButton
                  item={item}
                  goToProduct={goToProduct}
                />
              )}
            />
          )}
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
};

export default ListView;
