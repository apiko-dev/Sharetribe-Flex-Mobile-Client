import React, { Component } from 'react';
import T from 'prop-types';
import Modal from 'react-native-modal';
import { WebView, View, StatusBar } from 'react-native';
import s from './styles';
import { HeaderBackButton } from '../../../../components';

export default class ServiceConnectModal extends Component {
  constructor(props) {
    super(props);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(
      this,
    );
  }

  onNavigationStateChange(navState) {
    const { onSuccess } = this.props;
    if (navState.url.includes('?code=')) {
      const code = navState.url.split('code=')[1];

      onSuccess(code);
      this.props.onCloseModal(); // eslint-disable-line
    }
  }

  render() {
    const { isVisible, onCloseModal, url } = this.props;
    return (
      <Modal isVisible={!!isVisible} style={s.modal}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View style={s.headerContainer}>
          <HeaderBackButton onPress={onCloseModal} />
        </View>

        <View style={s.webView}>
          <WebView
            style={s.webView}
            ref={(ref) => (this.webview = ref)} //eslint-disable-line
            source={{
              uri: url,
            }}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            bounces={false}
            onShouldStartLoadWithRequest={() => true}
            onNavigationStateChange={this.onNavigationStateChange}
            javaScriptEnabledAndroid
          />
        </View>
      </Modal>
    );
  }
}

ServiceConnectModal.propTypes = {
  isVisible: T.bool,
  onCloseModal: T.func,
  onSuccess: T.func,
  url: T.string,
};
