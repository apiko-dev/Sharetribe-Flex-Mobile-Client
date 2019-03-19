import React from 'react';
import { View, SectionList, FlatList } from 'react-native';
import T from 'prop-types';
import s from './styles';
import i18n from '../../i18n';
import { CategorySectionHeader } from './components';
import { Button } from '../../components';
import { categories } from '../../constants';

const CategoryScreenView = ({ chooseCategory }) => (
  <View style={s.container}>
    <SectionList
      stickySectionHeadersEnabled={false}
      sections={categories}
      contentContainerStyle={s.sectionContainer}
      renderSectionHeader={({ section: { title } }) => (
        <CategorySectionHeader title={title} />
      )}
      renderItem={({ section: { title, data }, index }) => {
        if (index !== 0) return null;

        return (
          <FlatList
            style={s.sectionList}
            numColumns={3}
            containerStyle={s.sectionListContent}
            data={data}
            renderItem={({ item }) => (
              <Button
                buttonStyle={s.item}
                title={item}
                onPress={() => chooseCategory(title, item)}
                containerStyle={s.listItemContainer}
              />
            )}
            keyExtractor={(item) => item}
          />
        );
      }}
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
