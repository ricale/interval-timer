import React from 'react';

import './Button.less';

const Button = ({
  children,
  className = '',
  small,
  compact,
  bordered,
  primary,
  warning,
  ...args}) => {

  const _className = ['it-button'];

  small    && _className.push('it-small');
  compact  && _className.push('it-compact');
  bordered && _className.push('it-bordered');

  if(primary) {
    _className.push('it-primary');
  } else if(warning) {
    _className.push('it-warning');
  }

  if(className) {
    _className.push(`${className}`);
  }

  return (
    <button {...args} className={_className.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
