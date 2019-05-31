import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../../../styles';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.inbox.messageBackgroundColor,
    paddingBottom: 0,
    marginTop: dimensions.indent * 0.75,
  },
});

export default styles;
