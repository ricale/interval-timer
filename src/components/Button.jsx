import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import Tooltip from './Tooltip';

import './Button.less';

const cn = factoryBemClass('it-button');

const Button = ({
  children,
  className = '',
  onClick,

  small,
  compact,
  bordered,
  active,
  disabled,
  primary,
  warning,
  success,
  light,
  tooltip,
  ...args
}) => {

  const _className = cn({
    small,
    compact,
    bordered,
    active,
    disabled,
    primary,
    warning,
    success,
    light,
  });

  const Tag = tooltip ? Tooltip : 'div';
  const tooltipAttrs = tooltip || {};

  return (
    <Tag {...args} className={`${_className} ${className}`} onClick={!disabled ? onClick : undefined} {...tooltipAttrs}>
      {children}
    </Tag>
  );
};

export default Button;
