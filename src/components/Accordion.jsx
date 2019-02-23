import React, {Component} from 'react';
import styled, {css} from 'styled-components';

import Icon from './Icon';

const Container = styled.div`
  width: 200px;
  margin-bottom: 10px;

  background-color: #FFF;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #DDD;
  padding: 10px 15px;
  cursor: pointer;

  ${props => props.active && css`
    border: 1px solid ${props.activeColor || '#cce4ff'};
    background-color: ${props.activeColor || '#cce4ff'};
  `}

  .it-icon {
    opacity: 0.7;
  }
`;

const Body = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  padding: 5px;
  border-left: 1px solid #DDD;
  border-right: 1px solid #DDD;
  border-bottom: 1px solid #DDD;
`;

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
    const {title, children} = this.props;
    const {show} = this.state;

    return (
      <Container>
        <Header active={show} onClick={this.handleClick}>
          {title}
          <Icon name={show ? 'chevron-up' : 'chevron-down'} />
        </Header>
        <Body active={show}>
          {children}
        </Body>
      </Container>
    );
  }
}

export default Accordion;
