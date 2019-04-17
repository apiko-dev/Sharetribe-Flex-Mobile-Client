import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';

import { Text, RentItem, Button } from '../../../../components';
import i18n from '../../../../i18n';
import s from './styles';

const Confirmation = () => (
  <View style={s.container}>
    <RentItem />
    <View style={s.buttonContainer}>
      <View style={s.accept}>
        <Button
          title={i18n.t('chat.accept')}
          primary
          buttonStyle={s.buttonStyle}
          containerStyle={s.containerStyle}
        />
      </View>
      <View style={s.deny}>
        <Button
          title={i18n.t('chat.deny')}
          containerStyle={s.containerStyle}
        />
      </View>
      <View style={s.viewGoods}>
        {/* <Text orange>View goods</Text> */}
        <Button
          title={i18n.t('chat.viewGoods')}
          style={s.buttonStyle}
          containerStyle={s.containerStyle}
        />
      </View>
    </View>
  </View>
);

Confirmation.propTypes = {};

export default Confirmation;
