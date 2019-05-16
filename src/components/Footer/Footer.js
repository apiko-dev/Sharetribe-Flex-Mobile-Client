import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import s from './styles';
import IconFonts from '../IconFonts/IconFonts';
import Button from '../Button/Button';

const Footer = ({
  phone,
  onCall,
  navigationToRequestToRent,
  onSend,
  isSending,
}) => (
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
        onPress={onSend}
        isLoading={isSending}
      >
        <IconFonts
          name="message"
          size={22}
          style={s.iconChat}
          tintColor="orange"
          onPress={onSend}
        />
      </Button>
    </View>
    <View style={s.rentContainer}>
      <Button
        title="Request to rent"
        primary
        buttonStyle={s.buttonRent}
        onPress={navigationToRequestToRent}
      />
    </View>
  </View>
);

Footer.propTypes = {
  navigationToRequestToRent: T.func,
  phone: T.string,
  onCall: T.func,
  onSend: T.func,
  isSending: T.bool,
};

export default Footer;
