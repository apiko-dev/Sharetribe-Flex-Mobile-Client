import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {},
  containerMessage: {
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
  containerDetails: {
    margin: dimensions.indent,
    marginTop: 0,
  },
  dayPrice: {
    flexDirection: 'row',
    marginBottom: dimensions.indent,
    marginTop: dimensions.indent,
    justifyContent: 'space-between',
  },
  rentPeriod: {
    flexDirection: 'row',
    marginBottom: dimensions.indent,
    paddingBottom: dimensions.indent,
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.inbox.borderColor,
  },
  totalPrice: {
    flexDirection: 'row',
    marginBottom: dimensions.indent,
    justifyContent: 'space-between',
  },
});

export default styles;
