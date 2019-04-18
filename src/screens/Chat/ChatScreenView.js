import React from 'react';
import { View, Text } from 'react-native';

import { Conformation } from './components';
import { ShadowContainer } from '../../components';

import s from './styles';

const ChatScreen = ({ isShowDetails, setShowDetails }) => (
  <View style={s.container}>
    <ShadowContainer>
      <Conformation
        setShowDetails={setShowDetails}
        isShowDetails={isShowDetails}
      />
    </ShadowContainer>
  </View>
);

export default ChatScreen;
