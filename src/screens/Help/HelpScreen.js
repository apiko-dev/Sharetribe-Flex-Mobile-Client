import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';

import { Text } from '../../components';
import s from './styles';
import Accordion from './components/Accordion';

const data = [
  {
    id: 1,
    title: 'About us',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    id: 2,
    title: 'About ',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
];

const HelpScreen = () => {
  return (
    <View style={s.container}>
      <View style={s.headerContainer}>
        <View style={s.headerText}>
          <Text largeSize bold>
            Help Center
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </View>
      </View>
      <Text>Help</Text>
      {/* {data.map((i) => (
        <Accordion item={i} />
      ))} */}
      <Accordion />
    </View>
  );
};

HelpScreen.propTypes = {};

export default HelpScreen;
