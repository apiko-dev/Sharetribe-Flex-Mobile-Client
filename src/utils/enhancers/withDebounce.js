import { createElement, Component } from 'react';
import getDisplayName from 'react-display-name';
import debounce from 'just-debounce-it';

const withDebounce = (handlerName, delay, leadingCall) => (
  Target,
) => {
  class WithDebounce extends Component {
    constructor(props, context) {
      super(props, context);

      const delayValue =
        typeof delay === 'function' ? delay(props) : delay;

      this.debouncedPropInvoke = debounce(
        (...args) => this.props[handlerName](...args),
        delayValue,
        leadingCall,
      );

      this.handler = (e, ...rest) => {
        if (e && typeof e.persist === 'function') {
          e.persist();
        }

        return this.debouncedPropInvoke(e, ...rest);
      };
    }

    render() {
      return createElement(Target, {
        ...this.props,
        [handlerName]: this.handler,
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithDebounce.displayName = `debounceHandler(${getDisplayName(
      Target,
    )})`;
  }

  return WithDebounce;
};

export default withDebounce;
