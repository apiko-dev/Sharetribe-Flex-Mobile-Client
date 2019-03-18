import React from 'react';
import T from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Touchable, Icon } from '../';
import { dimensions, colors, fontSizes, theme } from '../../styles';

const s = StyleSheet.create({
  card: {
    marginVertical: dimensions.indentHalf,
    marginHorizontal: dimensions.indent,
    backgroundColor: colors.white,
    ...theme.shadow,
    borderRadius: theme.inputBorderRadius,
    paddingHorizontal: dimensions.indent,
    paddingVertical: dimensions.indentHalf,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: dimensions.indentHalf,
  },
  label: {
    fontSize: fontSizes.heading3,
    color: colors.textPrimary,
  },
});

const CurrentLocationHeader = ({
  onPress,
  label,
  testID,
}) => (
  <Touchable
    onPress={onPress}
    style={s.card}
    testID={testID}
  >
    <View style={s.innerContainer}>
      <Icon
        size={24}
        iconName="current-location"
        color={colors.primary}
      />
      <View style={s.textContainer}>
        <Text style={s.label}>
          {label}
        </Text>
      </View>
    </View>
  </Touchable>
);

CurrentLocationHeader.propTypes = {
  onPress: T.func,
  label: T.string,
  testID: T.string,
};

export default CurrentLocationHeader;
