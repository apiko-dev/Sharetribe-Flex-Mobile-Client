import React from 'react';
import T from 'prop-types';
import { View, LayoutAnimation } from 'react-native';

import { Touchable, IconFonts, Text } from '../../../../components';
import s from './styles';

function Accordion({ title, text }) {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleToggleVisible() {
    LayoutAnimation.easeInEaseOut();
    setIsVisible(!isVisible);
  }

  return (
    <View style={s.container}>
      <Touchable
        style={s.touchableContainer}
        onPress={handleToggleVisible}
      >
        <View style={s.top}>
          <Text bold>{title}</Text>
          {isVisible ? (
            <IconFonts name="up" size={25} />
          ) : (
            <IconFonts name="drop-down" size={25} />
          )}
        </View>
      </Touchable>
      {isVisible && (
        <View style={s.bottom}>
          <Text>{text}</Text>
        </View>
      )}
    </View>
  );
}

Accordion.prototypes = {
  items: T.obj,
};

export default Accordion;
