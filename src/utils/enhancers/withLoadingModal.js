import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Modal from 'react-native-modal';
import { ScreenLoader } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const withLoadingModal = (propsMapper) => (BaseComponent) => (
  props,
) => (
  <SafeAreaView
    style={styles.container}
    forceInset={{ top: 'always', horizontal: 'never' }}
  >
    <BaseComponent {...props} />
    <Modal isVisible={propsMapper(props)}>
      <ScreenLoader />
    </Modal>
  </SafeAreaView>
);

export default withLoadingModal;
