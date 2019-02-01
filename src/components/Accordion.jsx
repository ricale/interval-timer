import React, {Component} from 'react';
import {factoryBemClass} from 'factory-bem-class';

import Icon from './Icon';

import './Accordion.less';

const cn = factoryBemClass('it-accordion');

class Accordion extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: props.open,
    };
  }

  handleClick = () => {
    this.toggle();
  }

  open = () => {
    this.setState({show: true});
  }

  close = () => {
    this.setState({show: false});
  }

  toggle = () => {
    this.setState({show: !this.state.show});
  }

  render () {
    const {title, className, children} = this.props;
    const {show} = this.state;

    return (
      <div className={`${className} ${cn({active: show})}`}>
        <div className='it-accordion__header' onClick={this.handleClick}>
          {title}
          <Icon name={show ? 'chevron-up' : 'chevron-down'} />
        </div>
        <div className='it-accordion__body'>
          {children}
        </div>
      </div>
    );
  }
}

export default Accordion;
