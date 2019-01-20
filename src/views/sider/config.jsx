import React, {Component} from 'react';

import {Checkbox} from 'components';

import Sider from '../_sider';

import './config.less';

const ConfigItem = ({label, checked, onChange}) => (
  <div className='it-config-item'>
    <label>{label}</label>
    <div>
      <Checkbox checked={checked} primary={true} onChange={onChange} />
    </div>
  </div>
);

class SiderConfig extends Component {
  componentDidMount () {
    this.props.siderRef(this._siderConfig);
  }

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
      <Sider title='Settings' ref={r => this._siderConfig = r}>
        <ConfigItem
            label='Alarm sound'
            checked={ringable}
            onChange={toggleRingable}
            />
        <ConfigItem
            label='Alarm shaking animation'
            checked={animatable}
            onChange={toggleAnimatable}
            />
        <ConfigItem
            label='Fill background'
            checked={filled}
            onChange={toggleFilled}
            />
      </Sider>
    );
  }
}

export default SiderConfig;
