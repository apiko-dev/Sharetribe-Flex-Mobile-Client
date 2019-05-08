import React from 'react';
import { View, FlatList } from 'react-native';

import { observer } from 'mobx-react/custom';
import T from 'prop-types';
import R from 'ramda';

import { colors } from '../../styles';
import { Conformation, Input, RenderItem } from './components';
import { ShadowContainer, Loader } from '../../components';
import { transitionStatuses } from '../../constants';

import s from './styles';
import { match } from '../../utils';

const getConfirmationStatus = (transaction) => {
  switch (transaction) {
    case transitionStatuses.REQUEST:
      return true;
    case transitionStatuses.ENQUIRE:
      return true;
    default:
      return false;
  }
};

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
  navigationToRequestToRent,
  isOpenedChat,
  navigateToListing,
}) {
  if (isLoading) {
    return (
      <View style={s.loader}>
        <Loader large />
      </View>
    );
  }

  // const isVisibleConformation =
  //   R.pathOr('', ['lastTransition'], transaction).split('/')[1] ===
  //     'request' &&
  //   transaction.lastTransaction.substring(11) === 'enquire';
  return (
    <View style={s.container}>
      {getConfirmationStatus(transaction.lastTransition) && (
        <ShadowContainer>
          <Conformation
            setShowDetails={setShowDetails}
            isShowDetails={isShowDetails}
            transaction={transaction}
            onAccept={onAccept}
            onDeny={onDeny}
            goToProduct={goToProduct}
            navigationToRequestToRent={navigationToRequestToRent}
            navigateToListing={navigateToListing}
            isOpenedChat={isOpenedChat}
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
