/* eslint-disable consistent-return */
import React from 'react';
import { View, FlatList, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import s from './styles';
import EmptyFlatList from '../EmptyFlatList/EmptyFlatList';

const FlatListVertical = React.memo(
  ({
    data,
    emptyListMessage,
    emptyListIconName,
    emptyListIconSize,
    emptyListIconColor,
    numColumns,
    renderItem,
    keyExtractor,
    style,
    columnWrapperStyle,
    contentContainerStyle,
    ...props
  }) => (
    <View style={s.container}>
      <FlatList
        style={[s.flatList, style]}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        contentContainerStyle={[
          s.flatListContentContainer,
          data.length === 0 && s.emptyFlatList,
          contentContainerStyle,
        ]}
        columnWrapperStyle={[
          s.columnWrapperStyle,
          columnWrapperStyle,
        ]}
        ListEmptyComponent={() => (
          <EmptyFlatList
            iconName={emptyListIconName}
            message={emptyListMessage}
            iconSize={emptyListIconSize}
            tintColor={emptyListIconColor}
          />
        )}
        {...props}
      />
    </View>
  ),
);

FlatListVertical.propTypes = {
  data: T.array,
  emptyListMessage: T.string,
  emptyListIconName: T.string,
  emptyListIconSize: T.number,
  emptyListIconColor: T.string,
  numColumns: T.number,
  keyExtractor: T.func,
  renderItem: T.func,
  style: ViewPropTypes.style,
  columnWrapperStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
};

export default FlatListVertical;
