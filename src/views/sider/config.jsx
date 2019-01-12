import React, {Component} from 'react';

import {Checkbox} from 'components';

import Sider from '../_sider';

import './config.less';

const ConfigItem = ({label, checked, onChange}) => (
  <div className='it-config-item'>
    <label>{label}</label>
    <Checkbox checked={checked} primary={true} onChange={onChange} />
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
            label='시간 초과 시 알람 소리'
            checked={ringable}
            onChange={toggleRingable}
            />
        <ConfigItem
            label='시간 초과 시 숫자 흔들림'
            checked={animatable}
            onChange={toggleAnimatable}
            />
        <ConfigItem
            label='배경색 채움'
            checked={filled}
            onChange={toggleFilled}
            />
      </Sider>
    );
  }
}

export default SiderConfig;
