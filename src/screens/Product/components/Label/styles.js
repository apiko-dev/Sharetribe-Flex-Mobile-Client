import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: colors.label.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingVertical: dimensions.indent / 4,
    paddingHorizontal: dimensions.indent / 2,
    marginRight: dimensions.indent / 4,
    marginTop: dimensions.indent / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;
