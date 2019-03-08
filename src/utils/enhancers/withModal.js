import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const withModal = (propsMapper, ModalComponent) => (
  BaseComponent,
) => (props) => (
  <SafeAreaView
    style={styles.container}
    forceInset={{ top: 'always', horizontal: 'never' }}
  >
    <BaseComponent {...props} />
    <ModalComponent {...propsMapper(props)} />
  </SafeAreaView>
);

export default withModal;
