import React, {Component} from 'react';
import {factoryBemClass} from 'factory-bem-class';

import {
  Accordion,
} from 'components';

import IntervalForm from './form';
import IntervalList from './list';

import './index.less';

const cn = factoryBemClass('it-intervals');

class Intervals extends Component {
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
      <div className={cn()}>
        <Accordion 
            className={cn('accordion')}
            title='Add Interval'
            ref={r => this._accordion = r}>
          <IntervalForm
              defaultName={defaultName} // FIXME: duplicated with createInterval on reducers/intervals
              isValid={this.handleValid}
              onSubmit={this.handleSubmit}
              />
        </Accordion>

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
      </div>
    );
  }
}

export default Intervals;
