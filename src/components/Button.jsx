import React from 'react';

import './Button.less';

const Button = ({
  children,
  className = '',
  small,
  compact,
  warning,
  ...args}) => {

  const _className = ['it-button'];

  if(small) {
    _className.push('it-small');
  }

  if(compact) {
    _className.push('it-compact');
  }

  if(warning) {
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
