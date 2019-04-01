import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import s from './styles';
import { Button, IconFonts } from '../../../../components';

const Footer = () => (
  <View style={s.container}>
    <View style={s.contactContainer}>
      <Button
        containerStyle={s.containerCall}
        buttonStyle={s.buttonContact}
        // borderless={false}
      >
        <IconFonts name="call" size={22} tintColor="orange" />
      </Button>
      <Button
        title="Chat"
        containerStyle={s.containerChat}
        buttonStyle={s.buttonContact}
        titleStyle={s.textChat}
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
        containerStyle={s.containerRent}
        buttonStyle={s.buttonRent}
        titleStyle={s.textRent}
      />
    </View>
  </View>
);

Footer.propTypes = {};

export default Footer;
