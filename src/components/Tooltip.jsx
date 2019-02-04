import React, {Component} from 'react';
import {factoryBemClass} from 'factory-bem-class';

import './Tooltip.less';

const cn = factoryBemClass('it-tooltip');

class Tooltip extends Component {
  static defaultProps = {
    position: 'top',
  }

  state = {}

  handleMouseOver = () => {
    const p = this.props.position.split('-');
    const containerOffset = this._container.offsetWidth / 2;

    if(!p[1]) {
      this.setStyle({
        left: containerOffset - (this._body.offsetWidth / 2),
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
    const {children, className, text, position, ...props} = this.props;
    const {left, right, arrowMargin} = this.state;

    return (
      <div
          {...props}
          className={`${cn({[position]: true})} ${className || ''}`}
          ref={r => this._container = r}
          onMouseOver={this.handleMouseOver}>

        {children}

        <div className={cn('body')} style={{left, right}} ref={r => this._body = r}>
          <div className={cn('content')}>
            {text}
          </div>
          <div className={cn('arrow')} style={{marginLeft: arrowMargin, marginRight: arrowMargin}}>
          </div>
        </div>
      </div>
    );
  }
}

export default Tooltip;
