import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.icon.tintColorGray,
  },
  value: {
    marginRight: 8,
  },
  reviewCount: {
    marginLeft: 8,
  },
  custom: {
    width: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
