import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import './Checkbox.less';

const cn = factoryBemClass('it-checkbox');

const Checkbox = ({
  className = '',
  primary,
  warning,
  success,
  light,
  ...args
}) => {

  const _className = cn({
    primary,
    warning,
    success,
    light,
  });

  return (
    <input {...args} type='checkbox' className={`${_className} ${className}`} />
  );
};

export default Checkbox;
