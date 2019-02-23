import React, {Component} from 'react';
import styled, {css} from 'styled-components';

import {Button, Icon, Tabs} from 'components';

const Container = styled.div`
  background-color: rgba(0,0,0,0.3);
  overflow: hidden;

  @media (max-width: 568px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-out;

    ${props => props.hide && css`
      height: 0;
      top: 100%;
    `}
  }
  @media (min-width: 568px) {
    position: relative;
    width: 240px;
    height: 100%;
    transition: width 0.2s ease-out;

    ${props => props.hide && css`
      width: 0;
    `}
  }
`;

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  padding: 5px;
  background-color: #DDD;

  @media (max-width: 568px) {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 0;

    box-shadow: 3px 3px 1em 0 rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 568px) {
    height: 100%;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 568px) {
    width: 230px;
  }
`;

class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: props.show,
      activeTab: 0,
    };
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
    const {children} = this.props;

    return (
      <Container hide={!this.state.show}>
        <Body>
          <Menu>
            <Button compact={true} onClick={() => this.close()}>
              <Icon name='times'/>
            </Button>
          </Menu>
          <Content>
            <Tabs>{children}</Tabs>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default Sider;
