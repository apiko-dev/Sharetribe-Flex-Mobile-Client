import { StyleSheet } from 'react-native';
import { dimensions, colors, theme } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: dimensions.indent * 10,
    borderBottomColor: colors.text.gray,
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
  },

  buttonContainer: {
    flex: 1,
    // height: theme.button.heightSmall,
    // padding: dimensions.indent,
    // paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: dimensions.indent,
    paddingRight: dimensions.indent,
  },
  buttonStyle: {
    // flex: 1,
    // height: theme.button.heightMedium,
    // padding: null,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: StyleSheet.hairlineWidth * 3,
    // borderColor: colors.button.borderColorPrimary,
  },
  accept: {
    flex: 1,
    marginRight: dimensions.indent * 0.75,
    // marginTop: dimensions.indent,
    // marginLeft: dimensions.indent,
    // marginRight: dimensions.indent,
    // marginBottom: dimensions.indent * 1.5,
  },
  deny: {
    flex: 1,
  },
  viewGoods: {
    flex: 1,
  },

  containerStyle: {
    flex: 1,
  },
});

export default styles;
