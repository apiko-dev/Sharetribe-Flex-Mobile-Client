import React from 'react';
import { View, Text } from 'react-native';

import { ShadowContainer } from '../../../../components';
import s from './styles';
// import moment from 'moment';

const RenderItem = ({ item, index, messages }) => {
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
  //   if (timeNowDifference > 86400000) {
  //     if (timeDifference > 86400000) {
  //       titleTime = moment(item.dateTime, 'x').format('MMM Do YY');
  //       return true;
  //     }
  //   } else if (timeDifference > 10800000) {
  //     titleTime = moment(item.dateTime, 'x').format('LT');
  //     return true;
  //   }
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
    <ShadowContainer>
      <View style={s.container}>
        {/* <View>{title}</View> */}
        <View
          key={index}
          style={[
            s.messageContainer,
            fromUser ? s.userSend : s.interlocutor,
          ]}
        >
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
        </View>
      </View>
    </ShadowContainer>
  );
};

export default RenderItem;
