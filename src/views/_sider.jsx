import React, {Component} from 'react';

import {Button, Icon} from 'components';

import './_sider.less';

class Sider extends Component {
  state = {
    showSider: false,
  };

  open () {
    this.setState({showSider: true});
  }

  hide () {
    this.setState({showSider: false});
  }

  render () {
    const {children} = this.props;

    return (
      <div className={`it-main-sider__wrapper ${this.state.showSider ? '' : 'it-hide'}`}>
        <div className={'it-main-sider'}>
          {children}

          <div className='it-main-sider__menu'>
            <Button onClick={() => this.hide()}>
              <Icon name='times'/>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sider;
