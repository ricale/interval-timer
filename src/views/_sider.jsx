import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {Button, Icon} from 'components';

const Container = styled.div`
  /*background-color: rgba(0,0,0,0.3);*/
  /*overflow: hidden;*/

  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 5;

  ${props => props.hide && css`
    width: 0;
    right: 0;
  `}
`;

// FIXME
const Empty = styled.div`
  height: 100%;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5px;
  background-color: #EFEFEF;

  @media (max-width: 568px) {
    position: absolute;
    top: 0;
    right: 0;

    width: 160px;
    height: 100%;

    transition: right 0.2s ease-out;

    ${props => props.hide && css`
      right: -160px;
    `}
  }
  @media (min-width: 568px) {
    height: 100%;
  }
`;

const Menu = styled.div`
  /*position: absolute;
  top: 5px;
  right: 5px;*/
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 568px) {
    width: 230px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
  padding: 0;
`;

const Item = styled.li`
  display: block;
  margin: 0 0 2px;
  padding: 10px;

  background-color: #DDD;

  cursor: pointer;
  text-decoration: none;

  ${p => p.current && css`
    font-weight: bold;
  `}
`;

class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: !props.show,
      activeTab: 0,
    };
  }

  handleClickClose = (event) => {
    this.close();
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
    const {menu, activeMenu} = this.props;
    const {show} = this.state;
    return (
      <Container hide={!show}>
        <Empty onClick={this.handleClickClose}></Empty>
        <Body hide={!show}>
          <Menu>
            <Button onClick={this.handleClickClose}>
              <Icon name='times'/>
            </Button>
          </Menu>
          <Content>
            <List>
              {menu.map(m =>
                <Item
                    key={m.path}
                    as={m.path === activeMenu ? 'div' : Link}
                    to={m.path}
                    current={m.path === activeMenu}
                    onClick={this.handleClickClose}>
                  {m.title}
                </Item>
              )}
            </List>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default Sider;
