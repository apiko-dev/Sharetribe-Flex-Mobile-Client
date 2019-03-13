import React from 'react';
import { View, SectionList } from 'react-native';
import T from 'prop-types';
import s from './styles';
import i18n from '../../i18n';
import { CategoryItem, CategorySectionHeader } from './components';
import { categories } from '../../constants';

const CategoryScreenView = ({ chooseCategory }) => (
  <View style={s.container}>
    <SectionList
      sections={categories}
      renderSectionHeader={({ section: { title } }) => (
        <CategorySectionHeader title={title} />
      )}
      renderItem={({ item }) => (
        <CategoryItem
          title={item}
          onPress={() => chooseCategory(item)}
        />
      )}
      keyExtractor={(item) => item}
    />
  </View>
);

CategoryScreenView.navigationOptions = () => ({
  title: i18n.t('category.category'),
});

CategoryScreenView.propTypes = {
  chooseCategory: T.func,
};

export default CategoryScreenView;
