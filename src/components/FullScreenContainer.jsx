// https://github.com/snakesilk/react-fullscreen

import React, {Component} from 'react';
import fscreen from 'fscreen';
import styled, {css} from 'styled-components';

import Button from './Button';
import Icon from './Icon';

const Container = styled.div`
  ${p => p.full && css`
    width: 100%;
    height: 100%;
  `}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

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

    return (
      <Container
          {...args}
          className={className}
          full={this.state.full}
          ref={r => this._container = r}>
        {children}
        {button || this.state.full &&
          <ButtonWrapper>
            <Button onClick={this.handleClick}>
              <Icon name={this.state.full ? 'compress' : 'expand'} />
            </Button>
          </ButtonWrapper>
        }
      </Container>
    );
  }
}

export default FullScreenContainer;
