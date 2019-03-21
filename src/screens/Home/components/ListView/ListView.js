import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  Text,
  ProductButton,
  TextTouchable,
} from '../../../../components';
import i18n from '../../../../i18n';
import { categories } from '../../../../constants';

const ListView = React.memo(({ listings }) => {
  return (
    <View style={s.container}>
      <ScrollView style={s.listContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.title}
          renderItem={({ item: category }) => (
            <View key={category.title} style={s.section}>
              <View style={s.sectionTop}>
                <Text xmediumSize bold>
                  {category.title}
                </Text>
                <TextTouchable>{i18n.t('home.seeAll')}</TextTouchable>
              </View>
              <View>
                <FlatList
                  data={listings}
                  renderItem={({ item }) => {
                    if (item.publicData.category === category.title) {
                      return (
                        <ProductButton
                          title={item.title}
                          price={item.price.amount}
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
      </ScrollView>
    </View>
  );
});

ListView.propTypes = {
  listings: T.array,
};

export default ListView;
