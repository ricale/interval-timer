import React, {Component} from 'react';
import {factoryBemClass} from 'factory-bem-class';

import {Button, Icon} from 'components';

import './_sider.less';

const cn = factoryBemClass('it-sider');

class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: props.show,
      activeTab: 0,
    };
  }

  handleClickWrapper = (e) => {
    // FIXME
    e.target.className.indexOf(cn('wrapper')) !== -1 && this.close();
  }

  open () {
    this.setState({show: true});
  }

  close () {
    this.setState({show: false});
  }

  isOpen () {
    return this.state.show;
  }

  toggle () {
    this.setState({show: !this.state.show});
  }

  render () {
    const {className, children} = this.props;
    const _className = `${cn('wrapper')}${className ? ` ${className}` : ''}${!this.state.show ? ' it-hide' : ''}`;

    return (
      <div className={_className} onClick={this.handleClickWrapper}>
        <div className={cn()}>
          <div className={cn('menu')}>
            <Button compact={true} onClick={() => this.close()}>
              <Icon name='times'/>
            </Button>
          </div>
          <div className={cn('content')}>
            <div className={cn('tabs')}>
              {children.map((child, i) => child &&
                <div
                    onClick={() => this.setState({activeTab: i})}
                    className={cn('tab', {active: this.state.activeTab === i})}
                    key={i}>
                  {child.props.title}
                </div>
              )}
            </div>
            {children.map((child, i) => child &&
              <div className={cn('tab-content', {active: this.state.activeTab === i})} key={i}>
                {child}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Sider;
