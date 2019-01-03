import React from 'react';

import './Button.less';

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

  const _className = ['it-button'];

  small    && _className.push('it-small');
  compact  && _className.push('it-compact');
  bordered && _className.push('it-bordered');
  active   && _className.push('it-active');

  if(primary) {
    _className.push('it-primary');
  } else if(warning) {
    _className.push('it-warning');
  } else if(success) {
    _className.push('it-success');
  } else if(light) {
    _className.push('it-light');
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
