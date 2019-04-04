/* eslint-disable react/destructuring-assignment */
import React from 'react';
import T from 'prop-types';
import { Field as FormikField } from 'formik';
import _ from 'lodash';
import { trim } from '../../utils';

class CustomField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  _extractValue() {
    const {
      valueExtractor,
      field: { value },
    } = this.props;

    return _.isFunction(valueExtractor)
      ? valueExtractor(value)
      : value;
  }

  handleFocus() {
    if (_.isFunction(this.props.onFocus)) {
      this.props.onFocus();
    }

    this.setState({ active: true });
  }

  handleBlur() {
    this.props.form.setFieldTouched(this.props.field.name, true);

    if (_.isFunction(this.props.onBlur)) {
      this.props.onBlur();
    }

    if (this.props.trimOnBlur) {
      const value = this._extractValue();
      const trimmed = trim(value);

      this.handleChange(trimmed);
    }

    this.setState({ active: false });
  }

  handleChange(value) {
    this.props.form.setFieldValue(this.props.field.name, value);

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      field: { name, value },
      form: { touched, errors },
      renderChildren,
      valueExtractor,
      type,
    } = this.props;

    const valueToPass = _.isFunction(valueExtractor)
      ? valueExtractor(value)
      : value;

    const error = errors[name];
    const isError = !!(error && touched[name]);

    const propsToPass = Object.assign({}, this.props, {
      active: this.state.active,
      onBlur: () => this.handleBlur(),
      onFocus: () => this.handleFocus(),
      isError,
      error,
      value: valueToPass,
    });

    if (type === 'text') {
      propsToPass.onChangeText = (text) => this.handleChange(text);
    } else {
      propsToPass.onChange = (evt) => this.handleChange(evt);
    }

    return renderChildren(propsToPass);
  }
}

CustomField.propTypes = {
  field: T.object,
  form: T.object,
  onBlur: T.func,
  onFocus: T.func,
  valueExtractor: T.func,
  renderChildren: T.func,
  onChange: T.func,
  trimOnBlur: T.bool,
  type: T.any,
};

function Field({ children, ...props }) {
  return (
    <FormikField
      component={CustomField}
      renderChildren={children}
      {...props}
    />
  );
}

Field.propTypes = {
  children: T.func.isRequired,
};

export default Field;
