import React, {Component} from 'react';
import {factoryBemClass} from 'factory-bem-class';

import {Checkbox, Icon} from 'components';
import {GITHUB_REPOSITORY_URL, MY_EMAIL_ADDRESS} from 'constants';

import './index.less';

const cn = factoryBemClass('it-config');

const ConfigCheckField = ({label, checked, onChange}) => (
  <div className={cn('check-item')}>
    <label>{label}</label>
    <div>
      <Checkbox checked={checked} primary={true} onChange={onChange} />
    </div>
  </div>
);

class SiderConfig extends Component {
  render () {
    const {
      ringable,
      animatable,
      filled,
      toggleRingable,
      toggleAnimatable,
      toggleFilled,
    } = this.props;

    return (
      <div className={cn()}>
        <ConfigCheckField
            label='Alarm sound'
            checked={ringable}
            onChange={toggleRingable}
            />
        <ConfigCheckField
            label='Alarm shaking animation'
            checked={animatable}
            onChange={toggleAnimatable}
            />
        <ConfigCheckField
            label='Fill background'
            checked={filled}
            onChange={toggleFilled}
            />

        <div className={cn('row')}>
          <a
              className={cn('link')}
              href={GITHUB_REPOSITORY_URL}
              target='_blank'
              rel="noopener noreferrer"
              alt=''>
            <Icon name='github' option='brand' />
          </a>
          <a className={cn('link')} href={`mailto:${MY_EMAIL_ADDRESS}`} alt=''>
            <Icon name='at' />
          </a>
        </div>
      </div>
    );
  }
}

export default SiderConfig;
