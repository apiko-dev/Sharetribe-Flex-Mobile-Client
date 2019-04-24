import React from 'react';
import { View, FlatList } from 'react-native';

import uuid from 'uuid/v4';
import { observer } from 'mobx-react/custom';
import { Conformation, Input, RenderItem } from './components';
import { ShadowContainer, Text } from '../../components';

import s from './styles';

const isVisibleConformation = true;

function ChatScreen({
  isShowDetails,
  setShowDetails,
  onSend,
  messageInputText,
  setMessageInputText,
  author,
  messageCollection,
}) {
  return (
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
          data={messageCollection}
          style={s.listContainer}
          renderItem={({ item, index }) => (
            <RenderItem
              item={item}
              index={index}
              user={item.sender}
            />
          )}
          keyExtractor={(item) => item.id}
          inverted
        />
        <ShadowContainer style={s.rotate}>
          <View style={s.inputContainer}>
            <Input
              multiline
              style={s.input}
              value={messageInputText}
              onChangeText={setMessageInputText}
              onSend={onSend}
            />
          </View>
        </ShadowContainer>
      </View>
    </View>
  );
}

export default observer(ChatScreen);
