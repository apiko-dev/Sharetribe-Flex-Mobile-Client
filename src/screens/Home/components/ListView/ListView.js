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

const ListView = ({ listings }) => (
  <View style={s.container}>
    <ScrollView style={s.listContainer}>
      {categories.map((category) => (
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
              renderItem={({ item }) => (
                <ProductButton
                  title={item.attributes.title}
                  price="10"
                />
              )}
              horizontal
              // keyExtractor={(item) => item.attributes}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

ListView.propTypes = {
  listings: T.array,
};

export default ListView;
