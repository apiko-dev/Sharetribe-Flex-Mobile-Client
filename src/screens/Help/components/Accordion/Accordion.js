import React from 'react';
import T from 'prop-types';
import { View, Text, LayoutAnimation } from 'react-native';
import { Touchable } from '../../../../components';
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
          <Text>{title}</Text>
          <Text>v</Text>
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

export default Accordion;
