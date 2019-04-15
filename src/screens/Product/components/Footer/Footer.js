import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import s from './styles';
import { Button, IconFonts } from '../../../../components';

const Footer = ({ phone, onCall }) => (
  <View style={s.container}>
    <View style={s.contactContainer}>
      {phone && (
        <Button
          style={s.paddingButton}
          containerStyle={s.containerCall}
          buttonStyle={s.buttonContact}
          borderless={false}
          onPress={onCall}
        >
          <IconFonts name="call" size={22} tintColor="orange" />
        </Button>
      )}
      <Button
        style={s.paddingButton}
        title="Chat"
        containerStyle={s.containerChat}
        buttonStyle={s.buttonContact}
        titleStyle={s.textChat}
        borderless={false}
      >
        <IconFonts
          name="message"
          size={22}
          style={s.iconChat}
          tintColor="orange"
        />
      </Button>
    </View>
    <View style={s.rentContainer}>
      <Button
        title="Request to rent"
        primary
        buttonStyle={s.buttonRent}
      />
    </View>
  </View>
);

Footer.propTypes = {
  phone: T.string,
  onCall: T.func,
};

export default Footer;
