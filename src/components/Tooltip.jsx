import React, {Component} from 'react';
import styled, {css} from 'styled-components';

import {withProps} from 'lib';

const Container = styled.div`
  position: relative;
`;

const Body = styled.div`
  position: absolute;
  flex-direction: column;

  display: none;

  ${Container}:hover & {
    display: flex;
  }
  ${p => p.left !== null && css`
    left: ${p.left}px;
  `}
  ${p => p.right !== null && css`
    right: ${p.right}px;
  `}

  ${p => p.position[0] === 'top' && css`
    bottom: 100%;
  `}
  ${p => p.position[0] === 'bottom' && css`
    top: 100%;
  `}
  ${p => !p.position[1] && css`
    align-items: center;
  `}
  ${p => p.position[1] === 'left' && css`
    align-items: flex-start;
  `}
  ${p => p.position[1] === 'right' && css`
    align-items: flex-end;
  `}
`;

const BACKGROUND_COLOR = 'rgba(0,0,0,0.5)';

const Content = styled.div`
  order: 1;
  max-width: 150px;
  padding: 10px;

  text-align: center;
  background-color: ${BACKGROUND_COLOR};
  font-size: 0.85em;
  color: #FFF;
`;

const Arrow = styled.div`
  display: inline-block;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  ${p => p.margin && css`
    margin: 0 ${p.margin}px;
  `}

  ${p => p.position[0] === 'top' && css`
    order: 2;
    border-top: 5px solid ${BACKGROUND_COLOR};
  `}
  ${p => p.position[0] === 'bottom' && css`
    order: 0;
    border-bottom: 5px solid ${BACKGROUND_COLOR};
  `}
`;

class TooltipView extends Component {
  static defaultProps = {
    position: 'top',
  }

  state = {}

  handleMouseOver = () => {
    const p = this.props.position.split('-');
    const containerOffset = Math.round(this._container.offsetWidth / 2);

    if(!p[1]) {
      this.setStyle({
        left: containerOffset - Math.round(this._body.offsetWidth / 2),
        arrowMargin: 0,
      });
    }

    if(p[1] === 'left') {
      this.setStyle({left: 0, arrowMargin: containerOffset});
    }

    if(p[1] === 'right') {
      this.setStyle({right: 0, arrowMargin: containerOffset});
    }
  }

  setStyle ({left, right, arrowMargin}) {
    if(left !== undefined) {
      if(left !== this.state.left) {
        this.setState({
          left,
          right: null,
          arrowMargin,
        });
      }

    } else if(right !== undefined) {
      if(right !== this.state.right) {
        this.setState({
          right,
          left: null,
          arrowMargin,
        });
      }
    }
  }

  render () {
    const {children, text, position, ...props} = this.props;
    const {left, right, arrowMargin} = this.state;

    return (
      <Container
          {...props}
          ref={r => this._container = r}
          onMouseOver={this.handleMouseOver}>

        {children}

        <Body
            left={left}
            right={right}
            position={position.split('-')}
            ref={r => this._body = r}>
          <Content>
            {text}
          </Content>
          <Arrow
              position={position.split('-')}
              margin={arrowMargin}>
          </Arrow>
        </Body>
      </Container>
    );
  }
}

const Tooltip = withProps(({tooltip, text, position}) => ({
  text:     (tooltip && tooltip.text) || text,
  position: (tooltip && tooltip.position) || position,
}))(TooltipView);

export default Tooltip;
