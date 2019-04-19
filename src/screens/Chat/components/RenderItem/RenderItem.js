import React from 'react';
import { View, Text } from 'react-native';

import { ShadowContainer, Avatar } from '../../../../components';
import s from './styles';
// import moment from 'moment';

const RenderItem = ({ item, index, messages, user, isUser }) => {
  // const itemIndex = (index) => {
  //   if (index < messages.length - 1) {
  //     return index + 1;
  //   }
  //   return index;
  // };

  // let titleTime;
  // isSenderSame = (currentMessage, prevMessage) => {
  //   const timeNow = new Date().getTime();
  //   const timeNowDifference = timeNow - currentMessage;
  //   const timeDifference = currentMessage - prevMessage;
  // if (timeNowDifference > 86400000) {
  //   if (timeDifference > 86400000) {
  //     titleTime = moment(item.dateTime, 'x').format('MMM Do YY');
  //     return true;
  //   }
  // } else if (timeDifference > 10800000) {
  //   titleTime = moment(item.dateTime, 'x').format('LT');
  //   return true;
  // }
  // };

  // const firstMessageDate = index === messages.length - 1;
  // if (firstMessageDate) {
  //   titleTime = moment(item.dateTime, 'x').format('MMM Do YY');
  // }

  // const title =
  //   firstMessageDate ||
  //   isSenderSame(
  //     item.dateTime,
  //     messages[itemIndex(index)].dateTime,
  //   ) ? (
  //     <View style={s.titleTime}>
  //       <Text>{titleTime}</Text>
  //     </View>
  //   ) : null;
  const fromUser = item.fromUser === 'Taras';
  const fromInterlocutor = item.fromUser !== 'Taras';
  return (
    <View style={s.container}>
      <ShadowContainer>
        <View
          key={index}
          style={[
            s.messageContainer,
            fromUser ? s.userSend : s.interlocutor,
          ]}
        >
          {!isUser && (
            <Avatar
              user={user}
              small
              styleContainer={s.avatarCustomer}
            />
          )}
          <View
            style={[
              s.message,
              fromInterlocutor && s.fromInterlocutor,
            ]}
          >
            <Text
              style={[
                s.text,
                fromInterlocutor && s.textFromInterlocutor,
              ]}
            >
              {item.message}
            </Text>
          </View>
          {isUser && (
            <Avatar user={user} small styleContainer={s.avatar} />
          )}
          {/* <View style={[isUser && s.timer]}>
          <Text>09:31</Text>
        </View> */}
        </View>
      </ShadowContainer>
    </View>
  );
};

export default RenderItem;
