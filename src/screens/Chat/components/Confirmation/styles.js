import { StyleSheet } from 'react-native';
import { dimensions, colors, theme } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: dimensions.indent * 10.5,
    backgroundColor: colors.inbox.messageBackgroundColor,
    borderBottomColor: colors.text.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: dimensions.indent,
    paddingRight: dimensions.indent,
  },
  buttonStyle: {
    paddingVertical: dimensions.indent * 0.4,
    margin: 0,
  },
  containerStyle: {
    flex: 1,
    height: theme.button.heightMedium,
  },

  accept: {
    flex: 1,
    marginRight: dimensions.indent * 0.75,
    height: theme.button.heightSmall,
  },
  deny: {
    flex: 1,
    height: theme.button.heightSmall,
  },
  viewGoods: {
    flex: 1,
    paddingLeft: dimensions.indent * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: dimensions.indent / 2,
  },
});

export default styles;
