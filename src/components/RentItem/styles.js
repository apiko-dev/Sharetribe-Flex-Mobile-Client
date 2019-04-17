import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    height: dimensions.indent * 6,
  },
  image: {
    height: 61,
    width: 80,
  },
  textContainer: {
    flex: 1,
    marginLeft: dimensions.indent * 0.75,
    marginTop: -4,
  },

  dateContainer: {
    flexDirection: 'row',
    marginTop: dimensions.indent / 2,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    marginTop: dimensions.indent * 0.25,
  },
});

export default styles;
