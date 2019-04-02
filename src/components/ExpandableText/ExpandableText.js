import React, { PureComponent } from 'react';
import T from 'prop-types';
import { View, LayoutAnimation } from 'react-native';

import { Touchable, Text } from '..';
import i18n from '../../i18n';
import styles from './styles';

class ExpandableText extends PureComponent {
  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);

    const { numberOfLines, fontSize, lineHeight } = props;

    this.state = {
      maxHeight: 0,
      expanded: false,
      initialHeight:
        numberOfLines * (fontSize + (lineHeight - fontSize)),
      showMore: false,
      initialized: false,
      numberOfLines: undefined,
      ellipsizeMode: undefined,
    };
  }

  onLayout(evt) {
    if (!this.state.initialized) {
      const showMore =
        evt.nativeEvent.layout.height > this.state.initialHeight;

      this.setState({
        showMore,
        initialized: true,
      });
      if (showMore) {
        this.setState({
          numberOfLines: this.props.numberOfLines,
          ellipsizeMode: this.props.ellipsizeMode,
        });
      }
    }
  }

  // animations
  toggleExpand() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const {
      style,
      containerStyle,
      fontSize,
      children,
      fontStyle,
    } = this.props;

    const {
      expanded,
      showMore,
      numberOfLines,
      ellipsizeMode,
    } = this.state;

    return (
      <View style={containerStyle}>
        <View style={[styles.innerContainer]}>
          <Text
            suppressHighlighting
            style={[style, fontStyle, { fontSize }]}
            numberOfLines={expanded ? undefined : numberOfLines}
            ellipsizeMode={expanded ? undefined : ellipsizeMode}
            onLayout={this.onLayout}
          >
            {children}
          </Text>
        </View>
        {showMore && (
          <Touchable
            onPress={this.toggleExpand}
            useOpacity
            useOpacityAndroid
            style={styles.more}
          >
            <Text
              suppressHighlighting
              style={[styles.moreText, { fontSize }]}
              orange
            >
              {expanded
                ? i18n.t('common.less')
                : i18n.t('common.more')}
            </Text>
          </Touchable>
        )}
      </View>
    );
  }
}

ExpandableText.defaultProps = {
  numberOfLines: 2,
  fontSize: 14,
  lineHeight: 16,
};

ExpandableText.propTypes = {
  fontSize: T.number,
  lineHeight: T.number,
  style: T.any,
  containerStyle: T.any,
  children: T.string,
  numberOfLines: T.number,
  fontStyle: T.any,
  ellipsizeMode: T.string,
};

export default ExpandableText;
