import React from 'react';

import './Checkbox.less';

const Checkbox = ({
  className = '',
  primary,
  warning,
  success,
  light,
  ...args
}) => {

  const _className = ['it-checkbox'];

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
    <input {...args} type='checkbox' className={_className.join(' ')} />
  );
};

export default Checkbox;
