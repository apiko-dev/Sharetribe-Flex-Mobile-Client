import React from 'react';
import { View, Text } from 'react-native';
import { compose, lifecycle } from 'recompose';
import screens from '../../navigation/screens';

const InitializationScreen = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);

export default compose(
  lifecycle({
    componentDidMount() {
      // TODO: Make check user
      if (false) {
        this.props.navigation.navigate(screens.AuthorizedApp);
      } else {
        this.props.navigation.navigate(screens.UnauthorizedApp);
      }
    },
  }),
)(InitializationScreen);