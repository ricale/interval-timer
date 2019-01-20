import React, {Component} from 'react';

import {Button, Icon} from 'components';

import './_sider.less';

class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: props.show,
    };
  }

  handleClickWrapper = (e) => {
    // FIXME
    e.target.className.indexOf('it-sider__wrapper') !== -1 && this.hide();
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
    const {title, className, children} = this.props;
    const _className = `it-sider__wrapper${className ? ` ${className}` : ''}${!this.state.show ? ' it-hide' : ''}`;

    return (
      <div className={_className} onClick={this.handleClickWrapper}>
        <div className='it-sider'>
          <div className='it-sider__header'>
            <h2>{title}</h2>
            <div className='it-sider__menu'>
              <Button compact={true} onClick={() => this.hide()}>
                <Icon name='times'/>
              </Button>
            </div>
          </div>
          <div className='it-sider__content'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Sider;
