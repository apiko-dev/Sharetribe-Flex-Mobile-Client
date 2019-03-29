/* eslint-disable consistent-return */
import React from 'react';
import { View, FlatList } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  Text,
  ProductButton,
  TextTouchable,
  Loader,
  EmptyFlatList,
} from '../../../../components';
import i18n from '../../../../i18n';
import { categories } from '../../../../constants';
import { colors } from '../../../../styles';
import IconAppLogo from '../../../../assets/png/icon-app-logo.png';

const ListView = React.memo(
  ({
    listings,
    isLoading,
    chooseCategory,
    category,
    subCategory,
    goToProduct,
    search,
    searchListings,
    isSearching,
  }) => {
    if (isLoading || isSearching) {
      return (
        <View style={s.container}>
          <Loader large color={colors.loader.secondary} />
        </View>
      );
    }

    if ((category && subCategory) || search.length) {
      const data = listings.filter(
        (i) => i.publicData.subCategory === subCategory && i,
      );

      return (
        <View style={s.container}>
          <View style={s.flatListContainer}>
            <FlatList
              style={s.flatListContainer}
              data={search ? searchListings : data}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={[
                s.flatList,
                data.length === 0 && s.emptyFlatList,
                search &&
                  searchListings.length === 0 &&
                  s.emptyFlatList,
              ]}
              columnWrapperStyle={s.columnWrapperStyle}
              ListEmptyComponent={() => (
                <EmptyFlatList
                  iconName={search && 'outline-search-24px'}
                  message={
                    search
                      ? i18n.t('home.nothingWasFound')
                      : i18n.t('home.emptyList')
                  }
                />
              )}
              renderItem={({ item }) => (
                <ProductButton
                  onPress={() => goToProduct(item.id)}
                  id={item.id}
                  title={item.title}
                  price={item.price.amount}
                  src={
                    item.relationships.getImages[0]
                      ? item.relationships.getImages[0].variants
                          .default.url
                      : IconAppLogo
                  }
                />
              )}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={s.container}>
        <FlatList
          style={s.listContainer}
          initialNumToRender={5}
          data={
            category
              ? categories[
                  categories.findIndex((i) => i.title === category)
                ].data
              : categories
          }
          keyExtractor={(item) => (category ? item : item.title)}
          ListEmptyComponent={
            <EmptyFlatList message={i18n.t('home.emptyList')} />
          }
          renderItem={({ item: categoryItem }) =>
            listings.filter(
              (i) =>
                i.publicData.category === categoryItem.title ||
                (category &&
                  i.publicData.category === category &&
                  i.publicData.subCategory === categoryItem),
            ).length > 0 && (
              <View style={s.section}>
                <View style={s.sectionTop}>
                  <Text xmediumSize bold>
                    {category ? categoryItem : categoryItem.title}
                  </Text>
                  <TextTouchable
                    onPress={() =>
                      chooseCategory(
                        category || categoryItem.title,
                        category && categoryItem,
                      )
                    }
                  >
                    {i18n.t('home.seeAll')}
                  </TextTouchable>
                </View>
                <View>
                  <FlatList
                    data={listings.filter((i) =>
                      category
                        ? categoryItem &&
                          i.publicData.category === category &&
                          i.publicData.subCategory === categoryItem
                        : categoryItem &&
                          i.publicData.category ===
                            categoryItem.title,
                    )}
                    ListEmptyComponent={() => (
                      <EmptyFlatList
                        message={i18n.t('home.emptyList')}
                      />
                    )}
                    renderItem={({ item }) => (
                      <ProductButton
                        onPress={() => goToProduct(item.id)}
                        id={item.id}
                        title={item.title}
                        price={item.price.amount}
                        src={
                          item.relationships.getImages[0]
                            ? item.relationships.getImages[0].variants
                                .default.url
                            : IconAppLogo
                        }
                      />
                    )}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            )
          }
        />
      </View>
    );
  },
);

ListView.propTypes = {
  listings: T.array,
  isLoading: T.bool,
  chooseCategory: T.func,
  category: T.string,
  subCategory: T.string,
  goToProduct: T.func,
  search: T.string,
  searchListings: T.array,
  isSearching: T.bool,
};

export default ListView;
