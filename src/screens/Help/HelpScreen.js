import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';

import Accordion from './components/Accordion/Accordion';
import s from './styles';

const data = [
  {
    id: 1,
    title: 'Help',
    text: '1jdsndsn jsdncsdjc jsdncsdn s njsdc s jd  jdjnc',
  },
  {
    id: 2,
    title: 'Policy',
    text: '2fheidj jsdncsdjc jsdncs2222',
  },
  {
    id: 3,
    title: 'Some',
    text: '3jdsndsn jsdncsdjc jsdncsdn s njsdc s jd  jdjnc',
  },
  {
    id: 4,
    title: 'Else',
    text: '4fheidj jsdncsdjc jsdncs2222',
  },
];

function HomeScreen() {
  return (
    <View>
      <Text>Help Text</Text>
      {data.map((item) => (
        <Accordion {...item} />
      ))}
    </View>
  );
}

HomeScreen.propTypes = {};

export default HomeScreen;
