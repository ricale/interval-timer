import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import './Button.less';

const cn = factoryBemClass('it-button');

const Button = ({
  children,
  className = '',
  small,
  compact,
  bordered,
  active,
  primary,
  warning,
  success,
  light,
  ...args
}) => {

  const _className = cn({
    small,
    compact,
    bordered,
    active,
    primary,
    warning,
    success,
    light,
  });

  return (
    <button {...args} className={`${_className} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
