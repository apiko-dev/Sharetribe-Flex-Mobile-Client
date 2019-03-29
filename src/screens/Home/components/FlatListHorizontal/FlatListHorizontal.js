/* eslint-disable consistent-return */
import React from 'react';
import { View, FlatList } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  EmptyFlatList,
  Text,
  TextTouchable,
} from '../../../../components';

const FlatListHorizontal = React.memo(
  ({
    data,
    emptyListMessage,
    emptyListIconName,
    emptyListIconSize,
    emptyListIconColor,
    renderItem,
    keyExtractor,
    headerTitle,
    headerOnPressTextTouchable,
    headerTitleTextTouchable,
  }) => (
    <View style={[s.container]}>
      <View style={[s.header]}>
        <Text xmediumSize bold>
          {headerTitle}
        </Text>
        <TextTouchable onPress={headerOnPressTextTouchable}>
          {headerTitleTextTouchable}
        </TextTouchable>
      </View>
      <FlatList
        horizontal
        style={[s.flatList]}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[s.flatListContentContainer]}
        ListEmptyComponent={() => (
          <EmptyFlatList
            iconName={emptyListIconName}
            message={emptyListMessage}
            iconSize={emptyListIconSize}
            tintColor={emptyListIconColor}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ),
);

FlatListHorizontal.propTypes = {
  data: T.array,
  emptyListMessage: T.string,
  emptyListIconName: T.string,
  emptyListIconSize: T.number,
  emptyListIconColor: T.string,
  keyExtractor: T.func,
  renderItem: T.func,
  headerTitle: T.string,
  headerOnPressTextTouchable: T.func,
  headerTitleTextTouchable: T.string,
};

export default FlatListHorizontal;
