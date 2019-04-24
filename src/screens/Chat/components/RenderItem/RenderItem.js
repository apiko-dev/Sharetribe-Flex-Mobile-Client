import React from 'react';
import { View, Text } from 'react-native';

import { ShadowContainer, Avatar } from '../../../../components';
import s from './styles';
// import moment from 'moment';

function RenderItem({ item, index, user }) {
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
  return (
    <View style={s.container}>
      <ShadowContainer>
        <View
          key={index}
          style={[
            s.messageContainer,
            user.isViewer ? s.userSend : s.interlocutor,
          ]}
        >
          {!user.isViewer && (
            <Avatar
              user={user}
              small
              styleContainer={s.avatarCustomer}
            />
          )}
          <View
            style={[s.message, !user.isViewer && s.fromInterlocutor]}
          >
            <Text
              style={[
                s.text,
                !user.isViewer && s.textFromInterlocutor,
              ]}
            >
              {item.content}
            </Text>
          </View>
          {user.isViewer && (
            <Avatar user={user} small styleContainer={s.avatar} />
          )}
          {/* <View style={[user.isViewer && s.timer]}>
          <Text>09:31</Text>
        </View> */}
        </View>
      </ShadowContainer>
    </View>
  );
}

export default RenderItem;
