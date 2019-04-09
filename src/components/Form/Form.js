/* eslint-disable react/destructuring-assignment */
import React from 'react';
import T from 'prop-types';
import { Formik } from 'formik';
import _ from 'lodash';

class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    this.form = null;
    this._isFormValid = false;
  }

  getForm() {
    return this.form;
  }

  handleValidChange(isValid) {
    if (isValid !== this._isFormValid) {
      this._isFormValid = isValid;

      if (_.isFunction(this.props.onValidationChange)) {
        this.props.onValidationChange(isValid);
      }
    }
  }

  render() {
    return (
      <Formik {...this.props}>
        {(form) => {
          this.form = form;
          this.handleValidChange(form.isValid);

          return this.props.children(form);
        }}
      </Formik>
    );
  }
}

Form.propTypes = {
  children: T.func,
  onValidationChange: T.func,
};

export default Form;
