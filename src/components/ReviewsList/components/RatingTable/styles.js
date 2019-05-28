import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.ratingTable.backgroundColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: colors.ratingTable.borderBottomColor,
  },
  tableContainer: {
    height: dimensions.indent * 5,
    width: '100%',
    margin: dimensions.smallIndent,
    flex: 0.7,
    marginRight: dimensions.indent * 2,
  },
  ratingContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberLine: {
    fontSize: 12,
    color: colors.text.gray,
  },
  lineContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth * 8,
    backgroundColor: colors.ratingTable.backgroundLine,
    borderRadius: dimensions.borderRadius,
    margin: dimensions.smallIndent / 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  lineContent: {
    backgroundColor: colors.ratingTable.activeColor,
    borderRadius: dimensions.borderRadius,
    height: '100%',
  },
  ratingContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingNumberStyle: {
    fontSize: 48,
    marginRight: 0,
    color: colors.text.black,
  },
  ratingCountStyle: {
    fontSize: 12,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
