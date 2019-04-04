/* eslint-disable react/destructuring-assignment */
import React from 'react';
import T from 'prop-types';
import { Field, getIn } from 'formik';

class ErrorProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
    };
  }

  setTouched(value) {
    this.setState({ touched: value });
  }

  render() {
    const { name, children } = this.props;
    const setTouched = (value) => this.setTouched(value);

    return (
      <Field
        name={name}
        render={({ form }) => {
          const error = getIn(form.errors, name);
          const touchedFromForm = getIn(form.touched, name);
          const touched = this.props.useManualTouched
            ? this.state.touched
            : touchedFromForm;
          const isError = typeof error === 'string';

          return children({
            isError,
            error,
            setTouched,
            touched,
          });
        }}
      />
    );
  }
}

ErrorProvider.propTypes = {
  name: T.string,
  children: T.func,
  useManualTouched: T.bool,
};

export default ErrorProvider;
