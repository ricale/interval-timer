import React from 'react';

const Icon = ({name, names, ...args}) => (
  names ?
    <span className='it-icon_piled'>
      {names.map((name, i) =>
        <span key={i} className={`it-icon fas fa-${name}`} {...args}></span>
      )}
    </span> :
    <span className={`it-icon fas fa-${name}`} {...args}></span>
);

export default Icon;
