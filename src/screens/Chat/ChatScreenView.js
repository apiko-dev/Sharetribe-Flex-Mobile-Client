import React from 'react';
import { View, FlatList } from 'react-native';

import uuid from 'uuid/v4';
import { Conformation, Input, RenderItem } from './components';
import { ShadowContainer, Text } from '../../components';

import s from './styles';

const messages = [
  {
    id: uuid(),
    fromUser: 'Taras',
    toUser: 'Reeves',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Reeves',
    toUser: 'Taras',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Taras',
    toUser: 'Reeves',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Reeves',
    toUser: 'Taras',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Taras',
    toUser: 'Reeves',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Reeves',
    toUser: 'Taras',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Taras',
    toUser: 'Reeves',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Taras',
    toUser: 'Reeves',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Taras',
    toUser: 'Reeves',
    message: 'text',
    dateTime: new Date().getTime(),
  },
  {
    id: uuid(),
    fromUser: 'Reeves',
    toUser: 'Taras',
    message: 'text',
    dateTime: new Date().getTime(),
  },
];

const isVisibleConformation = true;

const ChatScreen = ({
  isShowDetails,
  setShowDetails,
  // id,
  // name,
  // navigation,
  // onPress,
  // onSend,
  // messageInputText,
  // setMessageInputText,
  // messages,
  // state,
}) => (
  <View style={s.container}>
    {isVisibleConformation && (
      <ShadowContainer>
        <Conformation
          setShowDetails={setShowDetails}
          isShowDetails={isShowDetails}
        />
      </ShadowContainer>
    )}
    <View style={s.containerChat}>
      <FlatList
        data={messages}
        style={s.listContainer}
        renderItem={({ item, index }) => (
          // <View item={item} index={index}>
          //   <Text>Item</Text>
          // </View>
          <RenderItem item={item} index={index} messages={messages} />
        )}
        keyExtractor={(item, index) => item + index}
        inverted
      />

      <View style={s.inputContainer}>
        <Input
          multiline
          style={s.input}
          // value={messageInputText}
          // onChangeText={setMessageInputText}
          // onSend={onSend}
        />
      </View>
    </View>
  </View>
);

export default ChatScreen;
