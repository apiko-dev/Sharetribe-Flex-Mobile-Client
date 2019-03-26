/* eslint-disable consistent-return */
import React from 'react';
import { View, FlatList, ViewPropTypes } from 'react-native';
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
    numColumns,
    renderItem,
    keyExtractor,
    style,
    columnWrapperStyle,
    contentContainerStyle,
    showHeader,
    headerTitle,
    headerOnPressTextTouchable,
    headerTitleTextTouchable,
    showsHorizontalScrollIndicator,
    containerStyle,
    headerStyle,
    headerTitleStyle,
    headerTitleTextTouchableStyle,
    ...props
  }) => (
    <View style={[s.container, containerStyle]}>
      {showHeader && (
        <View style={[s.header, headerStyle]}>
          <Text xmediumSize bold style={headerTitleStyle}>
            {headerTitle}
          </Text>
          <TextTouchable
            onPress={headerOnPressTextTouchable}
            textStyle={headerTitleTextTouchableStyle}
          >
            {headerTitleTextTouchable}
          </TextTouchable>
        </View>
      )}
      <View>
        <FlatList
          horizontal
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
          showsHorizontalScrollIndicator={
            showsHorizontalScrollIndicator
          }
          {...props}
        />
      </View>
    </View>
  ),
);

FlatListHorizontal.propTypes = {
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
  showHeader: T.bool,
  headerTitle: T.string,
  headerOnPressTextTouchable: T.func,
  headerTitleTextTouchable: T.string,
  showsHorizontalScrollIndicator: T.bool,
  containerStyle: ViewPropTypes.style,
  headerStyle: ViewPropTypes.style,
  headerTitleStyle: ViewPropTypes.style,
  headerTitleTextTouchableStyle: ViewPropTypes.style,
};

export default FlatListHorizontal;
