import React, { useState, useRef } from 'react';
import T from 'prop-types';
import { View, LayoutAnimation } from 'react-native';

import { Transitioning, Transition } from 'react-native-reanimated';
import { Touchable, IconFonts, Text } from '../../../../components';
import s from './styles';

function Accordion({ title, text }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const ref = useRef();

  function handleToggleVisible() {
    setIsVisible(!isVisible);
  }

  const transition = (
    <Transition.Sequence>
      <Transition.In
        type="fade"
        interpolation="easeInOut"
        durationMs={400}
      />
    </Transition.Sequence>
  );

  return (
    <View style={s.container}>
      <Touchable
        style={s.touchableContainer}
        onPress={() => {
          ref.current.animateNextTransition();
          handleToggleVisible();
        }}
      >
        <View style={s.top}>
          <Text bold>{title}</Text>
          {isVisible ? (
            <IconFonts name="up" size={25} />
          ) : (
            <IconFonts name="down" size={25} />
          )}
        </View>
      </Touchable>
      <Transitioning.View ref={ref} transition={transition}>
        {isVisible && (
          <View style={s.bottom}>
            <Text>{text}</Text>
          </View>
        )}
      </Transitioning.View>
    </View>
  );
}

Accordion.prototypes = {
  items: T.obj,
};

export default Accordion;
