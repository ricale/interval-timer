// https://github.com/snakesilk/react-fullscreen

import React, {Component} from 'react';
import fscreen from 'fscreen';
import {factoryBemClass} from 'factory-bem-class';

import Button from './Button';
import Icon from './Icon';

import './FullScreenContainer.less';

const cn = factoryBemClass('it-fullscreen');

class FullScreenContainer extends Component {
  state = {
    full: false,
  };

  componentDidMount () {
    fscreen.addEventListener('fullscreenchange', this.handleFullscreen);
  }

  componentWillUnmount () {
    fscreen.removeEventListener('fullscreenchange', this.handleFullscreen);
  }

  handleFullscreen = () => {
    this.setState({full: !!fscreen.fullscreenElement}, () => {
      this.props.onChange && this.props.onChange(this.state.full);
    });
  }

  handleClick = () => {
    this.toggle();
  }

  toggle () {
    this.setState({full: !this.state.full}, () => {
      this.state.full ?
        fscreen.requestFullscreen(this._container) :
        fscreen.exitFullscreen();

      this.props.onChange && this.props.onChange(this.state.full);
    });
  }

  render () {
    const {children, className, button, onChange, ...args} = this.props;
    const _className = `${cn({full: this.state.full})} ${className || ''}`;

    return (
      <div {...args} className={_className} ref={r => this._container = r}>
        {children}
        {button || this.state.full &&
          <Button className={cn('button')} onClick={this.handleClick}>
            <Icon name={this.state.full ? 'compress' : 'expand'} />
          </Button>
        }
      </div>
    );
  }
}

export default FullScreenContainer;
