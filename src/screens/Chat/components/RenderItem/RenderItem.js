import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';

import { getHourAndMinutes } from '../../../../utils/dates';
import {
  ShadowContainer,
  Avatar,
  Text,
} from '../../../../components';
import s from './styles';

function RenderItem({ item, index, user }) {
  const time = getHourAndMinutes(item.createdAt);

  return (
    <View style={s.container}>
      <ShadowContainer>
        <View
          key={index}
          style={[
            s.messageContainer,
            user.isViewer ? s.viewer : s.interlocutor,
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
            style={[
              s.messageWithDate,
              user.isViewer && s.contentFlexEnd,
            ]}
          >
            <View
              style={[
                s.message,
                !user.isViewer && s.fromInterlocutor,
              ]}
            >
              <Text>{item.content}</Text>
            </View>

            <View style={s.timer}>
              <Text xsmallSize gray>
                {time}
              </Text>
            </View>
          </View>

          {user.isViewer && (
            <Avatar user={user} small styleContainer={s.avatar} />
          )}
        </View>
      </ShadowContainer>
    </View>
  );
}

RenderItem.propTypes = {
  item: T.object,
  index: T.number,
  user: T.object,
};

export default RenderItem;
