// https://github.com/snakesilk/react-fullscreen

import React, {Component} from 'react';
import fscreen from 'fscreen';

import Button from './Button';
import Icon from './Icon';

import './FullScreenContainer.less';

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
    this.setState({full: !this.state.full}, () => {
      this.state.full ?
        fscreen.requestFullscreen(this._container) :
        fscreen.exitFullscreen();

      this.props.onChange && this.props.onChange(this.state.full);
    });
  }

  getClassName () {
    const {className} = this.props;
    const modeClass = this.state.full ? ' it-full' : '';
    return `it-fullscreen-container${modeClass} ${className || ''}`;
  }

  render () {
    const {children, className, onChange, ...args} = this.props;

    return (
      <div {...args} className={this.getClassName()} ref={r => this._container = r}>
        {children}
        <Button className='it-fullscreen__button' onClick={this.handleClick}>
          <Icon name={this.state.full ? 'compress' : 'expand'} />
        </Button>
      </div>
    );
  }
}

export default FullScreenContainer;
