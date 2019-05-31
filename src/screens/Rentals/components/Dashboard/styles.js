import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.rentalsScreen.backgroundColor,
  },
  cardContainer: {
    margin: dimensions.indent,
  },
  card: {
    width: '100%',
    height: dimensions.smallIndent * 7,
    backgroundColor: colors.rentalsScreen.cardBackgroundColor,
    marginTop: dimensions.indent,
    borderRadius: dimensions.borderRadius,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  columnContainer: {
    margin: dimensions.indent / 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lendingCard: {
    flex: 1,
  },
});

export default styles;
