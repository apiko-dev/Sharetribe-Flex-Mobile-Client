import React, { Component } from 'react';
import T from 'prop-types';
import { WebView } from 'react-native-webview';
import { html, getStripeTokens } from './StripeTokenScripts';
import s from './styles';

class StripeTokenService extends Component {
  constructor(props) {
    super(props);

    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(e) {
    const { onSuccess, onCloseModal, stripeData } = this.props;
    const { data } = e.nativeEvent;
    if (data.includes('Error:')) {
      onSuccess(new Error());
      onCloseModal();
    } else {
      const tokens = data.split('/');
      onSuccess({
        accountToken: tokens[0],
        bankAccountToken: tokens[1],
        country: stripeData.country,
      });
      onCloseModal();
    }
  }

  render() {
    const { isVisible, stripeData } = this.props;

    if (isVisible) {
      return (
        <WebView
          style={s.webview}
          source={{
            html,
          }}
          injectedJavaScript={getStripeTokens(stripeData)}
          onMessage={this.onMessage}
        />
      );
    }

    return null;
  }
}

StripeTokenService.propTypes = {
  isVisible: T.bool,
  onCloseModal: T.func,
  onSuccess: T.func,
  stripeData: T.any,
};

export default StripeTokenService;
