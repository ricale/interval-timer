import React from 'react';

const Icon = ({name, ...props}) => (
  <span className={`it-icon fas fa-${name}`} {...props}></span>
);

export default Icon;
