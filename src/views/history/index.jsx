import React from 'react';
import {connect} from 'react-redux';

import HistoryList from './_list';

const History = ({list}) => (
  <HistoryList data={list} />
);

const mapStateToProps = (state, ownProps) => ({
  list: state.history.list,
});

export default connect(mapStateToProps)(History);
