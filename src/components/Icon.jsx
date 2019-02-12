import React from 'react';

const Icon = ({name, option,  ...props}) => (
  <span
      className={`it-icon ${option === 'brand' ? 'fab' : 'fas'} fa-${name}`}
      {...props}
      />
);

export default Icon;
