import React from 'react';
import {
  compose,
  withHandlers,
  defaultProps,
  hoistStatics,
} from 'recompose';
import { inject } from 'mobx-react';
import SignUpFormView from './SignUpFormView';

export default hoistStatics(
  compose(
    inject((stores) => ({
      auth: stores.auth,
      isSigningUp: stores.auth.registerUser.inProgress,
    })),
    defaultProps({
      formRef: React.createRef(),
    }),

    withHandlers({
      signUp: (props) => ({
        lastName,
        firstName,
        email,
        password,
      }) => {
        try {
          props.auth.registerUser.run({
            lastName,
            firstName,
            email,
            password,
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ),
)(SignUpFormView);
