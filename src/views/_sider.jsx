import React, {Component} from 'react';

import {Button, Icon} from 'components';

import './_sider.less';

class Sider extends Component {
  state = {
    show: false,
  };

  handleClickWrapper = (e) => {
    // FIXME
    e.target.className.indexOf('it-main-sider__wrapper') !== -1 && this.hide();
  }

  open () {
    this.setState({show: true});
  }

  hide () {
    this.setState({show: false});
  }

  toggle () {
    this.setState({show: !this.state.show});
  }

  render () {
    const {title, children} = this.props;
    const className = `it-main-sider__wrapper ${this.state.show ? '' : 'it-hide'}`;

    return (
      <div className={className} onClick={this.handleClickWrapper}>
        <div className='it-main-sider'>
          <div className='it-main-sider__header'>
            <h2>{title}</h2>
            <div className='it-main-sider__menu'>
              <Button compact={true} onClick={() => this.hide()}>
                <Icon name='times'/>
              </Button>
            </div>
          </div>
          <div className='it-main-sider__content'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Sider;
