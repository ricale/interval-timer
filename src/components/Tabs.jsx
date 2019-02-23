import React from 'react';
import styled, {css} from 'styled-components';

import {withState} from 'lib';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TabButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled.div`
  padding: 10px 15px;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;

  ${p => p.active && css`
    background-color: #F6F6F6;
  `}
`;

const Content = styled.div`
  display: none;
  padding: 10px;
  flex: 1;
  overflow: auto;

  ${p => p.active && css`
    display: block;
    background-color: #F6F6F6;
  `}
`;

const TabsView = ({children, activeTab, onChangeActiveTab}) => (
  <Container>
    <TabButtons>
      {children.map((child, i) => child &&
        <Tab
            onClick={() => onChangeActiveTab(i)}
            active={activeTab === i}
            key={i}>
          {child.props.title}
        </Tab>
      )}
    </TabButtons>
    {children.map((child, i) => child &&
      <Content
          active={activeTab === i}
          key={i}>
        {child}
      </Content>
    )}
  </Container>
);

const Tabs = withState(
  'activeTab',
  'onChangeActiveTab',
  props => props.initialTab || 0
)(TabsView);

export default Tabs;
