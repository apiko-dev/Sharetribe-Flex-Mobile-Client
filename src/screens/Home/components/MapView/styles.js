import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    // margin: dimensions.smallIndent,
    padding: dimensions.smallIndent / 4,
    backgroundColor: colors.mapView.backgroundColor,
    borderRadius: dimensions.borderRadius,
  },

  markerContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    // flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.mapView.backgroundColor,
    padding: 2,
    borderRadius: 3,
    borderColor: colors.mapView.backgroundColor,
    // borderWidth: 0.5,
  },
  activeMarker: {
    backgroundColor: colors.mapView.backgroundActiveColor,
  },
  activeText: {
    color: colors.mapView.activeText,
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: colors.mapView.backgroundColor,
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 7,
    borderColor: 'transparent',
    borderTopColor: colors.mapView.backgroundColor,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  activeArrow: {
    borderTopColor: colors.mapView.backgroundActiveColor,
  },
});
