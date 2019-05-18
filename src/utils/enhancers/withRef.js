import React from 'react';

const withRef = (ref, setterName) => (Component) => {
  class WithClassVariables extends React.Component {
    constructor(props) {
      super(props);
      this.current = typeof ref === 'function' ? ref(props) : ref;
    }

    setRef(local) {
      Object.assign(this.current, local);
    }

    render() {
      const setter = {};

      if (setterName) {
        setter[setterName] = (value) => this.setRef(value);
      }

      return <Component {...this.current} {...setter} />;
    }
  }

  return WithClassVariables;
};

export default withRef;
