import React from 'react';

import './Button.less';

const Button = ({children, className = '', ...args}) => (
  <button {...args} className={`${className} it-button`}>
    {children}
  </button>
);

export default Button;
