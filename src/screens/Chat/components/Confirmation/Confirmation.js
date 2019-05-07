import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';

import {
  Text,
  RentItem,
  Button,
  Touchable,
} from '../../../../components';
import i18n from '../../../../i18n';
import s from './styles';

const Confirmation = ({
  setShowDetails,
  isShowDetails,
  transaction,
  onAccept,
  onDeny,
}) => (
  <View style={s.container}>
    <RentItem
      isShowDetails={isShowDetails}
      transaction={transaction}
    />
    <View style={s.buttonContainer}>
      <View style={s.accept}>
        <Button
          title={i18n.t('chat.accept')}
          primary
          buttonStyle={s.buttonStyle}
          containerStyle={s.containerStyle}
          titleStyle={s.titleStyle}
          onPress={onAccept}
        />
      </View>
      <View style={s.deny}>
        <Button
          title={i18n.t('chat.deny')}
          buttonStyle={s.buttonStyle}
          containerStyle={s.containerStyle}
          titleStyle={s.titleStyle}
          onPress={onDeny}
        />
      </View>
      <View style={s.viewGoods}>
        <Touchable orange xsmallSize>
          <Text xxsmallSize orange>
            View goods
          </Text>
        </Touchable>
      </View>
    </View>
    <Touchable
      style={s.detailsContainer}
      onPress={() => setShowDetails()}
    >
      {isShowDetails ? (
        <Text xxsmallSize orange>
          Close details
        </Text>
      ) : (
        <Text xxsmallSize orange>
          View details
        </Text>
      )}
    </Touchable>
  </View>
);

Confirmation.propTypes = {};

export default Confirmation;
