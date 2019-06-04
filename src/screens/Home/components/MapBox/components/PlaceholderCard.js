import React from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import T from 'prop-types';
// import i18n from '../../i18n';
// import { colors, fontSizes, theme } from '../../styles';

const s = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.white,
    // borderRadius: theme.postCardBorderRadius,
    // ...theme.shadow,
  },
  loadingErrorCaption: {
    marginTop: 8,
    // color: colors.captionText,
    // fontSize: fontSizes.medium,
    textAlign: 'center',
  },
});

const PlaceholderCard = ({
  showSpinner,
  loadingError,
  // loadingErrorCaption,
  onRetry,
  width,
}) => (
  <View style={[{ width }, s.container]}>
    {showSpinner ? (
      <ActivityIndicator size="small" />
    ) : (
      loadingError && (
        <View>
          <Text style={s.loadingErrorCaption}>
            {loadingErrorCaption}
          </Text>
          <Button
            // title={i18n.t('common.Retry')}
            title="retry"
            onPress={onRetry}
            // color={colors.primary}
            color="red"
          />
        </View>
      )
    )}
  </View>
);

PlaceholderCard.propTypes = {
  showSpinner: T.bool,
  loadingError: T.bool,
  // loadingErrorCaption:
  onRetry: T.func,
  width: T.number,
};

export default PlaceholderCard;
