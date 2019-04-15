import React from 'react';
import {
  View,
  //  LayoutAnimation
} from 'react-native';

import { Text, Touchable } from '../../../components';
// import IconFonts from '../../..';
import s from './styles';

function Accordion(item) {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleToggleVisible() {
    // LayoutAnimation.easyIn();
    setIsVisible(!isVisible);
  }

  return (
    <View>
      <Touchable style={s.top} onPress={handleToggleVisible()}>
        <Text>
          Title
          {/* {item.title} */}
        </Text>
        {/* <IconFonts name={} size={25} */}
      </Touchable>

      {isVisible && (
        <View styles={s.bottom}>
          <Text>
            {/* {item.text} */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur
          </Text>
        </View>
      )}
    </View>
  );
}

export default Accordion;
