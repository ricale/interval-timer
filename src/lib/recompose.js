// [Higher-Order Components: The Ultimate Guide](https://medium.freecodecamp.org/higher-order-components-the-ultimate-guide-b453a68bb851)
// [acdlite/recompose - Github](https://github.com/acdlite/recompose)

import React, {Component, createFactory} from 'react';

export const compose = (...funcs) => BaseComponent =>
  funcs.reduceRight((acc, func) => func(acc), BaseComponent);

export const withState = (stateName, stateHandlerName, defaultValue) => BaseComponent =>
  class WithState extends Component {
    constructor (props) {
      super(props);
      this.state = {value: typeof defaultValue === 'function' ? defaultValue(props) : defaultValue};
    }

    updateState = (value) => {
      this.setState({value});
    }

    render () {
      return (
        <BaseComponent
            {...this.props}
            {...{
              [stateName]: this.state.value,
              [stateHandlerName]: this.updateState,
            }}
            />
      );
    }
  };

export const withStateHandlers = (initialState, stateUpdaters) => BaseComponent =>
  class WithStateHandlers extends Component {
    state = typeof initialState === 'function' ? initialState(this.props) : initialState

    handlers = Object.keys(stateUpdaters).reduce((hash, key) => {
      hash[key] = (...args) =>
        this.setState((state, props) =>
          stateUpdaters[key](state, props)(...args));
      return hash;
    }, {})

    render () {
      return (
        <BaseComponent
            {...this.props}
            {...this.state}
            {...this.handlers}
            />
      );
    }
  };

export const withProps = mapper =>
  BaseComponent =>
    props =>
      <BaseComponent {...props} {...mapper(props)} />;

export const mapProps = mapper =>
  BaseComponent =>
    props =>
      <BaseComponent {...mapper(props)} />;

export const lifecycle = spec => BaseComponent => {
  const factory = createFactory(BaseComponent);

  class Lifecycle extends Component {
    render () {
      return factory({
        ...this.props,
      });
    }
  }

  Object.keys(spec).forEach(hookName =>
    Lifecycle.prototype[hookName] = spec[hookName]
  );

  return Lifecycle;
};

export const withHandlers = handlers => BaseComponent => {
  const factory = createFactory(BaseComponent);
  class WithHandlers extends Component {
    handlers = Object.keys(handlers).reduce((hash, key) => {
      hash[key] = (...args) => {
        const createHandler = handlers[key];
        const handler = createHandler(this.props);
        return handler(...args);
      };
      return hash;
    },
    {});

    render () {
      return factory({
        ...this.props,
        ...this.handlers,
      });
    }
  }

  return WithHandlers;
};
