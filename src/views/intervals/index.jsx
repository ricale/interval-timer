import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {
  getMapDispatchToProps,
} from 'lib';
import intervalActions from 'actions/intervals';
import {PLAY_STATE} from 'constants';

import IntervalForm from './_form';
import IntervalList from './_list';

const Container = styled.div`
  padding: 0 15px;
`;

const FormWrapper = styled.div`
  width: 200px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.5);
`;

class Intervals extends Component {
  componentDidMount () {
    if(this.props.list.length === 0) {
      this._accordion.open();
    }
  }

  shouldComponentUpdate (nextProps) {
    if(this.props.list.length > 0 && nextProps.list.length === 0) {
      this._accordion.open();
    }
    return true;
  }

  handleEdit = (id) => {
    this.props.editInterval(id);
  }

  handleCancelEdit = () => {
    this.props.cancelEditInterval();
  }

  handleUpdate = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.updateInterval({...d, timestamp});
  }

  handleDelete = (id) => {
    this.props.deleteInterval(id);
  }

  handleDeleteAll = () => {
    this.props.deleteAllInterval();
  }

  handleValid = (d) => {
    return d.hours || d.minutes || d.seconds;
  }

  handleSubmit = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.createInterval({...d, timestamp});
  }

  render () {
    const {list, editing, canEdit, defaultName} = this.props;
    return (
      <Container>
        <FormWrapper>
          <IntervalForm
              defaultName={defaultName} // FIXME: duplicated with createInterval on reducers/intervals
              isValid={this.handleValid}
              onSubmit={this.handleSubmit}
              />
        </FormWrapper>

        <IntervalList
            data={list}
            editing={editing}
            canEdit={canEdit}
            onEdit={this.handleEdit}
            onCancelEdit={this.handleCancelEdit}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            onDeleteAll={this.handleDeleteAll}
            />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.intervals.list,
  defaultName: `interval #${state.intervals.lastId}`,
  editing: state.intervals.editing,
  canEdit: state.timer.playState === PLAY_STATE.IDLE,
});

const mapDispatchToProps = getMapDispatchToProps({
  ...intervalActions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Intervals);
