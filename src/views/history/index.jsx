import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import HistoryList from './_list';

const Conatainer = styled.div`
  padding: 0 15px;
`;

const History = ({list}) => (
  <Conatainer>
    <HistoryList data={list} />
  </Conatainer>
);

const mapStateToProps = (state, ownProps) => ({
  list: state.timerHistory.list,
});

export default connect(mapStateToProps)(History);
