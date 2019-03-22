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
} from '../../../../components';
import i18n from '../../../../i18n';
import { categories } from '../../../../constants';
import { colors } from '../../../../styles';

const ListView = React.memo(
  ({
    listings,
    isLoading,
    chooseCategory,
    category,
    subCategory,
    goToProduct,
  }) => {
    if (isLoading) {
      return (
        <View style={s.container}>
          <Loader large color={colors.loader.secondary} />
        </View>
      );
    }

    if (category && subCategory) {
      return (
        <View style={s.container}>
          <View style={s.flatListContainer}>
            <FlatList
              style={s.flatListContainer}
              data={listings}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={s.flatList}
              renderItem={({ item }) => {
                if (
                  item.publicData.category === category &&
                  item.publicData.subCategory === subCategory
                ) {
                  return (
                    <ProductButton
                      onPress={() => goToProduct(item.id)}
                      id={item.id}
                      title={item.title}
                      price={item.price.amount}
                      uri={item.relationships.getImages[0]}
                    />
                  );
                }
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={s.container}>
        <FlatList
          style={s.listContainer}
          data={
            category
              ? categories.filter(
                  (i) =>
                    i.title === category &&
                    i.data.map((item) => ({ title: item })),
                )[0].data
              : categories
          }
          keyExtractor={(item) => (category ? item : item.title)}
          item
          renderItem={({ item: categoryItem }) => (
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
                  data={listings}
                  renderItem={({ item }) => {
                    if (category) {
                      if (
                        item.publicData.subCategory === categoryItem
                      ) {
                        return (
                          <ProductButton
                            onPress={() => goToProduct(item.id)}
                            id={item.id}
                            title={item.title}
                            price={item.price.amount}
                            uri={item.relationships.getImages[0]}
                          />
                        );
                      }

                      return null;
                    }

                    if (
                      item.publicData.category === categoryItem.title
                    ) {
                      return (
                        <ProductButton
                          onPress={() => goToProduct(item.id)}
                          id={item.id}
                          title={item.title}
                          price={item.price.amount}
                          uri={item.relationships.getImages[0]}
                        />
                      );
                    }
                  }}
                  horizontal
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          )}
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
};

export default ListView;
