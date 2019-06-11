import React from 'react';
import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
  defaultProps,
  hoistStatics,
} from 'recompose';
import { inject } from 'mobx-react';
import SignUpFormView from './SignUpFormView';
import { isValidEmail } from '../../../../utils/regExp';

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
      signUp: (props) => (data) => {
        const test = data;
        debugger;

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
