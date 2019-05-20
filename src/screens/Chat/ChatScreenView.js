import React from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';

import { observer } from 'mobx-react/custom';
import T from 'prop-types';

import { colors } from '../../styles';
import { Conformation, Input, RenderItem } from './components';
import {
  ShadowContainer,
  Loader,
  Text,
  TextTouchable,
} from '../../components';
import { transitionStatuses } from '../../constants';
import i18n from '../../i18n';
import { isAndroid } from '../../utils';
import s from './styles';

const getConfirmationStatus = (transaction) => {
  switch (transaction) {
    case transitionStatuses.REQUEST:
    case transitionStatuses.ENQUIRE:
    case transitionStatuses.AFTER_ENQUIRE:
      return true;
    default:
      return false;
  }
};

const isAndroidDevice = isAndroid();

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
  rentPeriod,
  writeReview,
  listingAuthor,
  isShowLinkReview,
}) {
  const linkToLeaveReview = () => (
    <View>
      <View styles={s.linkReviewContainer}>
        <Text grey style={s.reviewText}>
          {i18n.t('chat.completedBooking')}
        </Text>
        <TextTouchable
          orange
          style={s.linkReviewText}
          onPress={writeReview}
        >
          {i18n.t('chat.leaveReviewFor')}
          {` ${listingAuthor}`}
        </TextTouchable>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={s.loader}>
        <Loader large />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={s.container}
      contentContainerStyle={s.keyboardAvoidingViewContentContainer}
      keyboardVerticalOffset={isAndroidDevice ? -30 : 65}
    >
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
              rentPeriod={rentPeriod}
            />
          )}
          keyExtractor={(item) => item.id}
          inverted
          onEndReached={() => fetchMoreMessages()}
          ListHeaderComponent={linkToLeaveReview}
          // ListHeaderComponent={isShowLinkReview && linkToLeaveReview}
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
    </KeyboardAvoidingView>
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
  navigationToRequestToRent: T.func,
  isOpenedChat: T.bool,
  navigateToListing: T.func,
  rentPeriod: T.object,
  writeReview: T.func,
  listingAuthor: T.string,
  isShowLinkReview: T.bool,
};

export default observer(ChatScreen);
