import React from 'react';

export const withContext = (ContextComp, getContext) => (
  BaseComp,
) => (props) => (
  <ContextComp.Provider value={getContext(props)}>
    <BaseComp {...props} />
  </ContextComp.Provider>
);

export const getContext = (ContextComp) => (BaseComp) => (props) => (
  <ContextComp.Consumer>
    {(context) => <BaseComp {...{ ...props, ...context }} />}
  </ContextComp.Consumer>
);
