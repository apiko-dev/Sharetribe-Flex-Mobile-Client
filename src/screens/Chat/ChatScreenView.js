import React from 'react';
import { View, FlatList } from 'react-native';

import { observer } from 'mobx-react/custom';
import T from 'prop-types';
import R from 'ramda';

import { colors } from '../../styles';
import { Conformation, Input, RenderItem } from './components';
import { ShadowContainer, Loader } from '../../components';

import s from './styles';

function ChatScreen({
  isShowDetails,
  setShowDetails,
  onSend,
  messageInputText,
  setMessageInputText,
  messageCollection,
  isLoading,
  fetchMoreMessages,
  transaction,
  onAccept,
  onDeny,
  goToProduct,
}) {
  if (isLoading) {
    return (
      <View style={s.loader}>
        <Loader large />
      </View>
    );
  }
  const isVisibleConformation =
    R.pathOr('', ['lastTransition'], transaction).substring(11) ===
    'request';
  // !transaction.relationships.listing.relationships.author.isViewer;
  return (
    <View style={s.container}>
      {isVisibleConformation && (
        <ShadowContainer>
          <Conformation
            setShowDetails={setShowDetails}
            isShowDetails={isShowDetails}
            transaction={transaction}
            onAccept={onAccept}
            onDeny={onDeny}
            goToProduct={goToProduct}
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
          onEndReached={() => fetchMoreMessages()}
        />
        <View style={s.rotate}>
          <ShadowContainer>
            <View style={s.inputContainer}>
              <Input
                multiline
                style={s.input}
                value={messageInputText}
                onChangeText={setMessageInputText}
                onSend={onSend}
                placeholderTextColor={colors.text.gray}
                placeholder="Message"
              />
            </View>
          </ShadowContainer>
        </View>
      </View>
    </View>
  );
}

ChatScreen.propTypes = {
  isShowDetails: T.bool,
  setShowDetails: T.func,
  onSend: T.func,
  messageInputText: T.string,
  setMessageInputText: T.func,
  fetchMoreMessages: T.func,
  messageCollection: T.array,
  isLoading: T.bool,
  transaction: T.object,
  onAccept: T.func,
  onDeny: T.func,
  goToProduct: T.func,
};

export default observer(ChatScreen);
